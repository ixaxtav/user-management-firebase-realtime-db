# User Management System

A full-stack user management application built with React, TypeScript, Express.js, and Firebase Realtime Database.

## Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Real-time Updates** - Firebase Realtime Database integration
- ✅ **Location Data** - Automatic latitude/longitude/timezone fetching via OpenWeatherMap API
- ✅ **Modern UI** - Built with Chakra UI components
- ✅ **Toast Notifications** - Success/error feedback
- ✅ **Search Functionality** - Filter users by name or zip code
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **TypeScript** - Full type safety
- ✅ **Environment Configuration** - Configurable API endpoints

## Tech Stack

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Chakra UI** - Component library
- **Vite** - Build tool and dev server
- **Firebase SDK** - Realtime Database client

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Firebase Admin SDK** - Server-side Firebase operations
- **OpenWeatherMap API** - Location data fetching

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Realtime Database enabled
- OpenWeatherMap API key

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-management
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all
```

### 3. Environment Setup

#### Backend Environment

Create a `.env` file in the `backend` directory:

```bash
# backend/.env
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

#### Frontend Environment (Optional)

Create a `.env` file in the `frontend` directory:

```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Realtime Database
4. Update security rules to allow read/write access:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
5. Download service account key and place it in `backend/serviceAccountKey.json`

### 5. Run the Application

```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Available Scripts

### Root Level Commands

```bash
npm run dev              # Start both frontend and backend
npm run build           # Build both for production
npm run start           # Start both in production mode
npm run install:all     # Install all dependencies
```

### Individual Project Commands

```bash
# Frontend
npm run dev:frontend    # Start only frontend
npm run build:frontend  # Build only frontend

# Backend
npm run dev:backend     # Start only backend
npm run build:backend   # Build only backend
```

## Project Structure

```
user-management/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Chakra UI components
│   │   │   ├── CreateUserDialog.tsx
│   │   │   ├── EditUserDialog.tsx
│   │   │   ├── DeleteDialog.tsx
│   │   │   ├── UserForm.tsx
│   │   │   └── UserTable.tsx
│   │   ├── services/        # API services
│   │   ├── types/          # TypeScript types
│   │   └── config/         # Configuration
│   └── package.json
├── backend/                  # Express.js backend
│   ├── src/
│   │   ├── config/         # Firebase configuration
│   │   └── index.ts        # Main server file
│   └── package.json
└── package.json             # Root package.json with concurrently
```

## API Endpoints

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## User Data Structure

Each user contains:

- `id` - Unique identifier
- `name` - User's name
- `zipCode` - ZIP/postal code
- `latitude` - Geographic latitude
- `longitude` - Geographic longitude
- `timezone` - Timezone offset

## Development

### Adding New Features

1. Frontend components are in `frontend/src/components/`
2. Backend API routes are in `backend/src/index.ts`
3. Types are defined in `frontend/src/types/`

### Environment Variables

- `VITE_API_BASE_URL` - Frontend API base URL (default: http://localhost:3000)
- `OPENWEATHER_API_KEY` - Backend OpenWeatherMap API key

### Firebase Configuration

- Update `frontend/src/firebase.ts` with your Firebase config
- Update `backend/src/config/firebaseConfig.ts` with your service account

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend CORS is configured for frontend URL
   - Check that both servers are running

2. **Firebase Permission Denied**

   - Update Firebase Realtime Database security rules
   - Verify service account key is correct

3. **OpenWeatherMap API Errors**

   - Check API key is valid
   - Verify ZIP code format (US format: 12345)

4. **Port Conflicts**
   - Frontend runs on port 5173 (Vite default)
   - Backend runs on port 3000
   - Change ports in respective package.json files if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
