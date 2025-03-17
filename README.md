# DSG Library UI

A React-based web application for managing books in the DSG Library system. This project provides an UI for users to create, update, delete, and search for books.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Run](#run)

---

## Technologies Used
- **Frontend**: React, Vite, TypeScript, Ant Design
- **State Management**: React Hooks (useState, useEffect)
- **Networking**: Axios
- **Build & Deployment**: Vite, Vercel

---

## Getting Started

### Installation
```sh
npm install
```

Edit the `.env` file in the root directory and add:

```
VITE_API_URL=https://dsg-library-server.vercel.app
```

For local development:

```
VITE_API_URL=http://localhost:3000
```

---

## Run
### Run the Development Server
```sh
npm run dev
```
The app will be available at:
- **Local**: [http://localhost:5173](http://localhost:5173)
- **Online**: [https://dsg-library-ui.vercel.app](https://dsg-library-ui.vercel.app)`

### Build for Production
```sh
npm run build
```

### Preview the Production Build
```sh
npm run preview
```

---
