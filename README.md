# VisaDZD

VisaDZD is a map-first visa intelligence and service-request platform for travelers applying from Algeria. This repository contains a responsive React SPA and a separately deployable Express API, prepared for future authentication, payments, document handling, tracking and administration without implementing those features yet.

## Requirements

- Node.js 20.19+
- npm 10+
- MongoDB for persisting application requests

## Local setup

1. Configure `server/.env` with `MONGODB_URI`, `CLIENT_ORIGIN`, and the Gmail SMTP settings. The API loads this file directly, independent of the command's working directory. Use a Gmail app password for `SMTP_PASSWORD`. Keep it out of source control.
2. Install dependencies from the repository root with `npm install`.
3. Start the client and API together with `npm run dev`.
4. Open the Vite URL shown in the terminal (normally `http://localhost:5173`). The API health route is `http://localhost:4000/api/health`.

The map uses the public Carto dark basemap and requires network access. The frontend degrades gracefully to bundled country data if the API is unavailable; submitting an application requires the API, MongoDB, and SMTP configuration. The API starts and serves country data even when MongoDB is not running; its health route reports `503 degraded` and application submissions return `503` until persistence is available. It retries the MongoDB connection in the background. For frontend-only development, use the client workspace's `npm run dev` command. The client environment example is in `client/.env.example`; it contains only the public API URL. `.env.example` at the repository root is a reference template, not a server runtime configuration file.

## Production

- Set production secrets and `CLIENT_ORIGIN` on the server host; do not commit them or pass SMTP credentials to the frontend.
- Run `npm run typecheck` and `npm run build` from the root.
- Run the API with `npm start` (compiled output in `server/dist`). Deploy `client/dist` to a static host and configure the API URL as `VITE_API_URL` at build time.
- Serve over HTTPS, use a managed MongoDB deployment with backups, and configure the SMTP sender/domain before accepting live requests.

## Architecture

- `client/`: accessible, responsive map UI. `src/app/` owns providers and the single-route router; `src/pages/` composes reusable UI from `src/components/`; data, hooks, services, schemas, types, i18n locales, constants, and global styles are separated by responsibility.
- `server/`: versionable Express API, validated request boundary, MongoDB model, notifications, security middleware and centralized errors.
- Application requests are stored before emails are sent. Email delivery failures are logged without discarding the persisted request.

Visa guidance is informational and can change. Applicants should verify current requirements with the destination's official authorities before travel.

## Visa content operations

The client country catalogue now covers every PNG flag asset in the repository (254 countries and territories), with geographic metadata for map placement. Visa requirements are authoritative only for individually curated entries; the other destinations are explicitly labelled unverified and should not be presented as confirmed visa guidance. Before public launch, review visa data against official consular sources, track source URLs and review dates, and establish a regular content review workflow. Unknown fees and stay durations remain unknown rather than being shown as zero.

The client builds its 254-entry country/territory catalogue from the PNG filenames in `client/src/assets/flags` and the `world-countries` metadata package. The package data is licensed under ODbL-1.0; preserve its attribution/share-alike requirements when redistributing adapted country metadata. Visa-entry statuses remain explicitly unverified except for the individually curated starter destinations.
