# Expo Credential Manager (Android)

Expo module exposing Android Credential Manager (passkeys + passwords) to JavaScript.

## Requirements
- Android 4.4 (API 19) and higher for password and federated sign-in.
- Android 9 (API 28) and higher for passkeys.
- On Android 13 and lower, Credential Manager relies on Google Play services.
- Passkeys require Digital Asset Links between your Android app and your relying party domain.
- Your backend must provide WebAuthn registration/authentication JSON payloads.
- iOS is a stub (methods throw `E_UNSUPPORTED_PLATFORM`).

## Install
```
# package name for this repo is expo-credential-manager
```

## Expo Config Plugin (Optional)
Add a config plugin to provide default values on Android. These are used when
`serverClientId` (and `hostedDomainFilter` for Sign in with Google) are omitted in JS.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-credential-manager",
        {
          "serverClientId": "YOUR_SERVER_CLIENT_ID",
          "hostedDomainFilter": "example.com"
        }
      ]
    ]
  }
}
```

## Usage
```ts
import {
  createPasskey,
  createPassword,
  signInWithGoogle,
  clearCredentialState,
  getCredential,
  isAvailable,
} from 'expo-credential-manager';

const available = await isAvailable();

// Passkey registration (Expo API routes)
const registrationJson = await fetch('/api/webauthn/registration').then((r) => r.text());
const createResult = await createPasskey(registrationJson);
await fetch('/api/webauthn/registration/finish', {
  method: 'POST',
  body: createResult.responseJson,
});

// Passkey or password sign-in (Expo API routes)
const authJson = await fetch('/api/webauthn/authentication').then((r) => r.text());
const credential = await getCredential({
  publicKeyRequestJson: authJson,
  password: true,
  googleId: {
    serverClientId: 'YOUR_SERVER_CLIENT_ID',
    filterByAuthorizedAccounts: true,
    linkedServiceId: 'YOUR_LINKED_SERVICE_ID',
    idTokenDepositionScopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  },
});

if (credential.type === 'publicKey') {
  await fetch('/api/webauthn/authentication/finish', {
    method: 'POST',
    body: credential.responseJson,
  });
} else {
  // credential.id + credential.password
}

// Store a password credential
await createPassword('user@example.com', 's3cret');

// Sign in with Google (explicit consent flow)
const googleCredential = await signInWithGoogle({
  serverClientId: 'YOUR_SERVER_CLIENT_ID',
  hostedDomainFilter: 'example.com',
});

// Send ID token to backend for verification
await fetch('/api/google/verify', {
  method: 'POST',
  body: googleCredential.idToken,
});

// Sign out (clears cached state)
await clearCredentialState();
```

## Notes
- Do not set `origin` in request JSON for native apps. Use Digital Asset Links instead.
- Passkey UX: keep passkeys as the primary sign-in option and passwords as a fallback.
- `signInWithGoogle` must be used alone (do not combine with passkey/password requests).
- Google credentials return `id` (email) and `idToken` for backend verification.
- Use your server (web) OAuth client ID for `serverClientId` (not the Android client ID).
- `requestVerifiedPhoneNumber` requires `filterByAuthorizedAccounts=false`.
- `hostedDomainFilter` (Sign in with Google) limits results to a Google Workspace domain.
- When using the config plugin, you can omit `serverClientId` and `hostedDomainFilter` in JS.
- `requestVerifiedPhoneNumber` returns `phoneNumber` when available.
- `linkedServiceId` + `idTokenDepositionScopes` let you associate linked accounts during Google sign-in.

## Example App
See `example/` for a minimal Expo app using Google Sign-In and mixed credential retrieval.
