# ChatIt

A simple real-time chat application with a Node.js/Express backend and a Vite + React frontend.

## Repository layout

- `backend/` — Node.js + Express server, Socket.IO integration, MongoDB models.
- `frontend/` — Vite + React client application.

## Prerequisites

- Node.js (v16+ recommended)
- npm (bundled with Node.js)
- MongoDB instance (local or hosted)

## Installation (root)

This repository contains two packages (backend and frontend). From the project root you can run the included convenience scripts.

Install dependencies for both packages:

```bash
npm run build
```

Note: `npm run build` in the root installs both backend and frontend dependencies and builds the frontend.

## Running the app

Start the backend server (from root):

```bash
npm start
```

This runs `npm run start --prefix backend`, which launches the backend at the address configured in `backend/src/server.js` (commonly `http://localhost:5000` or similar).

Start the frontend in development mode (from `frontend/`):

```bash
cd frontend
npm run dev
```

To preview a production build of the frontend after running the root `npm run build`:

```bash
cd frontend
npm run preview
```

## Environment variables

The backend likely uses a `.env` file (see `backend/src` for usage). Common variables to set:

- `PORT` — port for the backend server (default often 5000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `CLOUDINARY_URL` or `CLOUDINARY_*` — Cloudinary credentials if image upload is used

Create a `.env` file in `backend/` with the values above before starting the backend.

## Tests

There are no automated tests configured. The root and package.json scripts contain a placeholder `test` script.

## Contributing

Feel free to open issues or submit PRs. Small improvements I recommend next:

- Add a `CONTRIBUTING.md` with branch and PR guidelines.
- Add basic unit/integration tests for backend controllers and frontend components.
- Add GitHub Actions to run linting and tests on PRs.

## License

This project currently doesn't specify an author or a license in the root `package.json`. Add a `LICENSE` file if you want to declare one.

---

If you'd like, I can also:

- Add a `CONTRIBUTING.md` and `LICENSE` file.
- Add Dockerfiles for the backend and frontend and a docker-compose for local development.

Tell me which of these you'd like next.