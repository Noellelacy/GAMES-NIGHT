# THE NIGHT SHIFT - Game Night RSVP System

## 📁 Files

- **index.html** - Main RSVP form (public-facing)
- **admin.html** - Admin dashboard (password-protected)
- **README.md** - This file

## 🚀 How to Run

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve

# Or any static file server
```

Then open:
- **Public RSVP**: http://localhost:8080/index.html
- **Admin Panel**: http://localhost:8080/admin.html

## 🔐 Admin Access

**Default Password**: `nightshift2024`

⚠️ **IMPORTANT**: Change the password in `admin.html` line 590:
```javascript
const ADMIN_PASSWORD = 'your-secure-password';
```

## ✨ Admin Features

### 1. **RSVP Management**
- View all RSVPs in a table
- Edit guest details (name, status, notes)
- Delete individual RSVPs
- Clear all RSVPs (with confirmation)
- Real-time stats dashboard

### 2. **Settings Panel**
Configure the frontend from the admin panel:
- Event Title
- Max Parking Spots
- Event Date/Time
- Location

Changes are saved to localStorage and immediately reflected on the public RSVP page.

### 3. **Export Options**
- **Download CSV** - For spreadsheets
- **Download JSON** - Full data backup
- **Copy WhatsApp Summary** - Formatted for group chats
- **Import Data** - Restore from JSON backup

## 📊 Data Storage

All data is stored in **localStorage**:
- RSVPs: `noellelacy_gamenight_rsvp_list_v2`
- Settings: `noellelacy_gamenight_settings`

## 🔗 How Admin Controls Frontend

When you change settings in the admin panel:

1. **Title** → Updates page title and hero heading
2. **Parking Spots** → Updates parking capacity and meter
3. **Date/Time** → Updates the "When" badge
4. **Location** → Updates the "Where" badge

The frontend reads these settings on load and applies them automatically.

## 🎨 Customization

### Change Colors
Edit the Tailwind config in both HTML files (lines 17-54):
```javascript
colors: {
  night: {
    base: '#040D0A',       // Background
    card: '#0B1C15',       // Card background
    emerald: '#10B981',    // Primary accent
    purple: '#A855F7',     // Secondary accent
    gold: '#FACC15',       // Tertiary accent
  }
}
```

### Change Password
Edit `admin.html` line 590:
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

## 📱 Mobile Responsive

Both the public RSVP form and admin panel are fully responsive and work on mobile devices.

## 🔒 Security Notes

- This uses client-side storage (localStorage)
- Password protection is basic (session-based)
- For production, consider:
  - A real backend (Firebase, Supabase, etc.)
  - Server-side authentication
  - Database instead of localStorage

## 🎯 Quick Start

1. Open `admin.html` and login with `nightshift2024`
2. Go to Settings and configure your event
3. Share `index.html` link with guests
4. Monitor RSVPs in the admin panel
5. Export data when needed

Enjoy your game night! 🎲🍸
