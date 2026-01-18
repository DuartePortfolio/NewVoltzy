-- Comprehensive Energy Data for Voltzy Testing
-- This file populates energy-related tables with realistic test data
-- Run this AFTER migrations.sql and test-data.sql

USE smart_energy_app;

-- =====================================================
-- HOURLY CONSUMPTION DATA (for consumption graph)
-- =====================================================
-- 24 hours of data for today (2026-01-18)
DELETE FROM hourly_consumption WHERE house_id = 3 AND date = '2026-01-18';

INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-18', 0, 0.45),   -- Midnight - low consumption
(3, '2026-01-18', 1, 0.38),
(3, '2026-01-18', 2, 0.35),
(3, '2026-01-18', 3, 0.32),
(3, '2026-01-18', 4, 0.40),
(3, '2026-01-18', 5, 0.55),
(3, '2026-01-18', 6, 1.20),   -- Morning peak starts
(3, '2026-01-18', 7, 2.50),
(3, '2026-01-18', 8, 2.80),
(3, '2026-01-18', 9, 1.90),
(3, '2026-01-18', 10, 1.50),
(3, '2026-01-18', 11, 1.60),
(3, '2026-01-18', 12, 2.20),  -- Lunch time
(3, '2026-01-18', 13, 1.80),
(3, '2026-01-18', 14, 1.40),
(3, '2026-01-18', 15, 1.30),
(3, '2026-01-18', 16, 1.50),
(3, '2026-01-18', 17, 2.00),
(3, '2026-01-18', 18, 3.20),  -- Evening peak
(3, '2026-01-18', 19, 3.50),  -- Highest consumption
(3, '2026-01-18', 20, 2.90),
(3, '2026-01-18', 21, 2.10),
(3, '2026-01-18', 22, 1.50),
(3, '2026-01-18', 23, 0.80);  -- Winding down

-- Additional days for historical data
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
-- Yesterday (2026-01-17)
(3, '2026-01-17', 0, 0.42), (3, '2026-01-17', 1, 0.36), (3, '2026-01-17', 2, 0.33),
(3, '2026-01-17', 3, 0.31), (3, '2026-01-17', 4, 0.38), (3, '2026-01-17', 5, 0.52),
(3, '2026-01-17', 6, 1.15), (3, '2026-01-17', 7, 2.45), (3, '2026-01-17', 8, 2.75),
(3, '2026-01-17', 9, 1.85), (3, '2026-01-17', 10, 1.45), (3, '2026-01-17', 11, 1.55),
(3, '2026-01-17', 12, 2.15), (3, '2026-01-17', 13, 1.75), (3, '2026-01-17', 14, 1.35),
(3, '2026-01-17', 15, 1.25), (3, '2026-01-17', 16, 1.45), (3, '2026-01-17', 17, 1.95),
(3, '2026-01-17', 18, 3.15), (3, '2026-01-17', 19, 3.45), (3, '2026-01-17', 20, 2.85),
(3, '2026-01-17', 21, 2.05), (3, '2026-01-17', 22, 1.45), (3, '2026-01-17', 23, 0.75);

-- =====================================================
-- ENERGY MEASUREMENTS (for production and load curve graphs)
-- =====================================================
DELETE FROM energy_measurements WHERE house_id = 3 AND DATE(measurement_time) = '2026-01-18';

-- Realistic solar production curve with morning ramp-up, noon peak, evening decline
-- Import/Export shows grid interaction patterns
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
-- Early morning (no solar yet, importing from grid)
(3, '2026-01-18 06:00:00', 0.15, 0.00, 0.45, 0.00),
(3, '2026-01-18 06:30:00', 0.18, 0.00, 0.50, 0.00),
(3, '2026-01-18 07:00:00', 0.25, 0.05, 0.65, 0.20),  -- Solar starting
(3, '2026-01-18 07:30:00', 0.30, 0.15, 0.70, 0.50),
(3, '2026-01-18 08:00:00', 0.35, 0.30, 0.75, 0.95),
(3, '2026-01-18 08:30:00', 0.40, 0.50, 0.80, 1.40),

-- Morning (solar ramping up)
(3, '2026-01-18 09:00:00', 0.38, 0.75, 0.65, 1.85),
(3, '2026-01-18 09:30:00', 0.35, 1.00, 0.55, 2.30),
(3, '2026-01-18 10:00:00', 0.30, 1.25, 0.50, 2.75),
(3, '2026-01-18 10:30:00', 0.25, 1.50, 0.45, 3.15),

