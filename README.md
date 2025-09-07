# 📝 NotesApp

A full-stack Notes application where users can **sign up, log in, and manage their notes** securely.  
Authentication is available via **Manual Signup/Login, Google OAuth, and GitHub OAuth**.

---

## 🚀 Features
- User Authentication:
  - Manual (username, email, password)
  - Google Login
  - GitHub Login
- Create, Read, Update, and Delete (CRUD) Notes
- Secure sessions with Passport.js
- Error handling & form validation
- Default profile picture support

---

## 🛠️ Tech Stack
- **Frontend:** EJS, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js (Local, Google OAuth 2.0, GitHub OAuth 2.0)

---

## 📂 Folder Structure


src/
├── config/ # Passport strategies
├── models/ # Mongoose models
├── routes/ # Express routes
├── views/ # EJS templates
├── public/ # Static files (CSS, images)
└── server.js # Main entry point


---

## ⚙️ Installation & Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/<your-username>/NotesApp.git
   cd NotesApp
Install dependencies
npm install

Create a .env file in the root folder and add:
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

