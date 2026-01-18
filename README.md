# Voltzy - Smart Energy Management System

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</div>

## 📱 About Voltzy

Voltzy is a comprehensive smart energy management mobile application that helps homeowners monitor and control their energy consumption in real-time. Built with React Native and Expo, Voltzy provides an intuitive interface for managing smart home lighting, tracking energy usage patterns, monitoring solar panel production, and automating routines to optimize energy efficiency.

### 🌟 Key Features

#### 🏠 Multi-House Management
- Manage multiple properties from a single account
- Switch seamlessly between different houses
- Track energy consumption per property

#### 💡 Smart Lighting Control
- **Room-based organization**: Organize lights by rooms (Living Room, Kitchen, Bedroom, etc.)
- **Individual light control**: Toggle lights on/off, adjust brightness (0-100%), and change colors
- **Real-time updates**: Instant synchronization across devices
- **Energy monitoring**: Track power consumption per light and room
- **Light details**: View detailed statistics including wattage, status, and consumption

#### ⚡ Comprehensive Energy Analytics
- **Dashboard Overview**: 
  - Current consumption (kWh)
  - Today's total consumption
  - Energy saved tracking
  - Number of active lights
  - Hourly consumption sparkline chart

- **Detailed Analytics Screen**:
  - **Consumption Graph**: 24-hour hourly consumption visualization with total kWh
  - **Room Consumption Insights**: Progress bars showing consumption by room with active light counts
  - **Energy Production**: Real-time solar energy production vs consumption graphs
  - **Load & Production Curves**: Three-line graph showing:
    - Consumption curve (blue)
    - Production curve (yellow)  
    - Net energy flow (purple)
  - **Consumption Heatmap**: 7-day × 11-hour matrix showing usage patterns (6 AM - 4 PM)
  - **Solar Panel Metrics**:
    - Self-sufficiency percentage
    - Panel efficiency percentage
    - Visual circular progress indicators

#### 🔄 Smart Routines & Automation
- **Create custom routines**: Automate light control based on:
  - Time of day
  - Day of week schedules
  - Energy consumption triggers
- **Routine management**: View, edit, enable/disable, and delete routines
- **Active routine tracking**: See which routines are currently running

#### 🔐 Secure Authentication
- User registration with name, email, and password
- Secure JWT-based authentication
- Password hashing with bcrypt
- Persistent login sessions
- Profile management

#### 🌞 Solar Panel Integration
- Real-time solar production monitoring
- UPAC (Unidade de Produção para Autoconsumo) support
- Self-sufficiency calculations
- Panel efficiency metrics
- Import/export energy tracking

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **React Native** (v0.71.14) - Cross-platform mobile framework
- **TypeScript** (v4.9.4) - Type-safe development
- **Expo SDK** (v48.0.0) - Development and build tooling
- **React Navigation** (v6) - Navigation and routing
  - Stack Navigator for authentication flow
  - Bottom Tab Navigator for main app navigation
- **react-native-svg** (v13.4.0) - Dynamic charts and visualizations
- **expo-linear-gradient** (v12.1.2) - Beautiful gradient backgrounds
- **AsyncStorage** - Local data persistence
- **Custom Comfortaa Font** - Enhanced UI typography

#### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MySQL** (v8.0+) - Relational database
- **mysql2** - MySQL client with promise support
- **JWT** (jsonwebtoken) - Secure authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Project Structure

