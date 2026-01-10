const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Helper function to verify house ownership
async function verifyHouseOwnership(houseId, userId) {
  const [houses] = await pool.query('SELECT id FROM houses WHERE id = ? AND user_id = ?', [houseId, userId]);
  return houses.length > 0;
}

// GET /api/houses/:houseId/routines - Get all routines for a house
router.get('/houses/:houseId/routines', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const [routines] = await pool.query(
      `SELECT id, house_id, name, description, color, start_time, end_time, 
              repeat_monday, repeat_tuesday, repeat_wednesday, repeat_thursday, 
              repeat_friday, repeat_saturday, repeat_sunday, active, created_at 
       FROM light_routines WHERE house_id = ? ORDER BY name`,
      [houseId]
    );

    // Get associated lights for each routine
    for (let routine of routines) {
      const [lights] = await pool.query(
        `SELECT lrl.light_id, l.name as light_name, lrl.target_on, lrl.brightness, lrl.color_hex
         FROM light_routine_lights lrl
         INNER JOIN lights l ON lrl.light_id = l.id
         WHERE lrl.routine_id = ?`,
        [routine.id]
      );
      routine.lights = lights;
    }

    return res.json({ routines });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/routines/:routineId - Get routine details
router.get('/routines/:routineId', async (req, res) => {
  const { routineId } = req.params;

  try {
    const [routines] = await pool.query(
      `SELECT lr.id, lr.house_id, lr.name, lr.description, lr.color, lr.start_time, lr.end_time,
              lr.repeat_monday, lr.repeat_tuesday, lr.repeat_wednesday, lr.repeat_thursday,
              lr.repeat_friday, lr.repeat_saturday, lr.repeat_sunday, lr.active, lr.created_at
       FROM light_routines lr
       INNER JOIN houses h ON lr.house_id = h.id
       WHERE lr.id = ? AND h.user_id = ?`,
      [routineId, req.userId]
    );

    if (!routines.length) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const routine = routines[0];

    // Get associated lights
    const [lights] = await pool.query(
      `SELECT lrl.light_id, l.name as light_name, l.room_name, lrl.target_on, lrl.brightness, lrl.color_hex
       FROM light_routine_lights lrl
       INNER JOIN lights l ON lrl.light_id = l.id
       WHERE lrl.routine_id = ?`,
      [routineId]
    );

    routine.lights = lights;

    return res.json({ routine });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/routines - Create routine
router.post('/routines', async (req, res) => {
  const {
    house_id,
    name,
    description,
    color,
    start_time,
    end_time,
    repeat_monday,
    repeat_tuesday,
    repeat_wednesday,
    repeat_thursday,
    repeat_friday,
    repeat_saturday,
    repeat_sunday,
    active,
    lights
  } = req.body;

  if (!house_id || !name || !start_time || !end_time) {
    return res.status(400).json({ message: 'house_id, name, start_time, and end_time are required' });
  }

  try {
    if (!await verifyHouseOwnership(house_id, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Create routine
    const [result] = await pool.query(
      `INSERT INTO light_routines (house_id, name, description, color, start_time, end_time,
                                    repeat_monday, repeat_tuesday, repeat_wednesday, repeat_thursday,
                                    repeat_friday, repeat_saturday, repeat_sunday, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        house_id,
        name,
        description || null,
        color || '#78B85E',
        start_time,
        end_time,
        repeat_monday || 0,
        repeat_tuesday || 0,
        repeat_wednesday || 0,
        repeat_thursday || 0,
        repeat_friday || 0,
        repeat_saturday || 0,
        repeat_sunday || 0,
        active !== undefined ? active : 1
      ]
    );

    const routineId = result.insertId;

    // Add lights to routine if provided
    if (lights && Array.isArray(lights) && lights.length > 0) {
      for (let light of lights) {
        await pool.query(
          'INSERT INTO light_routine_lights (routine_id, light_id, target_on, brightness, color_hex) VALUES (?, ?, ?, ?, ?)',
          [routineId, light.light_id, light.target_on || 1, light.brightness || null, light.color_hex || null]
        );
      }
    }

    return res.status(201).json({
      message: 'Routine created successfully',
      routine: { id: routineId, house_id, name, description, color, start_time, end_time }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/routines/:routineId - Update routine
router.put('/routines/:routineId', async (req, res) => {
  const { routineId } = req.params;
  const {
    name,
    description,
    color,
    start_time,
    end_time,
    repeat_monday,
    repeat_tuesday,
    repeat_wednesday,
    repeat_thursday,
    repeat_friday,
    repeat_saturday,
    repeat_sunday,
    active,
    lights
  } = req.body;

  try {
    // Verify ownership
    const [routines] = await pool.query(
      `SELECT lr.id FROM light_routines lr INNER JOIN houses h ON lr.house_id = h.id WHERE lr.id = ? AND h.user_id = ?`,
      [routineId, req.userId]
    );

    if (!routines.length) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // Build dynamic update query
    const updates = [];
    const values = [];

    if (name !== undefined) { updates.push('name = ?'); values.push(name); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (color !== undefined) { updates.push('color = ?'); values.push(color); }
    if (start_time !== undefined) { updates.push('start_time = ?'); values.push(start_time); }
    if (end_time !== undefined) { updates.push('end_time = ?'); values.push(end_time); }
    if (repeat_monday !== undefined) { updates.push('repeat_monday = ?'); values.push(repeat_monday); }
    if (repeat_tuesday !== undefined) { updates.push('repeat_tuesday = ?'); values.push(repeat_tuesday); }
    if (repeat_wednesday !== undefined) { updates.push('repeat_wednesday = ?'); values.push(repeat_wednesday); }
    if (repeat_thursday !== undefined) { updates.push('repeat_thursday = ?'); values.push(repeat_thursday); }
    if (repeat_friday !== undefined) { updates.push('repeat_friday = ?'); values.push(repeat_friday); }
    if (repeat_saturday !== undefined) { updates.push('repeat_saturday = ?'); values.push(repeat_saturday); }
    if (repeat_sunday !== undefined) { updates.push('repeat_sunday = ?'); values.push(repeat_sunday); }
    if (active !== undefined) { updates.push('active = ?'); values.push(active); }

    if (updates.length > 0) {
      values.push(routineId);
      await pool.query(`UPDATE light_routines SET ${updates.join(', ')} WHERE id = ?`, values);
    }

    // Update lights if provided
    if (lights && Array.isArray(lights)) {
      // Remove existing lights
      await pool.query('DELETE FROM light_routine_lights WHERE routine_id = ?', [routineId]);

      // Add new lights
      for (let light of lights) {
        await pool.query(
          'INSERT INTO light_routine_lights (routine_id, light_id, target_on, brightness, color_hex) VALUES (?, ?, ?, ?, ?)',
          [routineId, light.light_id, light.target_on || 1, light.brightness || null, light.color_hex || null]
        );
      }
    }

    return res.json({ message: 'Routine updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/routines/:routineId - Delete routine
router.delete('/routines/:routineId', async (req, res) => {
  const { routineId } = req.params;

  try {
    const [routines] = await pool.query(
      `SELECT lr.id FROM light_routines lr INNER JOIN houses h ON lr.house_id = h.id WHERE lr.id = ? AND h.user_id = ?`,
      [routineId, req.userId]
    );

    if (!routines.length) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    await pool.query('DELETE FROM light_routines WHERE id = ?', [routineId]);

    return res.json({ message: 'Routine deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/routines/:routineId/toggle - Activate/deactivate routine
router.put('/routines/:routineId/toggle', async (req, res) => {
  const { routineId } = req.params;

  try {
    const [routines] = await pool.query(
      `SELECT lr.id, lr.active FROM light_routines lr INNER JOIN houses h ON lr.house_id = h.id WHERE lr.id = ? AND h.user_id = ?`,
      [routineId, req.userId]
    );

    if (!routines.length) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const newActiveState = routines[0].active ? 0 : 1;

    await pool.query('UPDATE light_routines SET active = ? WHERE id = ?', [newActiveState, routineId]);

    return res.json({
      message: 'Routine toggled successfully',
      active: newActiveState
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
