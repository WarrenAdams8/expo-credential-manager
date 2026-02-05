/**
 * Error codes thrown by the CredentialManager module.
 */
export const CredentialManagerErrorCodes = {
  E_UNSUPPORTED_PLATFORM: 'E_UNSUPPORTED_PLATFORM',
  E_INVALID_OPTIONS: 'E_INVALID_OPTIONS',
  E_INVALID_INPUT: 'E_INVALID_INPUT',
} as const;

export type CredentialManagerErrorCode =
  (typeof CredentialManagerErrorCodes)[keyof typeof CredentialManagerErrorCodes];

/**
 * Typed error interface for CredentialManager errors.
 */
export interface CredentialManagerError extends Error {
  code: CredentialManagerErrorCode;
}

/**
 * Options for requesting a passkey credential.
 */
export type PasskeyRequestOptions = {
  publicKeyRequestJson: string;
  password?: boolean;
  googleId?: GoogleIdOptions;
};

/**
 * Options for requesting a password credential.
 */
export type PasswordRequestOptions = {
  publicKeyRequestJson?: string;
  password: true;
  googleId?: GoogleIdOptions;
};

/**
 * Options for requesting a Google ID credential.
 */
export type GoogleIdRequestOptions = {
  publicKeyRequestJson?: string;
  password?: boolean;
  googleId: GoogleIdOptions;
};

/**
 * Options for getCredential. At least one of `publicKeyRequestJson`, `password`, or `googleId` must be provided.
 */
export type GetCredentialOptions =
  | PasskeyRequestOptions
  | PasswordRequestOptions
  | GoogleIdRequestOptions;

/**
 * Configuration options for Google ID token requests.
 */
export type GoogleIdOptions = {
  serverClientId?: string;
  nonce?: string;
  filterByAuthorizedAccounts?: boolean;
  autoSelectEnabled?: boolean;
  linkedServiceId?: string;
  idTokenDepositionScopes?: string[];
  requestVerifiedPhoneNumber?: boolean;
};

/**
 * Options for signInWithGoogle.
 */
export type SignInWithGoogleOptions = {
  serverClientId?: string;
  nonce?: string;
  hostedDomainFilter?: string;
};

/**
 * Result from a passkey authentication.
 */
export type PasskeyCredential = {
  type: 'publicKey';
  responseJson: string;
};

/**
 * Result from a password authentication.
 */
export type PasswordCredential = {
  type: 'password';
  id: string;
  password: string;
};

/**
 * Result from a Google ID authentication.
 */
export type GoogleCredential = {
  type: 'google';
  idToken: string;
  /** Google subject/unique ID (stable identifier). */
  userId: string;
  email?: string;
  displayName?: string;
  givenName?: string;
  familyName?: string;
  profilePictureUri?: string;
  phoneNumber?: string;
};

/**
 * Union of all credential result types.
 */
export type GetCredentialResult = PasskeyCredential | PasswordCredential | GoogleCredential;

/**
 * Result from creating a passkey.
 */
export type CreatePasskeyResult = {
  type: 'publicKey';
  responseJson: string;
};
