import { Platform, requireOptionalNativeModule } from 'expo-modules-core';
import type {
  CreatePasskeyResult,
  GetCredentialOptions,
  GetCredentialResult,
  GoogleCredential,
  SignInWithGoogleOptions,
} from './CredentialManager.types';

const NativeModule = requireOptionalNativeModule('CredentialManager');

function ensureAvailable() {
  if (Platform.OS !== 'android' || !NativeModule) {
    throw new Error('CredentialManager is only available on Android.');
  }
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
  return await NativeModule.createPassword(username, password);
}

export async function getCredential(options: GetCredentialOptions): Promise<GetCredentialResult> {
  ensureAvailable();
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