```
NewVoltzy/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AddRoomModal.tsx
│   │   └── AddRoutineModal.tsx
│   ├── contexts/           # React Context providers
│   │   └── AppContext.tsx  # Global state (user, houses, auth)
│   ├── navigation/         # Navigation configuration
│   │   └── BottomTabNavigator.tsx
│   ├── screens/           # Application screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignInScreen.tsx (Registration)
│   │   ├── DashboardScreen.tsx
│   │   ├── ConsumptionScreen.tsx (Analytics)
│   │   ├── ChooseARoomScreen.tsx
│   │   ├── RoomLightsScreen.tsx
│   │   ├── LightDetailScreen.tsx
│   │   ├── RoutinesListScreen.tsx
│   │   └── RoutineDetailScreen.tsx
│   ├── services/          # API service layer
│   │   ├── api.ts         # Base API client
│   │   ├── energyService.ts
│   │   ├── housesService.ts
│   │   ├── lightsService.ts
│   │   └── routinesService.ts
│   ├── styles/           # Screen-specific styles
│   ├── backend/          # Auth utilities
│   │   ├── auth.ts
│   │   ├── config.ts
│   │   └── token.ts
│   └── data/
│       └── mockData.ts   # Fallback mock data
│
├── server/              # Backend API
│   ├── index.js         # Express server entry point
│   ├── db.js           # MySQL connection pool
│   ├── migrations.sql  # Database schema
│   ├── test-data.sql   # Sample data
│   ├── energy-data.sql # Energy analytics test data
│   ├── middleware/
│   │   └── auth.js     # JWT authentication middleware
│   └── routes/         # API route handlers
│       ├── user.js
│       ├── houses.js
│       ├── lights.js
│       ├── routines.js
│       └── energy.js
│
├── assets/
│   └── fonts/          # Custom fonts
│
├── App.tsx             # Application root
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── API_REFERENCE.md    # API documentation
```

### Database Schema

The application uses **MySQL** with the following main tables:

- **users**: User accounts (id, name, email, password_hash, profile_picture_url)
- **houses**: User properties (id, user_id, name, address, has_upac, upac_power_kw)
- **lights**: Smart light devices (id, house_id, room_name, name, brightness, color, is_on, power_consumption_watts)
- **routines**: Automation schedules (id, house_id, name, start_time, end_time, days_of_week, is_active)
- **routine_lights**: Routine-light associations (routine_id, light_id, target_state)
- **current_energy_stats**: Real-time energy metrics per house
- **hourly_consumption**: 24-hour consumption data for charts
- **energy_measurements**: Detailed energy import/export measurements
- **rooms**: Room definitions per house

See [server/migrations.sql](server/migrations.sql) for complete schema.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Expo CLI** (for mobile development)
- **Android Studio** (for Android testing) or **Xcode** (for iOS testing on macOS)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/alexmafidalgo/NewVoltzy.git
cd NewVoltzy
```

#### 2. Install Frontend Dependencies

```bash
npm install
```

#### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

#### 4. Database Setup

##### Create the Database

1. Start your MySQL server
2. Create the database and tables:

```bash
mysql -u root -p < server/migrations.sql
```

This will:
- Create the `smart_energy_app` database
- Set up all required tables
- Configure proper foreign key relationships

##### (Optional) Load Test Data

Load sample data for testing:

```bash
mysql -u root -p < server/test-data.sql
mysql -u root -p < server/energy-data.sql
```

Test data includes:
- 3 sample users
- Multiple houses with different configurations
- Lights across various rooms
- Active routines
- 24 hours of energy consumption data
- Solar production data
- 7-day consumption heatmap data

**Test Account Credentials:**
- Email: `john.doe@example.com`
- Password: `password123`

#### 5. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=smart_energy_app

# Server Configuration
PORT=3000

# JWT Secret (change this to a random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important:** Change the `JWT_SECRET` to a strong random string in production!

#### 6. Update Frontend API Configuration

Edit `src/backend/config.ts` to point to your backend server:

```typescript
export const API_CONFIG = {
  // For local development
  BASE_URL: 'http://localhost:3000',
  
  // For web testing
  // BASE_URL: 'http://localhost:3000',
  
  // For Android emulator
  // BASE_URL: 'http://10.0.2.2:3000',
  
  // For physical device (replace with your computer's local IP)
  // BASE_URL: 'http://192.168.1.100:3000',
};
```

## 🖥️ Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:3000`

For development with auto-reload:
```bash
npm run dev
```

Verify the server is running:
```bash
curl http://localhost:3000/health
# Should return: {"ok":true}
```

### Web Testing

