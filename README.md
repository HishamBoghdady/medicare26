# MediCare System

Smart medical management web app to manage patients, sessions, and financial reporting.

## Features

- **Patient Management**: create/update patient records and track patient history.
- **Session Tracking**: manage treatment sessions and follow up progress.
- **Financial Reports**: track payments and generate reports.
- **Authentication**: Firebase Auth with protected routes.
- **Role & Permission System**: `admin`, `manager`, `client` roles + permission checks.

## Tech Stack

### Languages

- **JavaScript (ESM)** + **JSX**
- **HTML**
- **CSS**

### Frontend

- **React** (UI)
- **React Router** (routing)

### UI / Styling

- **MUI (Material UI)** (`@mui/material`, `@mui/icons-material`)
- **MUI X Data Grid** (`@mui/x-data-grid`)
- **Emotion** (`@emotion/react`, `@emotion/styled`)
- **Google Fonts**: Tajawal, Cairo, Amiri (loaded in `index.html`)

### Backend / Services

- **Firebase** (Auth + Firestore)

### Tooling

- **Vite** (dev server + build)
- **ESLint** (linting)

### Deployment

- **Vercel** (SPA rewrite via `vercel.json`)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (or your preferred Node package manager)

### Install

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your Firebase values (do **not** commit secrets):

```bash
# macOS / Linux / Git Bash
cp .env.example .env

# PowerShell
Copy-Item .env.example .env
```

Required keys:

```bash
VITE_FIREBASE_APIKEY=
VITE_FIREBASE_AUTHDOMAIN=
VITE_FIREBASE_DATABASEURL=
VITE_FIREBASE_PROJECTID=
VITE_FIREBASE_STORAGEBUCKET=
VITE_FIREBASE_MESSAGINGSEMDERID=
VITE_FIREBASE_APPID=
VITE_FIREBASE_MEASUREMENTID=
```

These are used in `src/firebase/firebase.config.js`.

### Run (Development)

```bash
npm run dev
```

- Vite dev server runs on port `4000` (see `vite.config.js`)
- `--host` is enabled in `package.json` for LAN access if needed

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Routes (High-Level)

- `/` — intro / landing page
- `/login` — login page
- `/dashboard` — main authenticated area (layout)
  - `/dashboard/newpatient` — patient dashboard/data
  - `/dashboard/session` — sessions
  - `/dashboard/money` — financials
  - `/dashboard/searsh` — reports/search
  - `/dashboard/create` — create user
  - `/dashboard/UsersManager` — users management
  - `/dashboard/MyAccount` — user account
- `/unauthorized` — unauthorized access page
  - (legacy) `/Unauthorized` redirects to `/unauthorized`

## Authorization Model

Role-based checks are implemented via:

- `src/guards/protectroute.jsx` (`ProtectedRoute`)
- `src/guards/permissions.js` (`ROLE_PERMISSIONS`, `hasPermission`)

Default role is `client` if no profile role is found.

## Project Structure

```text
.
├─ public/               # static assets
├─ src/
│  ├─ components/        # UI components (layout/shared/ui)
│  ├─ context/           # app providers (auth/theme/patient)
│  ├─ firebase/          # firebase initialization
│  ├─ guards/            # protected routes + permissions
│  ├─ pages/             # app pages (routes)
│  ├─ services/          # business logic (auth, data, ...)
│  └─ utils/             # helpers
├─ vite.config.js
└─ vercel.json
```

## Notes

- If you deploy to Vercel, the `vercel.json` rewrite keeps client-side routing working on refresh.
- Keep `.env` out of version control and rotate keys if they were ever committed.
