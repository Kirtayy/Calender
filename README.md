# Kalender

A simple, clean, multi-language calendar app. Browse the monthly view and click any day to add, edit, or delete events. Built with plain HTML/CSS/JavaScript — no framework, no build tool.

## Features

- 📅 Monthly calendar view (previous/next month and "today" navigation)
- ➕ **Add**, **edit**, and **delete** events from a modal opened by clicking a day
- 💾 Events are stored as JSON in the browser's `localStorage` (no server/database required)
- 🔵 Visual marker (dot) on days that have events
- 🌐 **Turkish / English / German** language support — the selected language is remembered
- 📱 Responsive UI — works on desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3 (Grid-based layout, responsive design via media queries)
- Vanilla JavaScript (no framework, no build tool)

## Getting Started

No installation or build step required:

1. Clone or download this repository.
2. Open `index.html` in a browser.

Optionally, you can serve it with a local static server, e.g.:

```bash
npx serve .
```

## Project Structure

```
Kalender/
├── index.html      # Page skeleton (calendar grid + event modal)
├── style.css        # Styling and responsive design
├── script.js        # Calendar logic, event CRUD, localStorage, i18n
├── tasks/
│   └── todo.md      # Task checklist and acceptance criteria from development
└── README.md
```

## Data Storage

Events are stored in the browser's `localStorage` under the `calendarEvents` key, in a JSON structure like this:

```json
{
  "2026-07-15": [
    { "id": "…", "title": "Meeting", "time": "14:30", "description": "Weekly team sync" }
  ]
}
```

The selected language preference is stored under the `calendarLang` key.

> Note: Data is browser-specific; events won't appear in a different browser or an incognito/private window.

## License

This project is shared for personal/educational purposes.