-- Mid-morning to noon (peak solar)
(3, '2026-01-18 11:00:00', 0.20, 1.70, 0.40, 3.40),
(3, '2026-01-18 11:30:00', 0.15, 1.85, 0.35, 3.55),
(3, '2026-01-18 12:00:00', 0.10, 2.00, 0.30, 3.65),  -- Peak solar
(3, '2026-01-18 12:30:00', 0.10, 1.95, 0.30, 3.60),
(3, '2026-01-18 13:00:00', 0.12, 1.85, 0.32, 3.50),
(3, '2026-01-18 13:30:00', 0.15, 1.75, 0.35, 3.35),

-- Afternoon (solar declining)
(3, '2026-01-18 14:00:00', 0.18, 1.60, 0.40, 3.15),
(3, '2026-01-18 14:30:00', 0.22, 1.45, 0.45, 2.90),
(3, '2026-01-18 15:00:00', 0.28, 1.25, 0.50, 2.60),
(3, '2026-01-18 15:30:00', 0.35, 1.00, 0.60, 2.25),
(3, '2026-01-18 16:00:00', 0.42, 0.75, 0.70, 1.85),
(3, '2026-01-18 16:30:00', 0.50, 0.50, 0.85, 1.40),

-- Late afternoon (solar fading, consumption rising)
(3, '2026-01-18 17:00:00', 0.60, 0.30, 1.00, 0.90),
(3, '2026-01-18 17:30:00', 0.75, 0.15, 1.25, 0.45),
(3, '2026-01-18 18:00:00', 0.95, 0.05, 1.60, 0.15),  -- Evening peak starting
(3, '2026-01-18 18:30:00', 1.15, 0.00, 1.90, 0.00),

-- Evening (high consumption, no solar)
(3, '2026-01-18 19:00:00', 1.35, 0.00, 2.20, 0.00),
(3, '2026-01-18 19:30:00', 1.45, 0.00, 2.35, 0.00),  -- Peak consumption
(3, '2026-01-18 20:00:00', 1.25, 0.00, 2.10, 0.00),
(3, '2026-01-18 20:30:00', 1.05, 0.00, 1.80, 0.00),
(3, '2026-01-18 21:00:00', 0.85, 0.00, 1.45, 0.00),
(3, '2026-01-18 21:30:00', 0.65, 0.00, 1.10, 0.00),

-- Night (low consumption)
(3, '2026-01-18 22:00:00', 0.50, 0.00, 0.80, 0.00),
(3, '2026-01-18 22:30:00', 0.35, 0.00, 0.60, 0.00),
(3, '2026-01-18 23:00:00', 0.25, 0.00, 0.45, 0.00),
(3, '2026-01-18 23:30:00', 0.18, 0.00, 0.35, 0.00);

-- Previous days for heatmap data (last 7 days)
-- 2026-01-17 (Friday)
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
(3, '2026-01-17 08:00:00', 0.35, 0.28, 0.75, 0.90),
(3, '2026-01-17 10:00:00', 0.28, 1.20, 0.48, 2.70),
(3, '2026-01-17 12:00:00', 0.12, 1.95, 0.32, 3.60),
(3, '2026-01-17 14:00:00', 0.20, 1.55, 0.42, 3.10),
(3, '2026-01-17 16:00:00', 0.45, 0.70, 0.72, 1.80),
(3, '2026-01-17 18:00:00', 0.92, 0.05, 1.55, 0.12);

-- 2026-01-16 (Thursday)
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
(3, '2026-01-16 08:00:00', 0.32, 0.25, 0.70, 0.85),
(3, '2026-01-16 10:00:00', 0.25, 1.15, 0.45, 2.65),
(3, '2026-01-16 12:00:00', 0.10, 1.90, 0.28, 3.55),
(3, '2026-01-16 14:00:00', 0.18, 1.50, 0.38, 3.05),
(3, '2026-01-16 16:00:00', 0.42, 0.68, 0.68, 1.75),
(3, '2026-01-16 18:00:00', 0.88, 0.03, 1.50, 0.10);

