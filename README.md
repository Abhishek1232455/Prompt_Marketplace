# Prompt Marketplace 🚀

Prompt Marketplace is a full-stack web application that allows users to discover, purchase, and manage high-quality AI prompts. It serves as a central hub where creators can upload their specialized prompts, and users can unlock them using a digital credit system powered by Stripe.

## 🌟 Features

*   **Secure Authentication**: User signup and login system using JWT and bcrypt.
*   **Prompt Catalog**: Browse a curated list of AI prompts categorized by use case (e.g., Development, Marketing, Design).
*   **Credit System**: Digital wallet system where users can purchase credits via Stripe and spend them to unlock premium prompts.
*   **Private Collection**: A dedicated user dashboard ("My Collection") to view and easily copy purchased prompts.
*   **Encrypted Storage**: The sensitive prompt data is encrypted in the database and only decrypted for users who have successfully purchased it.
*   **Responsive UI**: Modern, clean, and fully responsive user interface built with Tailwind CSS and DaisyUI.

## Tech Stack 

**Frontend:**
*   React 18
*   Redux Toolkit (State Management)
*   React Router DOM (Routing)
*   Tailwind CSS & DaisyUI (Styling)
*   Stripe.js (Client-side payments)

**Backend:**
*   Node.js & Express.js (REST API)
*   MongoDB & Mongoose (Database & ODM)
*   JSON Web Tokens (Authentication)
*   Bcrypt (Password Hashing)
*   Crypto-js (Prompt Data Encryption)
*   Stripe Node (Server-side payment processing)

## 📦 Prerequisites

Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MongoDB](https://www.mongodb.com/) (Running locally on default port `27017` or a MongoDB Atlas URI)

## 🚀 Installation & Setup

This project is split into a `frontend` and `backend` directory. You will need to run both simultaneously.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Prompt_Marketplace.git
cd Prompt_Marketplace
```

### 2. Backend Setup
Open a new terminal window:
```bash
cd backend

# Install dependencies
npm install

# Start the development server
npm start
```
*The backend will run on `http://localhost:8000`.*

### 3. Frontend Setup
Open a second terminal window:
```bash
cd frontend

# Install dependencies (use --legacy-peer-deps for React 18 compatibility)
npm install --legacy-peer-deps

# Start the React app
npm start
```
*The frontend will run on `http://localhost:3000`.*

## ⚙️ Environment Variables

The project uses `.env` files for configuration. Example configurations are provided in the respective directories.

**Backend (`backend/.env`):**
```env
MONGO_URL=mongodb://127.0.0.1:27017/prompt_marketplace
JWT_SECRET=your_jwt_secret_key
PROMPT_KEY=your_encryption_key
PORT=8000
```

**Frontend (`frontend/.env`):**
```env
REACT_APP_SERVER_URL=http://localhost:8000
REACT_APP_CLOUD_IMAGE_URL=https://api.cloudinary.com/v1_1/your_cloud/image/upload
REACT_APP_CLOUD_IMAGE_NAME=your_cloud_name
REACT_APP_CLOUD_IMAGE_PRESET=your_upload_preset
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is licensed under the ISC License.
