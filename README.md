<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Space+Grotesk&weight=700&size=40&duration=3000&pause=1000&color=A985FF&center=true&vCenter=true&random=false&width=600&height=60&lines=Hello...+I+am+Romeo!+%F0%9F%91%8B" alt="Typing SVG" />
</p>

<p align="center">
  <em>A personal portfolio website built with React + NestJS, deployed on Vercel</em>
</p>

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" /></a>
  <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

---

## ✨ About

A full-stack personal portfolio website showcasing who I am — my background, skills, projects, interests, and more. Features a dark/light theme toggle, animated snow particles, a built-in music player, an interactive guestbook backed by Supabase, and a fully responsive design for mobile and desktop.

## 🖥️ Preview

| Dark Mode | Light Mode |
|:---------:|:----------:|
| 🌙 Deep violet aesthetic with animated particles | ☀️ Clean light theme with blue accents |

## 🚀 Features

- **🎨 Dark / Light Theme** — Toggle between a deep violet dark mode and a clean light mode
- **❄️ Animated Snow Particles** — Dynamic pixel snow background effect
- **🎵 Built-in Music Player** — Play, pause, shuffle, and browse a curated playlist
- **📖 Guestbook** — Leave messages powered by a NestJS API + Supabase database
- **📱 Fully Responsive** — Mobile-first design with a hamburger menu and adaptive layouts
- **🖼️ Gallery Lightbox** — Click-to-expand image gallery
- **⚡ Tab Navigation** — Smooth fade transitions between content sections

## 📁 Project Structure

```
Personal-Website/
├── frontend/               # React + Vite
│   ├── public/             # Static assets (images, songs, etc.)
│   ├── src/
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # All styles
│   │   └── components/     # Reusable components (PixelSnow, etc.)
│   ├── index.html
│   └── vite.config.js
│
└── backend/                # NestJS API
    ├── api/                # Vercel serverless entry point
    ├── src/
    │   ├── main.ts         # App bootstrap
    │   ├── app.module.ts
    │   └── guestbook/      # Guestbook module (controller + service)
    └── vercel.json
```

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite 5, Vanilla CSS, Three.js |
| **Backend** | NestJS 10, TypeScript, Express |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel (Serverless Functions) |

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**
- A [Supabase](https://supabase.com/) project (for the guestbook)

### 1. Clone the repository

```bash
git clone https://github.com/romeojrr/-Personal-Website-FINALS.git
cd -Personal-Website-FINALS/Personal-Website
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the dev server:

```bash
npm run start:dev
```

### 3. Setup the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

## 📂 Content Sections

| Section | Description |
|---------|-------------|
| **About Me** | Background info and education history |
| **Skills** | Frontend, Backend, and Developer Tools categorized with icons |
| **Projects** | ResqTags (Outsystems) and CapyHub (Flutter/Dart) |
| **My Interests** | Music albums, TV shows, anime, and sports |
| **Gallery** | Photo gallery with lightbox viewer |
| **Guestbook** | Interactive guestbook with Supabase backend |
| **Contact Me** | Contact information and social links |
| **Resources** | Helpful learning resources |

## 🌐 Deployment

Both the frontend and backend are deployed as separate Vercel projects:

- **Frontend** — Deployed as a static Vite build
- **Backend** — Deployed as a Vercel Serverless Function via the `api/` directory

## 🤝 Connect with Me

<p align="center">
  <a href="https://www.facebook.com/romeojralbeza/"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" /></a>
  <a href="https://www.instagram.com/rmyo_o/"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
  <a href="https://github.com/romeojrr"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

---

<p align="center">
  Made with 💜 by <strong>Romeo Albeza Jr.</strong>
</p>
