import { CodedError, Platform, requireOptionalNativeModule } from 'expo-modules-core';
import type {
  CreatePasskeyResult,
  GetCredentialOptions,
  GetCredentialResult,
  GoogleCredential,
  SignInWithGoogleOptions,
} from './CredentialManager.types';
import { CredentialManagerErrorCodes } from './CredentialManager.types';

const NativeModule = requireOptionalNativeModule('CredentialManager');

function ensureAvailable(): void {
  if (Platform.OS !== 'android' || !NativeModule) {
    throw new CodedError(
      CredentialManagerErrorCodes.E_UNSUPPORTED_PLATFORM,
      'CredentialManager is only available on Android.'
    );
  }
}

function hasAtLeastOneOption(options: GetCredentialOptions): boolean {
  return !!(options.publicKeyRequestJson || options.password || options.googleId);
}

export async function isAvailable(): Promise<boolean> {
  if (Platform.OS !== 'android' || !NativeModule) {
    return false;
  }
  return await NativeModule.isAvailable();
}

export async function createPasskey(requestJson: string): Promise<CreatePasskeyResult> {
  ensureAvailable();
  return await NativeModule.createPasskey(requestJson);
}

export async function createPassword(username: string, password: string): Promise<{ type: 'password' }> {
  ensureAvailable();
  if (!username || username.trim() === '') {
    throw new CodedError(
      CredentialManagerErrorCodes.E_INVALID_INPUT,
      'Username cannot be blank.'
    );
  }
  if (!password || password.trim() === '') {
    throw new CodedError(
      CredentialManagerErrorCodes.E_INVALID_INPUT,
      'Password cannot be blank.'
    );
  }
  return await NativeModule.createPassword(username, password);
}

export async function getCredential(options: GetCredentialOptions): Promise<GetCredentialResult> {
  ensureAvailable();
  if (!hasAtLeastOneOption(options)) {
    throw new CodedError(
      CredentialManagerErrorCodes.E_INVALID_OPTIONS,
      'At least one of publicKeyRequestJson, password, or googleId must be provided.'
    );
  }
  return await NativeModule.getCredential(options);
}

export async function signInWithGoogle(options: SignInWithGoogleOptions): Promise<GoogleCredential> {
  ensureAvailable();
  return await NativeModule.signInWithGoogle(options);
}

export async function clearCredentialState(): Promise<void> {
  ensureAvailable();
  await NativeModule.clearCredentialState();
}