-- 2026-01-15 (Wednesday)
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
(3, '2026-01-15 08:00:00', 0.38, 0.32, 0.78, 0.98),
(3, '2026-01-15 10:00:00', 0.32, 1.28, 0.52, 2.78),
(3, '2026-01-15 12:00:00', 0.15, 2.05, 0.35, 3.70),
(3, '2026-01-15 14:00:00', 0.22, 1.62, 0.45, 3.18),
(3, '2026-01-15 16:00:00', 0.48, 0.78, 0.75, 1.88),
(3, '2026-01-15 18:00:00', 0.98, 0.08, 1.62, 0.18);

-- 2026-01-14 (Tuesday)
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
(3, '2026-01-14 08:00:00', 0.33, 0.27, 0.72, 0.88),
(3, '2026-01-14 10:00:00', 0.27, 1.18, 0.47, 2.68),
(3, '2026-01-14 12:00:00', 0.11, 1.93, 0.30, 3.58),
(3, '2026-01-14 14:00:00', 0.19, 1.53, 0.40, 3.08),
(3, '2026-01-14 16:00:00', 0.44, 0.72, 0.70, 1.78),
(3, '2026-01-14 18:00:00', 0.90, 0.04, 1.53, 0.11);

-- 2026-01-13 (Monday)
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
(3, '2026-01-13 08:00:00', 0.36, 0.30, 0.76, 0.95),
(3, '2026-01-13 10:00:00', 0.30, 1.23, 0.50, 2.73),
(3, '2026-01-13 12:00:00', 0.13, 1.98, 0.33, 3.63),
(3, '2026-01-13 14:00:00', 0.21, 1.58, 0.43, 3.13),
(3, '2026-01-13 16:00:00', 0.46, 0.75, 0.73, 1.83),
(3, '2026-01-13 18:00:00', 0.95, 0.06, 1.58, 0.15);

-- 2026-01-12 (Sunday - lower consumption pattern)
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
(3, '2026-01-12 08:00:00', 0.25, 0.35, 0.55, 1.05),
(3, '2026-01-12 10:00:00', 0.20, 1.35, 0.38, 2.85),
(3, '2026-01-12 12:00:00', 0.08, 2.10, 0.22, 3.75),
(3, '2026-01-12 14:00:00', 0.15, 1.70, 0.32, 3.25),
(3, '2026-01-12 16:00:00', 0.35, 0.85, 0.60, 1.95),
(3, '2026-01-12 18:00:00', 0.75, 0.10, 1.35, 0.22);

-- 2026-01-11 (Saturday - weekend pattern)
INSERT INTO energy_measurements (house_id, measurement_time, active_energy_import_kwh, active_energy_export_kwh, inst_active_power_import_kw, inst_active_power_export_kw) VALUES
(3, '2026-01-11 08:00:00', 0.28, 0.33, 0.58, 1.00),
(3, '2026-01-11 10:00:00', 0.23, 1.30, 0.42, 2.80),
(3, '2026-01-11 12:00:00', 0.09, 2.05, 0.25, 3.68),
(3, '2026-01-11 14:00:00', 0.17, 1.65, 0.35, 3.20),
(3, '2026-01-11 16:00:00', 0.38, 0.80, 0.63, 1.90),
(3, '2026-01-11 18:00:00', 0.80, 0.08, 1.42, 0.20);

-- =====================================================
-- CURRENT ENERGY STATS (for dashboard)
-- =====================================================
DELETE FROM current_energy_stats WHERE house_id = 3;

INSERT INTO current_energy_stats (
  house_id, 
  lights_on_count, 
  current_consumption_kwh, 
  today_consumption_kwh, 
  today_saved_kwh,
  last_updated
) VALUES (
  3,                    -- house_id
  5,                    -- 5 lights currently on
  2.35,                 -- current consumption (evening time)
  42.5,                 -- total consumption today
  18.2,                 -- energy saved via solar today
  NOW()                 -- current timestamp
);

-- =====================================================
-- HISTORICAL HOURLY DATA FOR HEATMAP
-- =====================================================
-- Generate consumption data for past 7 days across all hours (6 AM to 4 PM)
-- This creates the 7-day heatmap shown in the consumption screen

-- Day patterns (consumption varies by day of week)
-- Weekdays: Higher morning/evening peaks
-- Weekends: More distributed consumption

DELETE FROM hourly_consumption WHERE house_id = 3 AND date >= '2026-01-11' AND date < '2026-01-18';