#### Option 1: Using Expo Web

```bash
# From the project root directory
npm run web
```

This will:
1. Start the Expo development server
2. Open your default browser to `http://localhost:19006`
3. Enable hot-reloading for development

**Note:** Ensure the backend server is running before starting the web app.

#### Configuration for Web

In `src/backend/config.ts`, use:
```typescript
BASE_URL: 'http://localhost:3000'
```

#### Web Testing Tips

- **Chrome DevTools**: Press F12 to open developer tools
- **Mobile Simulation**: Use responsive design mode (Ctrl+Shift+M)
- **Network Debugging**: Check the Network tab for API calls
- **Console Logs**: View errors and logs in the Console tab

### Android Testing

#### Prerequisites for Android

1. **Install Android Studio**: [Download](https://developer.android.com/studio)
2. **Set up Android SDK**: 
   - Open Android Studio
   - Go to Settings → Appearance & Behavior → System Settings → Android SDK
   - Install Android 13.0 (API 33) or higher
3. **Configure Environment Variables**:
   - Add `ANDROID_HOME` to your system environment variables
   - Point to your Android SDK location (usually `C:\Users\<YourName>\AppData\Local\Android\Sdk`)

#### Option 1: Android Emulator

1. **Create an Emulator**:
   ```bash
   # Open Android Studio AVD Manager
   # Tools → Device Manager → Create Device
   # Select a device (e.g., Pixel 5)
   # Download and select a system image (Android 13/API 33)
   # Finish setup
   ```

2. **Update API Configuration** in `src/backend/config.ts`:
   ```typescript
   BASE_URL: 'http://10.0.2.2:3000'  // Special IP for Android emulator
   ```

3. **Start the Emulator**:
   - Open Android Studio
   - Device Manager → Select your device → Play button
   - Wait for the emulator to fully boot

4. **Run the App**:
   ```bash
   npm run android
   ```

   This will:
   - Build the Android app
   - Install it on the emulator
   - Start the Expo development server
   - Launch the app automatically

#### Option 2: Physical Android Device

1. **Enable Developer Mode** on your device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect via USB** and verify connection:
   ```bash
   adb devices
   # Should list your device
   ```

3. **Find Your Computer's Local IP**:
   ```bash
   # Windows
   ipconfig
   # Look for "IPv4 Address" under your active network adapter
   
   # macOS/Linux
   ifconfig
   # Look for "inet" under your active network adapter
   ```

4. **Update API Configuration** in `src/backend/config.ts`:
   ```typescript
   BASE_URL: 'http://192.168.1.100:3000'  // Replace with YOUR IP
   ```

5. **Ensure Same Network**:
   - Connect your device and computer to the same Wi-Fi network

6. **Run the App**:
   ```bash
   npm run android
   ```

#### Building APK for Testing

To create a standalone APK:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

The APK will be downloadable from Expo servers.

### iOS Testing (macOS only)

```bash
npm run ios
```

**Requirements:**
- macOS computer
- Xcode installed
- iOS Simulator or physical iOS device

**API Configuration** for iOS Simulator in `src/backend/config.ts`:
```typescript
BASE_URL: 'http://localhost:3000'  // localhost works on iOS simulator
```

## 🔌 API Endpoints

The application provides a comprehensive REST API. See [API_REFERENCE.md](API_REFERENCE.md) for complete documentation.

### Quick Reference

**Authentication:**
- `POST /auth/signup` - Create account
- `POST /auth/signin` - Login

**Houses:**
- `GET /api/houses` - Get user's houses
- `POST /api/houses` - Create house
- `GET /api/houses/:id/rooms` - Get house rooms
- `POST /api/houses/:id/rooms` - Add room

**Lights:**
- `GET /api/houses/:houseId/lights` - Get all lights
- `GET /api/houses/:houseId/rooms/:roomName/lights` - Get room lights
- `PUT /api/lights/:id` - Update light state
- `DELETE /api/lights/:id` - Delete light

**Energy:**
- `GET /api/houses/:houseId/energy/current` - Current stats
- `GET /api/houses/:houseId/energy/hourly` - Hourly consumption
- `GET /api/houses/:houseId/energy/by-room` - Room breakdown
- `GET /api/houses/:houseId/energy/production` - Solar production
- `GET /api/houses/:houseId/energy/load-curve` - Load curves
- `GET /api/houses/:houseId/energy/heatmap` - Consumption heatmap
- `GET /api/houses/:houseId/energy/solar-metrics` - Solar metrics

**Routines:**
- `GET /api/houses/:houseId/routines` - Get routines
- `POST /api/routines` - Create routine
- `PUT /api/routines/:id` - Update routine
- `DELETE /api/routines/:id` - Delete routine

All endpoints (except `/auth/*`) require JWT authentication:
```
Authorization: Bearer <your_jwt_token>
```

## 🎨 App Screenshots & Flow

### Authentication Flow
1. **Welcome Screen** → Initial landing page
2. **Login Screen** → Existing user login
3. **Sign In Screen** → New user registration

### Main App Navigation (Bottom Tabs)
1. **Dashboard** (Home) → Overview with quick stats, consumption chart, lights, and routines
2. **Lights** → Room selection → Room lights → Individual light control
3. **Routines** → Routine list → Routine details
4. **Analytics** → Comprehensive energy analytics and graphs

## 🔧 Development

### Running Tests

```bash
# Frontend tests
npm test

# Backend tests
cd server
npm test
```

### Code Style

The project uses TypeScript with strict typing. Follow these guidelines:

- Use functional components with hooks
- Define proper TypeScript interfaces for all data structures
- Use async/await for asynchronous operations
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks or services

### Adding New Features

1. **Backend:**
   - Add route handler in `server/routes/`
   - Update database schema if needed
   - Add authentication middleware to protected routes

2. **Frontend:**
   - Create TypeScript interfaces in service files
   - Add service methods in `src/services/`
   - Create/update screen components
   - Update navigation if needed
   - Add styles in `src/styles/`

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Errors

**Error:** `ER_ACCESS_DENIED_ERROR` or `ECONNREFUSED`

**Solution:**
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `smart_energy_app` exists
- Test connection: `mysql -u root -p -e "SELECT 1"`

#### Android Emulator Connection Issues

**Error:** `Unable to connect to server`

**Solution:**
- Use `http://10.0.2.2:3000` as BASE_URL (not localhost)
- Verify backend is running on port 3000
- Check firewall settings
- Restart emulator and Expo dev server

#### Expo Build Errors

**Error:** `Module not found` or build failures

**Solution:**
```bash
# Clear caches
npx expo start -c

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Reset bundler cache
npx expo start --reset-cache
```

#### Font Loading Issues

**Error:** Fonts not displaying correctly

**Solution:**
- Verify fonts exist in `assets/fonts/`
- Check `App.tsx` font loading
- Wait for `fontsLoaded` before rendering
- Use system fonts as fallback

#### Authentication Errors

**Error:** `Invalid token` or `401 Unauthorized`

**Solution:**
- Check JWT_SECRET matches between frontend and backend
- Verify token is being sent in Authorization header
- Check token expiration (7 days by default)
- Clear AsyncStorage: `AsyncStorage.clear()`

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Alex Fidalgo** - [GitHub](https://github.com/alexmafidalgo)
- **Duarte Fernandes** - [GitHub](https://github.com/duarteportfolio)
- **Catarina Sousa** - [GitHub](https://github.com/alexmafidalgo)
- **Manuel Liu** - [GitHub](https://github.com/alexmafidalgo)
## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues and questions:
- GitHub Issues: [NewVoltzy Issues](https://github.com/duarteportfolio/NewVoltzy/issues)
- Email: Contact repository maintainers

## 🙏 Acknowledgments

- ESMAD - Escola Superior de Media Artes e Design
- Computação Móvel e Ubíqua course
- React Native and Expo communities
- All contributors and testers

---

**Built with ❤️ for sustainable energy management**