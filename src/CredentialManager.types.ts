export type GetCredentialOptions = {
  publicKeyRequestJson?: string;
  password?: boolean;
  googleId?: GoogleIdOptions;
};

export type GoogleIdOptions = {
  serverClientId?: string;
  nonce?: string;
  filterByAuthorizedAccounts?: boolean;
  autoSelectEnabled?: boolean;
  linkedServiceId?: string;
  idTokenDepositionScopes?: string[];
  requestVerifiedPhoneNumber?: boolean;
};

export type SignInWithGoogleOptions = {
  serverClientId?: string;
  nonce?: string;
  hostedDomainFilter?: string;
};

export type PasskeyCredential = {
  type: 'publicKey';
  responseJson: string;
};

export type PasswordCredential = {
  type: 'password';
  id: string;
  password: string;
};

export type GoogleCredential = {
  type: 'google';
  idToken: string;
  id: string;
  email?: string;
  displayName?: string;
  givenName?: string;
  familyName?: string;
  profilePictureUri?: string;
  phoneNumber?: string;
};

export type GetCredentialResult = PasskeyCredential | PasswordCredential | GoogleCredential;

export type CreatePasskeyResult = {
  type: 'publicKey';
  responseJson: string;
};
