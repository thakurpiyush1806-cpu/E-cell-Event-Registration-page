# 🚀 E-Cell UIET KUK - Startup Pitch Competition Portal

Official registration portal for the **Startup Pitch Competition** organized by **E-Cell UIET KUK (University Institute of Engineering & Technology, Kurukshetra University)**.

---

## 🌟 Key Features

* **Official Branding**: Direct usage of the official E-Cell UIET KUK logo with zero aspect ratio distortion.
* **Modern Dark UI/UX**: Built with Tailwind CSS, Lucide icons, and smooth Framer Motion animations.
* **Responsive Layout**: Fully responsive across Mobile, Tablet, Laptop, and Desktop screens.
* **Comprehensive Registration Form**:
  * Full Name (minimum 3 characters)
  * Email Address (valid email validation)
  * Phone Number (10-digit Indian mobile number validation)
  * Team Name (minimum 2 characters)
  * Startup / Idea Name
  * Startup / Idea Description with **Live Character Counter (`0 / 500`)**
* **Instant Validation & Feedback**: Real-time error messages, loading state (`Submitting...`), disabled states during submit, and celebration confetti animation upon success.
* **Unique Registration ID Generator**: Automatically generates unique registration IDs (`ECELL-2026-001`, `ECELL-2026-002`) with a 1-click copy feature.
* **Backend REST API & Persistence**: Express REST API backend (`POST /api/register`, `GET /api/registrations`) with persistent JSON data storage.
* **Organizer Portal**: Built-in admin dashboard with team search and **Export to CSV** functionality.

---

## 📁 Project Structure

```text
D:\EventRegistration E-cell\
├── public/
│   └── assets/
│       └── ecell-logo.jpg        # Official E-Cell UIET KUK Logo
├── server/
│   ├── server.js                 # Express REST API Server
│   └── data/
│       └── registrations.json    # Persistent Registration Data Store
├── src/
│   ├── api/
│   │   └── registrationService.js# API Service & Offline Fallback
│   ├── components/
│   │   ├── Navbar.jsx            # Header Navigation & Branding
│   │   ├── Hero.jsx              # Pitch Hero & CTAs
│   │   ├── CompetitionInfo.jsx   # 4 Interactive Feature Cards
│   │   ├── WhyParticipate.jsx    # Roadmap Timeline & FAQs
│   │   ├── RegistrationForm.jsx  # Form with Real-Time Validation
│   │   ├── SuccessMessage.jsx    # Celebration Card & Unique ID
│   │   ├── AdminModal.jsx        # Organizer View & CSV Export
│   │   └── Footer.jsx            # Footer & Contact Links
│   ├── utils/
│   │   └── validation.js         # Form Validation Logic
│   ├── App.jsx                   # Main Application State
│   ├── main.jsx                  # Entry Point
│   └── index.css                 # Custom Tailwind CSS & Animations
├── .gitignore
├── run.bat                       # One-Click Launch Script
├── build.bat                     # Build Bundle Script
├── package.json
└── vite.config.js
```

---

## ⚡ Quick Start Guide

### Option 1: Double-Click Launcher (Windows)
Double-click [`run.bat`](run.bat) to launch the server and open the website automatically in your browser!

### Option 2: Command Line

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. Open **`http://localhost:3000`** in your browser.

---

## 🛠️ GitHub Push Instructions

To push this repository to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: E-Cell UIET KUK Startup Pitch Competition Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

---

© 2026 E-Cell UIET KUK. All Rights Reserved.
