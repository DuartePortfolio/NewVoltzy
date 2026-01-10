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

// GET /api/houses/:houseId/lights - Get all lights for a house
router.get('/houses/:houseId/lights', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const [lights] = await pool.query(
      'SELECT id, house_id, room_name, name, is_on, brightness, color, power_consumption_watts, created_at FROM lights WHERE house_id = ? ORDER BY room_name, name',
      [houseId]
    );

    return res.json({ lights });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/rooms/:roomName/lights - Get lights by room
router.get('/houses/:houseId/rooms/:roomName/lights', async (req, res) => {
  const { houseId, roomName } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const [lights] = await pool.query(
      'SELECT id, house_id, room_name, name, is_on, brightness, color, power_consumption_watts, created_at FROM lights WHERE house_id = ? AND room_name = ? ORDER BY name',
      [houseId, roomName]
    );

    return res.json({ lights });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/lights/:lightId - Get single light details
router.get('/lights/:lightId', async (req, res) => {
  const { lightId } = req.params;

  try {
    const [lights] = await pool.query(
      `SELECT l.id, l.house_id, l.room_name, l.name, l.is_on, l.brightness, l.color, l.power_consumption_watts, l.created_at 
       FROM lights l 
       INNER JOIN houses h ON l.house_id = h.id 
       WHERE l.id = ? AND h.user_id = ?`,
      [lightId, req.userId]
    );

    if (!lights.length) {
      return res.status(404).json({ message: 'Light not found' });
    }

    return res.json({ light: lights[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/lights - Add new light
router.post('/lights', async (req, res) => {
  const { house_id, room_name, name, is_on, brightness, color, power_consumption_watts } = req.body;

  if (!house_id || !room_name || !name) {
    return res.status(400).json({ message: 'house_id, room_name, and name are required' });
  }

  try {
    if (!await verifyHouseOwnership(house_id, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const [result] = await pool.query(
      'INSERT INTO lights (house_id, room_name, name, is_on, brightness, color, power_consumption_watts) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        house_id,
        room_name,
        name,
        is_on !== undefined ? is_on : 0,
        brightness !== undefined ? brightness : 100,
        color || '#FFFFFF',
        power_consumption_watts || 0
      ]
    );

    return res.status(201).json({
      message: 'Light created successfully',
      light: {
        id: result.insertId,
        house_id,
        room_name,
        name,
        is_on: is_on !== undefined ? is_on : 0,
        brightness: brightness !== undefined ? brightness : 100,
        color: color || '#FFFFFF',
        power_consumption_watts: power_consumption_watts || 0
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/lights/:lightId - Update light state
router.put('/lights/:lightId', async (req, res) => {
  const { lightId } = req.params;
  const { is_on, brightness, color, name, room_name, power_consumption_watts } = req.body;

  try {
    // Verify ownership
    const [lights] = await pool.query(
      `SELECT l.id FROM lights l INNER JOIN houses h ON l.house_id = h.id WHERE l.id = ? AND h.user_id = ?`,
      [lightId, req.userId]
    );

    if (!lights.length) {
      return res.status(404).json({ message: 'Light not found' });
    }

    // Build dynamic update query
    const updates = [];
    const values = [];

    if (is_on !== undefined) {
      updates.push('is_on = ?');
      values.push(is_on);
    }
    if (brightness !== undefined) {
      updates.push('brightness = ?');
      values.push(brightness);
    }
    if (color !== undefined) {
      updates.push('color = ?');
      values.push(color);
    }
    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (room_name !== undefined) {
      updates.push('room_name = ?');
      values.push(room_name);
    }
    if (power_consumption_watts !== undefined) {
      updates.push('power_consumption_watts = ?');
      values.push(power_consumption_watts);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    values.push(lightId);
    await pool.query(`UPDATE lights SET ${updates.join(', ')} WHERE id = ?`, values);

    // Fetch updated light
    const [updatedLights] = await pool.query(
      'SELECT id, house_id, room_name, name, is_on, brightness, color, power_consumption_watts FROM lights WHERE id = ?',
      [lightId]
    );

    return res.json({
      message: 'Light updated successfully',
      light: updatedLights[0]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/lights/:lightId - Remove light
router.delete('/lights/:lightId', async (req, res) => {
  const { lightId } = req.params;

  try {
    const [lights] = await pool.query(
      `SELECT l.id FROM lights l INNER JOIN houses h ON l.house_id = h.id WHERE l.id = ? AND h.user_id = ?`,
      [lightId, req.userId]
    );

    if (!lights.length) {
      return res.status(404).json({ message: 'Light not found' });
    }

    await pool.query('DELETE FROM lights WHERE id = ?', [lightId]);

    return res.json({ message: 'Light deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
