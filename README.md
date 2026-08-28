# 🚀 E-Cell UIET KUK - Startup Pitch Competition Portal

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)

An official, production-ready **Startup Pitch Competition Registration Website** built for **E-Cell UIET KUK (University Institute of Engineering & Technology, Kurukshetra University)**.

---

## ✨ Features

* **Official Branding**: Prominent placement of the official E-Cell UIET KUK logo with zero distortion or aspect ratio changes.
* **Modern Entrepreneurship Theme**: Dark-mode glassmorphic design system (`#080c16`) with crimson red accents matching the logo's leaping figure.
* **Interactive Pitch Competition Cards**:
  * 💡 Showcase Your Idea
  * 🚀 Build Your Startup
  * 🎤 Pitch Your Vision
  * 🤝 Connect & Network
* **Roadmap & FAQ Accordion**: Interactive event timeline (September, October, November) and FAQs.
* **Real-time Client & Server Validation**:
  * Full Name (minimum 3 characters)
  * Email Address (valid email regex)
  * Phone Number (10-digit Indian mobile number regex)
  * Team Name (minimum 2 characters)
  * Startup / Idea Name
  * Startup / Idea Description with **Live Character Counter (`0 / 500`)**
* **Submission States & Celebration**: Loading button state (`Submitting...`), disabled prevention of double submission, and celebration confetti 🎉 on success.
* **Unique Registration ID**: Auto-generates unique IDs (e.g. `ECELL-2026-001`, `ECELL-2026-002`) with 1-click clipboard copy.
* **Organizer Dashboard (Admin View)**: Embedded organizer drawer to view, search/filter submissions, and export data directly to **CSV**.
* **Express REST API & Persistent Storage**: Server endpoints `POST /api/register` and `GET /api/registrations` saving entries to JSON storage.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **[Node.js](https://nodejs.org/)** (v18.0.0 or higher recommended)
* **[npm](https://www.npmjs.com/)** (v9.0.0 or higher)
* **[Git](https://git-scm.com/)**

---

## 💻 How to Run the Project for Other Users / Contributors

Follow these simple steps to clone and run the project locally on your system:

### Step 1: Clone the Repository
Open your terminal or command prompt and clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/ecell-uiet-kuk-startup-pitch.git
```

Navigate into the project folder:

```bash
cd ecell-uiet-kuk-startup-pitch
```

---

### Step 2: Install Project Dependencies
Run npm install to install all frontend and backend dependencies:

```bash
npm install
```

---

### Step 3: Start the Server & Website
Launch both the Express REST API server (port 8081) and Vite frontend dev server (port 8080) simultaneously:

```bash
npm run dev
```

---

### Step 4: Open in Web Browser
Open your browser and navigate to:

👉 **`http://localhost:8080`**

---

### 🪟 Windows 1-Click Fast Launcher
If you are on Windows, you can simply **double-click** the [`run.bat`](run.bat) file inside the project directory. It will automatically start the servers and open the website in your default browser!

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run vite -- build
```

The production output will be generated inside the `dist/` directory.

---

## 📁 Folder Structure

```text
ecell-uiet-kuk-startup-pitch/
├── public/
│   └── assets/
│       └── ecell-logo.jpg        # Official E-Cell UIET KUK Logo
├── server/
│   ├── server.js                 # Express REST API Server & Storage
│   └── data/
│       └── registrations.json    # Saved Registrations JSON Data
├── src/
│   ├── api/
│   │   └── registrationService.js# API Client & Offline Fallback
│   ├── components/
│   │   ├── Navbar.jsx            # Header Navigation & Logo
│   │   ├── Hero.jsx              # Pitch Hero & CTA Buttons
│   │   ├── CompetitionInfo.jsx   # 4 Interactive Feature Cards
│   │   ├── WhyParticipate.jsx    # Timeline & FAQ Section
│   │   ├── RegistrationForm.jsx  # Form with Real-time Validation
│   │   ├── SuccessMessage.jsx    # Success Screen & Unique ID
│   │   ├── AdminModal.jsx        # Organizer Dashboard & CSV Export
│   │   └── Footer.jsx            # Footer & Links
│   ├── utils/
│   │   └── validation.js         # Validation Logic Rules
│   ├── App.jsx                   # Main App Component
│   ├── main.jsx                  # React Entry Point
│   └── index.css                 # Custom Tailwind CSS & Styles
├── run.bat                       # Windows One-Click Launcher
├── package.json
└── vite.config.js
```
