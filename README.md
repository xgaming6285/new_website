# $XTOKEN - AI Trading Platform

A modern web application for the $XTOKEN AI Trading Platform with MongoDB integration for user registrations.

## Features

- Beautiful, responsive landing page
- User registration form
- MongoDB database integration
- Real-time form validation
- Error handling and user feedback

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository or navigate to the project folder:

```bash
cd E:\GitProjects\new_website
```

2. Install dependencies:

```bash
npm install
```

3. Environment variables are already set in the `.env` file with your MongoDB connection string.

## Running the Application

1. Start the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

## API Endpoints

### POST /api/register

Register a new user.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "countryCode": "+1"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Registration successful! We will contact you soon.",
  "data": {
    "id": "...",
    "email": "john@example.com",
    "registeredAt": "2025-10-27T..."
  }
}
```

### GET /api/registrations

Get all registrations (admin endpoint).

### GET /api/health

Check server and database status.

### DELETE /api/registrations/:id

Delete a registration by ID (admin endpoint).

## Project Structure

```
new_website/
├── server.js           # Express server with MongoDB integration
├── index.html          # Main website HTML
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (MongoDB connection)
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── *.png              # Image assets
```

## MongoDB Schema

The registration data is stored with the following schema:

```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required),
  countryCode: String (required),
  timestamp: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Dependencies:**
  - express - Web framework
  - mongoose - MongoDB ODM
  - dotenv - Environment variable management
  - cors - Cross-origin resource sharing
  - body-parser - Parse incoming request bodies

## Security Notes

- The `.env` file contains sensitive credentials and should never be committed to version control
- The `.gitignore` file is configured to exclude `.env` and `node_modules`
- In production, use environment variables from your hosting platform

## Troubleshooting

### Cannot connect to MongoDB

- Verify your MongoDB connection string in `.env`
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure you have network access to MongoDB Atlas

### Port already in use

- Change the PORT in `.env` file
- Or kill the process using port 3000

### Dependencies not installing

- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

## License

ISC
