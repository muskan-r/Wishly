# ✨ Wishly

> Turn a simple birthday wish into a beautiful little world made just for someone special.

Wishly is an AI-powered birthday surprise platform that lets you create personalized, shareable birthday pages for the people you care about.

Instead of sending a simple "Happy Birthday" message, Wishly allows you to create a memorable digital experience with personalized messages, memories, music, animations, and more.

---

## 🌸 About Wishly

Wishly was created with one simple idea:

**A birthday wish should feel personal.**

Users can provide a person's name, relationship, and a few details about them. Wishly uses AI to help generate personalized birthday content and creates a beautiful birthday experience that can be shared through a unique link.

The goal is to make creating something meaningful simple, quick, and fun — without requiring any design skills.

---

## ✨ Features

- 🎂 Create personalized birthday pages
- 🤖 AI-powered birthday message generation
- 💖 Personalized content based on the recipient
- 📸 Add memories and photos
- 🎵 Add music to the birthday experience
- ✨ Beautiful animations and visual effects
- 🔗 Share birthday pages through a unique URL
- 📱 Responsive design for different screen sizes
- 🌙 Modern dark aesthetic UI
- ⚡ Fast and interactive frontend
- 🍃 MongoDB database for storing birthday pages

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

### AI

- Google Gemini API
- `@google/genai`

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

## 📁 Project Structure

```text
Wishly/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── CreateSection.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── View.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── loadEnv.js
│   │
│   ├── routes/
│   │   └── pageRoutes.js
│   │
│   ├── models/
│   │   └── ...
│   │
│   ├── controllers/
│   │   └── ...
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md