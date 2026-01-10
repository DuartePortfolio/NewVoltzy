-- ==================================================
-- VOLTZY APP - TEST DATA
-- ==================================================
-- This file contains mock data for testing the app
-- Run this AFTER migrations.sql has been applied
--
-- This adds data for existing user ID 3
-- ==================================================

USE smart_energy_app;

-- Clean existing test data for user 3 (optional - comment out if you want to keep existing data)
-- DELETE lrl FROM light_routine_lights lrl 
-- INNER JOIN light_routines lr ON lrl.routine_id = lr.id 
-- INNER JOIN houses h ON lr.house_id = h.id 
-- WHERE h.user_id = 3;
-- DELETE lr FROM light_routines lr 
-- INNER JOIN houses h ON lr.house_id = h.id 
-- WHERE h.user_id = 3;
-- DELETE FROM lights WHERE house_id IN (SELECT id FROM houses WHERE user_id = 3);
-- DELETE FROM hourly_consumption WHERE house_id IN (SELECT id FROM houses WHERE user_id = 3);
-- DELETE FROM current_energy_stats WHERE house_id IN (SELECT id FROM houses WHERE user_id = 3);
-- DELETE FROM rooms WHERE house_id IN (SELECT id FROM houses WHERE user_id = 3);
-- DELETE FROM energy_measurements WHERE house_id IN (SELECT id FROM houses WHERE user_id = 3);
-- DELETE FROM houses WHERE user_id = 3;

-- ==================================================
-- 1. SET USER ID
-- ==================================================
-- Using existing user with ID 3
SET @user_id = 3;

-- ==================================================
-- 2. CREATE HOUSE
-- ==================================================
INSERT INTO houses (user_id, name, address, contracted_power_kva, has_upac, upac_power_kw)
VALUES (
    @user_id,
    'My Smart Home',
    '123 Green Street, Porto, Portugal',
    6.90,
    1,
    3.50
);

SET @house_id = LAST_INSERT_ID();

-- ==================================================
-- 3. CREATE ROOMS
-- ==================================================
INSERT INTO rooms (house_id, name)
VALUES 
    (@house_id, 'Kitchen'),
    (@house_id, 'Living Room'),
    (@house_id, 'Bedroom'),
    (@house_id, 'Bathroom'),
    (@house_id, 'Office'),
    (@house_id, 'Garage');

-- ==================================================
-- 4. CREATE LIGHTS
-- ==================================================
-- Kitchen Lights (3 lights)
INSERT INTO lights (house_id, room_name, name, is_on, brightness, color, power_consumption_watts)
VALUES 
    (@house_id, 'Kitchen', 'Ceiling Light', 1, 80, '#FFFFFF', 15),
    (@house_id, 'Kitchen', 'Under Cabinet', 0, 50, '#FFF8DC', 8),
    (@house_id, 'Kitchen', 'Island Pendant', 1, 100, '#FFFACD', 20);

-- Living Room Lights (4 lights)
INSERT INTO lights (house_id, room_name, name, is_on, brightness, color, power_consumption_watts)
VALUES 
    (@house_id, 'Living Room', 'Main Chandelier', 1, 75, '#FFFFFF', 25),
    (@house_id, 'Living Room', 'Floor Lamp', 1, 60, '#FFE4B5', 12),
    (@house_id, 'Living Room', 'Wall Sconce Left', 0, 50, '#FFF8DC', 8),
    (@house_id, 'Living Room', 'Wall Sconce Right', 0, 50, '#FFF8DC', 8);

-- Bedroom Lights (3 lights)
INSERT INTO lights (house_id, room_name, name, is_on, brightness, color, power_consumption_watts)
VALUES 
    (@house_id, 'Bedroom', 'Ceiling Fan Light', 0, 70, '#FFFACD', 18),
    (@house_id, 'Bedroom', 'Bedside Lamp Left', 1, 40, '#FFE4B5', 5),
    (@house_id, 'Bedroom', 'Bedside Lamp Right', 0, 40, '#FFE4B5', 5);

-- Bathroom Lights (2 lights)
INSERT INTO lights (house_id, room_name, name, is_on, brightness, color, power_consumption_watts)
VALUES 
    (@house_id, 'Bathroom', 'Vanity Lights', 1, 90, '#FFFFFF', 12),
    (@house_id, 'Bathroom', 'Shower Light', 0, 80, '#FFFFFF', 10);

-- Office Lights (2 lights)
INSERT INTO lights (house_id, room_name, name, is_on, brightness, color, power_consumption_watts)
VALUES 
    (@house_id, 'Office', 'Desk Lamp', 1, 100, '#FFFFFF', 15),
    (@house_id, 'Office', 'Overhead Light', 0, 70, '#FFFACD', 20);

