# Example App

This is a minimal Expo app that exercises the module on Android.

## Quick Start
1. Install dependencies.
2. Replace `SERVER_CLIENT_ID` in `example/App.tsx`.
3. Set `EXPO_PUBLIC_API_BASE_URL` if your API routes are not on the Metro host.
4. Run `npm run android`.

## Notes
- Use your server (web) OAuth client ID.
- Passkeys require backend WebAuthn endpoints.
- The example uses Expo API routes under `/api/*` (see `app/api` in Expo Router).
- The `app/api` routes in this example return HTTP 501 until you connect real backend logic.
