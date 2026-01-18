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

// GET /api/houses/:houseId/energy/current - Get current energy stats
router.get('/houses/:houseId/energy/current', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Get current stats
    const [stats] = await pool.query(
      `SELECT lights_on_count, current_consumption_kwh, today_consumption_kwh, today_saved_kwh, last_updated
       FROM current_energy_stats WHERE house_id = ?`,
      [houseId]
    );

    if (!stats.length) {
      // Initialize if not exists
      await pool.query('INSERT INTO current_energy_stats (house_id) VALUES (?)', [houseId]);
      return res.json({
        lights_on_count: 0,
        current_consumption_kwh: 0,
        today_consumption_kwh: 0,
        today_saved_kwh: 0
      });
    }

    return res.json(stats[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/hourly - Get hourly consumption for chart
router.get('/houses/:houseId/energy/hourly', async (req, res) => {
  const { houseId } = req.params;
  const { date } = req.query; // Optional: specific date (YYYY-MM-DD), defaults to today

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const targetDate = date || new Date().toISOString().split('T')[0];

    const [hourlyData] = await pool.query(
      `SELECT hour, consumption_kwh 
       FROM hourly_consumption 
       WHERE house_id = ? AND date = ?
       ORDER BY hour`,
      [houseId, targetDate]
    );

    // Ensure all 24 hours are present (fill with 0 if missing)
    const fullDayData = [];
    for (let hour = 0; hour < 24; hour++) {
      const existing = hourlyData.find(h => h.hour === hour);
      fullDayData.push({
        hour,
        consumption_kwh: existing ? parseFloat(existing.consumption_kwh) : 0
      });
    }

    return res.json({ date: targetDate, hourly_data: fullDayData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/by-room - Get consumption per room
router.get('/houses/:houseId/energy/by-room', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Aggregate consumption by room (based on lights in that room)
    const [roomData] = await pool.query(
      `SELECT 
        l.room_name,
        COUNT(*) as light_count,
        SUM(CASE WHEN l.is_on = 1 THEN 1 ELSE 0 END) as lights_on,
        SUM(CASE WHEN l.is_on = 1 THEN l.power_consumption_watts ELSE 0 END) / 1000 as current_consumption_kw,
        SUM(l.power_consumption_watts) / 1000 as total_capacity_kw
       FROM lights l
       WHERE l.house_id = ?
       GROUP BY l.room_name
       ORDER BY l.room_name`,
      [houseId]
    );

    return res.json({ rooms: roomData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/houses/:houseId/energy/update - Update current energy stats (for testing/simulation)
router.post('/houses/:houseId/energy/update', async (req, res) => {
  const { houseId } = req.params;
  const { lights_on_count, current_consumption_kwh, today_consumption_kwh, today_saved_kwh } = req.body;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    await pool.query(
      `UPDATE current_energy_stats 
       SET lights_on_count = ?, current_consumption_kwh = ?, today_consumption_kwh = ?, today_saved_kwh = ?
       WHERE house_id = ?`,
      [lights_on_count, current_consumption_kwh, today_consumption_kwh, today_saved_kwh, houseId]
    );

    return res.json({ message: 'Energy stats updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/houses/:houseId/energy/hourly - Add/update hourly consumption data (for testing/simulation)
router.post('/houses/:houseId/energy/hourly', async (req, res) => {
  const { houseId } = req.params;
  const { date, hour, consumption_kwh } = req.body;

  if (date === undefined || hour === undefined || consumption_kwh === undefined) {
    return res.status(400).json({ message: 'date, hour, and consumption_kwh are required' });
  }

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Insert or update
    await pool.query(
      `INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE consumption_kwh = ?`,
      [houseId, date, hour, consumption_kwh, consumption_kwh]
    );

    return res.json({ message: 'Hourly consumption data saved successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/production - Get energy production data
router.get('/houses/:houseId/energy/production', async (req, res) => {
  const { houseId } = req.params;
  const { date, period } = req.query; // period: '15min', '1hour', 'today', 'week'

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const targetDate = date || new Date().toISOString().split('T')[0];
    let startDate = targetDate;
    let intervalMinutes = 60; // Default to hourly

    // Determine time range based on period
    if (period === '15min') {
      intervalMinutes = 15;
    } else if (period === '1hour') {
      intervalMinutes = 60;
    } else if (period === 'week') {
      const d = new Date(targetDate);
      d.setDate(d.getDate() - 6);
      startDate = d.toISOString().split('T')[0];
    }

    // Get production/consumption data from energy_measurements
    const [measurements] = await pool.query(
      `SELECT 
        measurement_time,
        active_energy_import_kwh,
        active_energy_export_kwh,
        inst_active_power_import_kw,
        inst_active_power_export_kw
       FROM energy_measurements
       WHERE house_id = ? AND DATE(measurement_time) BETWEEN ? AND ?
       ORDER BY measurement_time`,
      [houseId, startDate, targetDate]
    );

    return res.json({
      date: targetDate,
      period: period || 'today',
      data: measurements
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/load-curve - Get load and production curve data
router.get('/houses/:houseId/energy/load-curve', async (req, res) => {
  const { houseId } = req.params;
  const { date, period } = req.query;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const targetDate = date || new Date().toISOString().split('T')[0];
    let startDate = targetDate;

    if (period === 'week') {
      const d = new Date(targetDate);
      d.setDate(d.getDate() - 6);
      startDate = d.toISOString().split('T')[0];
    }

    // Get measurements with calculated net flow
    const [measurements] = await pool.query(
      `SELECT 
        measurement_time,
        inst_active_power_import_kw as consumption_kw,
        inst_active_power_export_kw as production_kw,
        (inst_active_power_export_kw - inst_active_power_import_kw) as net_flow_kw
       FROM energy_measurements
       WHERE house_id = ? AND DATE(measurement_time) BETWEEN ? AND ?
       ORDER BY measurement_time`,
      [houseId, startDate, targetDate]
    );

    return res.json({
      date: targetDate,
      period: period || 'today',
      data: measurements
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/heatmap - Get consumption heatmap data (hourly for past week)
router.get('/houses/:houseId/energy/heatmap', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Get last 7 days of hourly data
    const [heatmapData] = await pool.query(
      `SELECT date, hour, consumption_kwh
       FROM hourly_consumption
       WHERE house_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       ORDER BY date DESC, hour`,
      [houseId]
    );

    // Group by hour across days
    const heatmap = {};
    for (let hour = 0; hour < 24; hour++) {
      heatmap[hour] = new Array(7).fill(0);
    }

    // Fill heatmap with data
    heatmapData.forEach(row => {
      const dayOfWeek = new Date(row.date).getDay(); // 0 = Sunday
      const hour = row.hour;
      const consumption = parseFloat(row.consumption_kwh);
      heatmap[hour][dayOfWeek] = consumption;
    });

    // Convert to array format
    const heatmapArray = Object.keys(heatmap).map(hour => ({
      hour: parseInt(hour),
      days: heatmap[hour]
    }));

    return res.json({ heatmap: heatmapArray });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/solar-metrics - Get solar panel metrics
router.get('/houses/:houseId/energy/solar-metrics', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Get house UPAC info
    const [houseInfo] = await pool.query(
      'SELECT has_upac, upac_power_kw FROM houses WHERE id = ?',
      [houseId]
    );

    if (!houseInfo.length || !houseInfo[0].has_upac) {
      return res.json({
        has_upac: false,
        self_sufficiency_percentage: 0,
        panel_efficiency_percentage: 0
      });
    }

    const upacPowerKw = parseFloat(houseInfo[0].upac_power_kw) || 0;

    // Get today's production and consumption
    const [todayData] = await pool.query(
      `SELECT 
        SUM(active_energy_export_kwh) as total_production_kwh,
        SUM(active_energy_import_kwh) as total_consumption_kwh
       FROM energy_measurements
       WHERE house_id = ? AND DATE(measurement_time) = CURDATE()`,
      [houseId]
    );

    const totalProduction = parseFloat(todayData[0]?.total_production_kwh) || 0;
    const totalConsumption = parseFloat(todayData[0]?.total_consumption_kwh) || 0;

    // Calculate self-sufficiency (how much of consumption is met by production)
    const selfSufficiency = totalConsumption > 0 
      ? Math.min((totalProduction / totalConsumption) * 100, 100)
      : 0;

    // Calculate panel efficiency (actual vs theoretical max production for today)
    // Assuming average 5 peak sun hours per day
    const theoreticalMaxDaily = upacPowerKw * 5; // kWh
    const panelEfficiency = theoreticalMaxDaily > 0
      ? Math.min((totalProduction / theoreticalMaxDaily) * 100, 100)
      : 0;

    return res.json({
      has_upac: true,
      upac_power_kw: upacPowerKw,
      self_sufficiency_percentage: Math.round(selfSufficiency),
      panel_efficiency_percentage: Math.round(panelEfficiency),
      total_production_today_kwh: totalProduction,
      total_consumption_today_kwh: totalConsumption
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