-- Garage Light (1 light)
INSERT INTO lights (house_id, room_name, name, is_on, brightness, color, power_consumption_watts)
VALUES 
    (@house_id, 'Garage', 'Main Light', 0, 100, '#FFFFFF', 30);

-- ==================================================
-- 5. CREATE ROUTINES
-- ==================================================

-- Morning Routine (6:00 AM - 8:00 AM) - Weekdays only
INSERT INTO light_routines (
    house_id, name, description, color, start_time, end_time,
    repeat_monday, repeat_tuesday, repeat_wednesday, repeat_thursday, repeat_friday,
    repeat_saturday, repeat_sunday, active
)
VALUES (
    @house_id,
    'Morning Routine',
    'Gentle wake-up lighting for weekday mornings',
    '#FFE4B5',
    '06:00:00',
    '08:00:00',
    1, 1, 1, 1, 1, 0, 0, 1
);

SET @routine_morning = LAST_INSERT_ID();

-- Night Routine (10:00 PM - 11:30 PM) - Every day
INSERT INTO light_routines (
    house_id, name, description, color, start_time, end_time,
    repeat_monday, repeat_tuesday, repeat_wednesday, repeat_thursday, repeat_friday,
    repeat_saturday, repeat_sunday, active
)
VALUES (
    @house_id,
    'Night Mode',
    'Dim lights for evening relaxation',
    '#4169E1',
    '22:00:00',
    '23:30:00',
    1, 1, 1, 1, 1, 1, 1, 1
);

SET @routine_night = LAST_INSERT_ID();

-- Eco Mode (All day) - Weekdays
INSERT INTO light_routines (
    house_id, name, description, color, start_time, end_time,
    repeat_monday, repeat_tuesday, repeat_wednesday, repeat_thursday, repeat_friday,
    repeat_saturday, repeat_sunday, active
)
VALUES (
    @house_id,
    'Eco Saver',
    'Energy saving mode - minimal lighting',
    '#32CD32',
    '08:00:00',
    '18:00:00',
    1, 1, 1, 1, 1, 0, 0, 0
);

SET @routine_eco = LAST_INSERT_ID();

-- Party Mode (Weekend evenings)
INSERT INTO light_routines (
    house_id, name, description, color, start_time, end_time,
    repeat_monday, repeat_tuesday, repeat_wednesday, repeat_thursday, repeat_friday,
    repeat_saturday, repeat_sunday, active
)
VALUES (
    @house_id,
    'Party Mode',
    'Colorful lighting for weekend fun',
    '#FF1493',
    '20:00:00',
    '23:59:00',
    0, 0, 0, 0, 0, 1, 1, 0
);

SET @routine_party = LAST_INSERT_ID();

-- ==================================================
-- 6. ASSIGN LIGHTS TO ROUTINES
-- ==================================================

-- Morning Routine: Bedroom and Kitchen lights at low brightness
INSERT INTO light_routine_lights (routine_id, light_id, target_on, brightness, color_hex)
SELECT @routine_morning, id, 1, 40, '#FFE4B5'
FROM lights 
WHERE house_id = @house_id AND room_name IN ('Bedroom', 'Kitchen');

-- Night Routine: Living Room and Bedroom at 30% brightness
INSERT INTO light_routine_lights (routine_id, light_id, target_on, brightness, color_hex)
SELECT @routine_night, id, 1, 30, '#4169E1'
FROM lights 
WHERE house_id = @house_id AND room_name IN ('Living Room', 'Bedroom');

-- Eco Mode: Turn off most lights, keep essential ones at 20%
INSERT INTO light_routine_lights (routine_id, light_id, target_on, brightness, color_hex)
SELECT @routine_eco, id, 0, 20, '#FFFFFF'
FROM lights 
WHERE house_id = @house_id;

-- Party Mode: All living room lights at max with colorful settings
INSERT INTO light_routine_lights (routine_id, light_id, target_on, brightness, color_hex)
SELECT @routine_party, id, 1, 100, '#FF1493'
FROM lights 
WHERE house_id = @house_id AND room_name = 'Living Room';

-- ==================================================
-- 7. CREATE CURRENT ENERGY STATS
-- ==================================================
INSERT INTO current_energy_stats (
    house_id, 
    lights_on_count, 
    current_consumption_kwh, 
    today_consumption_kwh, 
    today_saved_kwh
)
VALUES (
    @house_id,
    8,  -- 8 lights currently on
    0.126,  -- 126 watts = 0.126 kW
    2.45,  -- Total consumption today
    1.23   -- Estimated savings
);

