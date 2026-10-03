# VisaDZD

VisaDZD is a map-first visa intelligence and service-request platform for travelers applying from Algeria. This repository contains a responsive React SPA and a separately deployable Express API, prepared for future authentication, payments, document handling, tracking and administration without implementing those features yet.

## Requirements

- Node.js 20+
- npm 10+
- MongoDB for persisting application requests

## Local setup

1. Copy `.env.example` to `.env` and configure `MONGODB_URI`, allowed browser origin, and Gmail SMTP settings. Use a Gmail app password for `SMTP_PASSWORD`. Keep `.env` out of source control.
2. Install dependencies from the repository root with `npm install`.
3. Start the client and API together with `npm run dev`.
4. Open the Vite URL shown in the terminal (normally `http://localhost:5173`). The API health route is `http://localhost:4000/api/health`.

The map uses the public Carto dark basemap and requires network access. The frontend degrades gracefully to bundled country data if the API is unavailable; submitting an application requires the API, MongoDB, and SMTP configuration.

## Production

- Set production secrets and `CLIENT_ORIGIN` on the server host; do not commit them or pass SMTP credentials to the frontend.
- Run `npm run typecheck` and `npm run build` from the root.
- Run the API with `npm start` (compiled output in `server/dist`). Deploy `client/dist` to a static host and configure the API URL as `VITE_API_URL` at build time.
- Serve over HTTPS, use a managed MongoDB deployment with backups, and configure the SMTP sender/domain before accepting live requests.

## Architecture

- `client/`: accessible, responsive map UI; shared API client; translations; typed country and form features.
- `server/`: versionable Express API, validated request boundary, MongoDB model, notifications, security middleware and centralized errors.
- Application requests are stored before emails are sent. Email delivery failures are logged without discarding the persisted request.

Visa guidance is informational and can change. Applicants should verify current requirements with the destination's official authorities before travel.

## Visa content operations

The bundled country catalogue is a small starter set used to exercise the map and API contracts; it is not a complete or authoritative worldwide visa database. Before public launch, replace/expand it with destination-specific records reviewed against official consular sources, track source URLs and review dates, and establish a regular content review workflow. Unknown fee amounts are represented as unknown rather than zero. Avoid presenting unreviewed or age-/passport-dependent rules as universal requirements.
