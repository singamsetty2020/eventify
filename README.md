# 📌 Eventify – Event Management Platform

Eventify is a **React + Bootstrap** based event management web app.  
It allows users to **browse events, register, manage favorites, and view their dashboard**, while an **admin** can monitor all users and registrations.

---

## 🚀 Features (as per problem statement)

### Core Requirements
- ✅ **Landing Page** with hero slider & featured events  
- ✅ **Events Page** with:
  - Search bar  
  - Category filter  
  - Event cards with details & “Register” button  
- ✅ **Event Details Page** with venue, date, deadline & registration form  
- ✅ **Registration Modal** (Name, Email, Phone) with local data storage  
- ✅ **User Login & Register** system (stored in localStorage)  
- ✅ **User Dashboard** showing:
  - Personal registrations  
  - Cancel registration option  
  - Download registrations (JSON file)  

### Bonus Features
- ⭐ **Dark / Light Mode Toggle**  
- ⭐ **Favorites / Bookmarks Page**  
- ⭐ **Analytics Pie Chart** (registrations by category in Dashboard)  

### Extra Added
- 👨‍💻 **Admin Login** (`admin / admin123`)  
- 📊 **Admin Dashboard**:
  - View all users  
  - View all registrations  
  - Delete registrations  
  - Export all data (JSON)  

---

## 🖥️ Pages in the Project

- `/` → Landing page with hero slider & featured events  
- `/events` → Events listing (search + category filter)  
- `/event/:id` → Event details page with Register option  
- `/login` → User login  
- `/register` → New user signup  
- `/dashboard` → User dashboard (personal data only)  
- `/favorites` → Favorites/bookmarked events  
- `/admin-login` → Admin login page  
- `/admin-dashboard` → Admin dashboard (all users + registrations)


## Deployment

The project is deployed live using **Netlify**.  
You can access the application here: [Live Demo](https://celadon-puffpuff-7bc148.netlify.app)


---

## 🔑 Demo Credentials

### User
- Register new users via **Register Page**.  
- Login with email/password.  

### Admin
- **Username:** `admin`  
- **Password:** `admin123`  

---

## ⚙️ Tech Stack

- **Frontend:** React.js (CRA) + Bootstrap 5  
- **State Management:** React Context API  
- **Data Storage:** LocalStorage (no backend, for demo)  
- **Charts:** Recharts  

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/eventify.git
cd eventify
2. Install dependencies npm install

3. Run locally (development mode) npm start


Open http://localhost:3000
 in browser.

4. Build for production
npm run build

🌍 Deployment

You can deploy using:

Vercel
 (recommended, one-click GitHub integration)

Netlify

GitHub Pages

Example (Vercel):

Push project to GitHub

Go to Vercel → Import GitHub Repo → Deploy

Get live project link

📊 Data Storage Details

Users → stored in localStorage (eventify_users)

Registrations → stored in localStorage (eventify_registered)

Favorites → stored in localStorage (eventify_favorites)

Admin flag → stored in localStorage (eventify_admin)

⚠️ Data is browser-local (not shared across users). For demo purposes only.

📸 Screenshots

Landing Page


Events Page


Event Details & Registration


User Dashboard


Favorites Page


Admin Login


Admin Dashboard


🎯 How to Use

Open Landing page → browse events → click an event

Register using Name, Email, Phone

Login/Register as a user → check personal dashboard

Bookmark favorite events → view them in Favorites page

Switch between Dark/Light mode

Admin → login as admin/admin123 → access Admin Dashboard

✨ Built with ❤️ by Lakshmi Akhila for HR demo presentation.