-- Saturday 2026-01-11
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-11', 6, 0.80), (3, '2026-01-11', 7, 1.50), (3, '2026-01-11', 8, 2.20),
(3, '2026-01-11', 9, 2.50), (3, '2026-01-11', 10, 2.30), (3, '2026-01-11', 11, 2.40),
(3, '2026-01-11', 12, 2.80), (3, '2026-01-11', 13, 2.60), (3, '2026-01-11', 14, 2.20),
(3, '2026-01-11', 15, 1.90), (3, '2026-01-11', 16, 2.10);

-- Sunday 2026-01-12
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-12', 6, 0.60), (3, '2026-01-12', 7, 1.20), (3, '2026-01-12', 8, 1.90),
(3, '2026-01-12', 9, 2.30), (3, '2026-01-12', 10, 2.50), (3, '2026-01-12', 11, 2.70),
(3, '2026-01-12', 12, 2.90), (3, '2026-01-12', 13, 2.80), (3, '2026-01-12', 14, 2.40),
(3, '2026-01-12', 15, 2.00), (3, '2026-01-12', 16, 2.20);

-- Monday 2026-01-13
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-13', 6, 1.10), (3, '2026-01-13', 7, 2.40), (3, '2026-01-13', 8, 2.75),
(3, '2026-01-13', 9, 1.85), (3, '2026-01-13', 10, 1.45), (3, '2026-01-13', 11, 1.55),
(3, '2026-01-13', 12, 2.10), (3, '2026-01-13', 13, 1.70), (3, '2026-01-13', 14, 1.30),
(3, '2026-01-13', 15, 1.20), (3, '2026-01-13', 16, 1.45);

-- Tuesday 2026-01-14
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-14', 6, 1.15), (3, '2026-01-14', 7, 2.45), (3, '2026-01-14', 8, 2.70),
(3, '2026-01-14', 9, 1.80), (3, '2026-01-14', 10, 1.40), (3, '2026-01-14', 11, 1.50),
(3, '2026-01-14', 12, 2.05), (3, '2026-01-14', 13, 1.65), (3, '2026-01-14', 14, 1.25),
(3, '2026-01-14', 15, 1.15), (3, '2026-01-14', 16, 1.40);

-- Wednesday 2026-01-15
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-15', 6, 1.25), (3, '2026-01-15', 7, 2.55), (3, '2026-01-15', 8, 2.85),
(3, '2026-01-15', 9, 1.95), (3, '2026-01-15', 10, 1.55), (3, '2026-01-15', 11, 1.65),
(3, '2026-01-15', 12, 2.25), (3, '2026-01-15', 13, 1.85), (3, '2026-01-15', 14, 1.45),
(3, '2026-01-15', 15, 1.35), (3, '2026-01-15', 16, 1.55);

-- Thursday 2026-01-16
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-16', 6, 1.18), (3, '2026-01-16', 7, 2.48), (3, '2026-01-16', 8, 2.78),
(3, '2026-01-16', 9, 1.88), (3, '2026-01-16', 10, 1.48), (3, '2026-01-16', 11, 1.58),
(3, '2026-01-16', 12, 2.18), (3, '2026-01-16', 13, 1.78), (3, '2026-01-16', 14, 1.38),
(3, '2026-01-16', 15, 1.28), (3, '2026-01-16', 16, 1.48);

-- Friday 2026-01-17
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh) VALUES
(3, '2026-01-17', 6, 1.15), (3, '2026-01-17', 7, 2.45), (3, '2026-01-17', 8, 2.75),
(3, '2026-01-17', 9, 1.85), (3, '2026-01-17', 10, 1.45), (3, '2026-01-17', 11, 1.55),
(3, '2026-01-17', 12, 2.15), (3, '2026-01-17', 13, 1.75), (3, '2026-01-17', 14, 1.35),
(3, '2026-01-17', 15, 1.25), (3, '2026-01-17', 16, 1.45);

-- =====================================================
-- SUMMARY
-- =====================================================
-- This file has populated:
-- ✓ 24 hours of consumption data for today (2026-01-18)
-- ✓ 40+ energy measurements with realistic solar production curves
-- ✓ 7 days of historical data for heatmap (2026-01-11 to 2026-01-17)
-- ✓ Current energy statistics for dashboard
-- ✓ Realistic patterns:
--   - Morning consumption peaks (7-9 AM)
--   - Solar production peaks (12-1 PM at 3.6+ kW)
--   - Evening consumption peaks (6-8 PM)
--   - Weekend vs weekday patterns
--   - Import/export energy flow
-- 
-- Test data is for house_id = 3 (John Doe's Suburban House)
-- All graphs in ConsumptionScreen should now display live data!
