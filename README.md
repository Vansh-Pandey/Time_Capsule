# Time Capsule

## Project Overview
Time Capsule is a web application that allows users to create, store, and share time-locked or shared capsules containing text, multimedia, or event-based content. The application includes features such as authentication, a dashboard for managing capsules, chat functionality, notifications, and account settings.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

---

## Frontend Setup (Vite + React)

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Vansh-Pandey/Time_Capsule.git
   ```
2. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

### Frontend Dependencies
The frontend uses the following libraries:
- `axios` - For making HTTP requests.
- `react-hook-form` - For form handling.
- `framer-motion` - For animations.
- `lucide-react` - For icons.
- `react-router-dom` - For client-side routing.
- `react-toastify` - For toast notifications.
- `react-icons` - For additional icons.
- `zustand` - For state management.
- `chroma-js` 
- `three` - for threejs
- `simplex-noise` - for threejs
---

## Backend Setup (Express + MongoDB)

### Installation Steps
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following environment variables:
   ```env
   PORT=5001
   ATLAS_URI=your_mongodb_connection_string
   NODE_ENV=development
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Backend Dependencies
The backend uses the following libraries:
- `express` - Web framework for Node.js.
- `dotenv` - For managing environment variables.
- `cookie-parser` - To handle cookies.
- `body-parser` - Middleware for handling request bodies.
- `cors` - To enable cross-origin requests.
- `path` - For handling file paths.
- `multer` - For handling file uploads.
- `mongoose` - For interacting with MongoDB.
- `jsonwebtoken` - For authentication.
- `cloudinary` - For storing and managing media files.
- `bcryptjs` - For hashing passwords.
- `nodemon` - For live server
- `socket.io`- for real-time chat
---

## Repository Structure
```
Time_Capsule/
│── frontend/              # Frontend (Vite + React)
│   ├── src/               # React source code
│   │   ├── components/    # UI components
│   │   ├── pages/         # React pages
│   │   ├── hooks/         # Custom hooks
│   │   ├── store/         # Zustand store
│   │   ├── assets/        # Static assets
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # React entry point
│   ├── public/            # Static files
│   ├── index.html         # Main HTML file
│   ├── vite.config.js     # Vite configuration
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend README
│
│── backend/               # Backend (Express + MongoDB)
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Middleware functions
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables
│   ├── uploads/           # Stored media files
│   └── README.md          # Backend README
│
└── README.md              # Main project README
```

---

## Running the Full Stack Application
To run the complete application:
1. Start the backend server:
   ```sh
   cd backend
   npm run dev
   ```
2. Start the frontend development server:
   ```sh
   cd frontend
   npm run dev
   ```

The application should now be accessible in your browser at `http://localhost:5173/` (default Vite port).

---

## Contribution
Feel free to contribute by creating issues, submitting pull requests, or suggesting improvements!

---

## License
This project is licensed under the MIT License.

---

## Contact
For any issues or inquiries, reach out to **Vansh Pandey**.

Happy Coding! 🚀

