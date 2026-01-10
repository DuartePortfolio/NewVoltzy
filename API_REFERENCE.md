# API Quick Reference

## Authentication Required
All endpoints except `/auth/*` require JWT token in `Authorization: Bearer <token>` header

---

## 🔐 Authentication

### POST /auth/signup
Create new user account
```json
Request: { "name": "John", "email": "john@example.com", "password": "pass123" }
Response: { "user": {...}, "token": "jwt_token" }
```

### POST /auth/signin
Login existing user
```json
Request: { "identifier": "john@example.com", "password": "pass123" }
Response: { "user": {...}, "token": "jwt_token" }
```

---

## 🏠 Houses & Rooms

### GET /api/houses
Get all houses for current user
```json
Response: { "houses": [{ "id": 1, "name": "Home", ... }] }
```

### POST /api/houses
Create new house
```json
Request: { "name": "Beach House", "address": "123 Ocean Dr" }
Response: { "house": { "id": 2, ... } }
```

### GET /api/houses/:houseId/rooms
Get all rooms in a house
```json
Response: { "rooms": [{ "id": 1, "name": "Living Room" }] }
```

### POST /api/houses/:houseId/rooms
Add room to house
```json
Request: { "name": "Guest Bedroom" }
Response: { "room": { "id": 5, "name": "Guest Bedroom" } }
```

---

## 💡 Lights

### GET /api/houses/:houseId/lights
Get all lights in a house
```json
Response: { "lights": [{ "id": 1, "name": "Ceiling Light", "room_name": "Living Room", "is_on": true, ... }] }
```

### GET /api/houses/:houseId/rooms/:roomName/lights
Get lights in specific room
```json
Response: { "lights": [{ "id": 1, "name": "Ceiling Light", ... }] }
```

### GET /api/lights/:lightId
Get single light details
```json
Response: { "light": { "id": 1, "name": "Ceiling Light", "brightness": 80, "color": "#FFFFFF", ... } }
```

### POST /api/lights
Create new light
```json
Request: {
  "house_id": 1,
  "room_name": "Kitchen",
  "name": "Under Cabinet",
  "brightness": 100,
  "color": "#FFFFFF",
  "power_consumption_watts": 12
}
Response: { "light": { "id": 10, ... } }
```

### PUT /api/lights/:lightId
Update light state
```json
Request: { "is_on": true, "brightness": 75, "color": "#FFD700" }
Response: { "message": "Light updated successfully", "light": {...} }
```

### DELETE /api/lights/:lightId
Delete a light
```json
Response: { "message": "Light deleted successfully" }
```

---

## ⏰ Routines

### GET /api/houses/:houseId/routines
Get all routines for a house
```json
Response: {
  "routines": [{
    "id": 1,
    "name": "Morning",
    "start_time": "06:00:00",
    "end_time": "08:00:00",
    "repeat_monday": true,
    "active": true,
    "lights": [{ "light_id": 1, "target_on": true, "brightness": 80 }]
  }]
}
```

### GET /api/routines/:routineId
Get single routine details
```json
Response: { "routine": { "id": 1, "name": "Morning", "lights": [...], ... } }
```

### POST /api/routines
Create new routine
```json
Request: {
  "house_id": 1,
  "name": "Evening Relax",
  "start_time": "19:00:00",
  "end_time": "22:00:00",
  "repeat_friday": true,
  "repeat_saturday": true,
  "lights": [
    { "light_id": 1, "target_on": true, "brightness": 40, "color_hex": "#FF6B35" }
  ]
}
Response: { "routine": { "id": 3, ... } }
```

### PUT /api/routines/:routineId
Update routine
```json
Request: { "name": "Late Evening", "active": false }
Response: { "message": "Routine updated successfully" }
```

### PUT /api/routines/:routineId/toggle
Toggle routine active state
```json
Response: { "message": "Routine toggled successfully", "active": true }
```

### DELETE /api/routines/:routineId
Delete routine
```json
Response: { "message": "Routine deleted successfully" }
```

---

## ⚡ Energy & Dashboard

### GET /api/houses/:houseId/energy/current
Get current energy statistics
```json
Response: {
  "lights_on_count": 5,
  "current_consumption_kwh": 0.245,
  "today_consumption_kwh": 32.4,
  "today_saved_kwh": 14.8,
  "last_updated": "2026-01-10T..."
}
```

### GET /api/houses/:houseId/energy/hourly?date=2026-01-10
Get hourly consumption for chart (24 data points)
```json
Response: {
  "date": "2026-01-10",
  "hourly_data": [
    { "hour": 0, "consumption_kwh": 0.5 },
    { "hour": 1, "consumption_kwh": 0.3 },
    ...
    { "hour": 23, "consumption_kwh": 1.2 }
  ]
}
```

### GET /api/houses/:houseId/energy/by-room
Get consumption breakdown by room
```json
Response: {
  "rooms": [
    {
      "room_name": "Living Room",
      "light_count": 3,
      "lights_on": 2,
      "current_consumption_kw": 0.05,
      "total_capacity_kw": 0.15
    },
    ...
  ]
}
```

### POST /api/houses/:houseId/energy/update
Update current stats (for testing/simulation)
```json
Request: {
  "lights_on_count": 7,
  "today_consumption_kwh": 35.2,
  "today_saved_kwh": 16.1
}
Response: { "message": "Energy stats updated successfully" }
```

### POST /api/houses/:houseId/energy/hourly
Add hourly data point (for testing/simulation)
```json
Request: { "date": "2026-01-10", "hour": 14, "consumption_kwh": 1.8 }
Response: { "message": "Hourly consumption data saved successfully" }
```

---

## 👤 User Profile

### GET /api/user/profile
Get current user profile
```json
Response: {
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profile_picture_url": "https://...",
    "created_at": "2026-01-01T..."
  }
}
```

### PUT /api/user/profile
Update user profile
```json
Request: { "name": "John Smith", "profile_picture_url": "https://new-pic.jpg" }
Response: { "message": "Profile updated successfully", "user": {...} }
```

---

## 🔑 Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request (missing fields)
- **401** - Unauthorized (no/invalid token)
- **403** - Forbidden (expired token)
- **404** - Not Found
- **409** - Conflict (duplicate email)
- **500** - Server Error

---

## 💡 Tips

1. **All times** are in 24-hour format (HH:MM:SS)
2. **Colors** are hex strings (#RRGGBB)
3. **Brightness** is 0-255
4. **Dates** are YYYY-MM-DD
5. **House ownership** is automatically verified for all house-scoped endpoints
6. **Cascade deletes** - Deleting a house removes all associated data
