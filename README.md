# Kalender

A simple, clean, multi-language calendar app with user accounts. Sign up, browse the monthly view, and click any day to add, edit, or delete events — your events are saved to your account and sync back whenever you log in again. Built with plain HTML/CSS/JavaScript (no framework, no build tool) plus Firebase for authentication and data storage.

## Features

- 📅 Monthly calendar view (previous/next month and "today" navigation)
- 👤 Sign up / log in with a simple profile (name, email, password)
- ➕ **Add**, **edit**, and **delete** events from a modal opened by clicking a day
- ☁️ Events are saved to your account (Firebase Firestore) and available on any device you log in from
- 🔵 Visual marker (dot) on days that have events
- 🌐 **Turkish / English / German** language support — the selected language is remembered
- 📱 Responsive UI — works on desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3 (Grid-based layout, responsive design via media queries)
- Vanilla JavaScript (no framework, no build tool)
- [Firebase](https://firebase.google.com/) (Authentication + Firestore) for accounts and data sync

## Getting Started

### 1. Create a Firebase project

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
2. Under **Authentication → Sign-in method**, enable the **Email/Password** provider.
3. Under **Firestore Database**, create a database (production mode).
4. In **Firestore → Rules**, paste the rule below so each user can only access their own data, then publish:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

5. In **Project settings → General**, add a Web app and copy the generated `firebaseConfig` object.

### 2. Configure the app

Open `firebase-config.js` and replace the placeholder values with your own `firebaseConfig`:

```js
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run it

No build step required — serve the folder and open it in a browser. A local static server is recommended (Firebase Auth needs an `http://`/`https://` origin, not `file://`):

```bash
npx serve .
```

Then open the printed URL, sign up for an account, and start adding events.

## Project Structure

```
Kalender/
├── index.html          # Page skeleton (auth screen, calendar grid, event modal)
├── style.css            # Styling and responsive design
├── script.js            # Calendar logic, event CRUD, auth, i18n
├── firebase-config.js   # Firebase project configuration (fill in your own values)
├── tasks/
│   └── todo.md          # Task checklist and acceptance criteria from development
└── README.md
```

## Data Storage

Once logged in, a user's events are stored in Firestore under `users/{uid}`:

```json
{
  "displayName": "Jane Doe",
  "events": {
    "2026-07-15": [
      { "id": "…", "title": "Meeting", "time": "14:30", "description": "Weekly team sync" }
    ]
  }
}
```

Firestore security rules restrict each document to its owning user (`request.auth.uid == userId`), so users can only read or write their own events.

The selected UI language is a local preference (not account-specific) and stays in the browser's `localStorage` under the `calendarLang` key.

## License

This project is shared for personal/educational purposes.