-- ==================================================
-- 8. CREATE HOURLY CONSUMPTION DATA (Last 24 hours)
-- ==================================================
INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh)
VALUES
    -- Today's data (simulate realistic consumption pattern)
    (@house_id, CURDATE(), 0, 0.05),   -- Midnight - very low
    (@house_id, CURDATE(), 1, 0.03),   -- 1 AM - minimal
    (@house_id, CURDATE(), 2, 0.02),   -- 2 AM - minimal
    (@house_id, CURDATE(), 3, 0.02),   -- 3 AM - minimal
    (@house_id, CURDATE(), 4, 0.03),   -- 4 AM - minimal
    (@house_id, CURDATE(), 5, 0.05),   -- 5 AM - starting to wake up
    (@house_id, CURDATE(), 6, 0.15),   -- 6 AM - morning routine
    (@house_id, CURDATE(), 7, 0.25),   -- 7 AM - morning peak
    (@house_id, CURDATE(), 8, 0.20),   -- 8 AM - getting ready
    (@house_id, CURDATE(), 9, 0.08),   -- 9 AM - most people left
    (@house_id, CURDATE(), 10, 0.05),  -- 10 AM - low
    (@house_id, CURDATE(), 11, 0.06),  -- 11 AM - low
    (@house_id, CURDATE(), 12, 0.12),  -- Noon - lunch time
    (@house_id, CURDATE(), 13, 0.10),  -- 1 PM - after lunch
    (@house_id, CURDATE(), 14, 0.05),  -- 2 PM - low
    (@house_id, CURDATE(), 15, 0.06),  -- 3 PM - low
    (@house_id, CURDATE(), 16, 0.08),  -- 4 PM - starting to come home
    (@house_id, CURDATE(), 17, 0.15),  -- 5 PM - people coming home
    (@house_id, CURDATE(), 18, 0.30),  -- 6 PM - evening peak starts
    (@house_id, CURDATE(), 19, 0.35),  -- 7 PM - dinner time peak
    (@house_id, CURDATE(), 20, 0.28),  -- 8 PM - evening activities
    (@house_id, CURDATE(), 21, 0.22),  -- 9 PM - winding down
    (@house_id, CURDATE(), 22, 0.15),  -- 10 PM - night mode
    (@house_id, CURDATE(), 23, 0.08);  -- 11 PM - going to bed

-- ==================================================
-- 9. CREATE LIGHT CONSUMPTION LOG (Sample data)
-- ==================================================
-- Log some recent light usage
INSERT INTO light_consumption_log (light_id, timestamp, duration_seconds, consumption_kwh)
SELECT 
    id,
    DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 5)) HOUR),
    3600,  -- 1 hour in seconds
    (power_consumption_watts * 3600) / 1000000  -- Convert watts-seconds to kWh
FROM lights 
WHERE house_id = @house_id AND is_on = 1
LIMIT 5;

-- ==================================================
-- 10. CREATE ENERGY MEASUREMENTS (Sample readings)
-- ==================================================
INSERT INTO energy_measurements (
    house_id, 
    measurement_time, 
    active_energy_import_kwh, 
    active_energy_export_kwh,
    inst_active_power_import_kw,
    inst_active_power_export_kw
)
VALUES
    (@house_id, DATE_SUB(NOW(), INTERVAL 1 HOUR), 2.35, 0.15, 0.120, 0.000),
    (@house_id, DATE_SUB(NOW(), INTERVAL 30 MINUTE), 2.40, 0.18, 0.126, 0.000),
    (@house_id, NOW(), 2.45, 0.20, 0.130, 0.000);

-- ==================================================
-- SUMMARY
-- ==================================================
-- Data added for user ID: 3
-- House: "My Smart Home" with 6 rooms
-- Lights: 15 lights across all rooms (8 currently ON)
-- Routines: 4 routines (Morning, Night, Eco, Party) with 2 active
-- Energy: Current stats + 24 hours of hourly data
-- ==================================================

SELECT 'Test data inserted successfully!' AS Status;
SELECT CONCAT('User ID: ', @user_id, ' | House ID: ', @house_id) AS Info;
SELECT COUNT(*) AS TotalLights FROM lights WHERE house_id = @house_id;
SELECT COUNT(*) AS LightsOn FROM lights WHERE house_id = @house_id AND is_on = 1;
SELECT COUNT(*) AS TotalRoutines FROM light_routines WHERE house_id = @house_id;
SELECT COUNT(*) AS ActiveRoutines FROM light_routines WHERE house_id = @house_id AND active = 1;
