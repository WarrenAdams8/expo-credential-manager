import ExpoModulesCore

public class CredentialManagerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CredentialManager")

    Function("isAvailable") {
      false
    }

    AsyncFunction("createPasskey") { (_: String) in
      throw UnsupportedPlatformError()
    }

    AsyncFunction("createPassword") { (_: String, _: String) in
      throw UnsupportedPlatformError()
    }

    AsyncFunction("getCredential") { (_: [String: Any?]) in
      throw UnsupportedPlatformError()
    }

    AsyncFunction("signInWithGoogle") { (_: [String: Any?]) in
      throw UnsupportedPlatformError()
    }

    AsyncFunction("clearCredentialState") {
      throw UnsupportedPlatformError()
    }
  }
}

final class UnsupportedPlatformError: Exception {
  override var reason: String? {
    "CredentialManager is only available on Android."
  }

  override var code: String {
    "E_UNSUPPORTED_PLATFORM"
  }
}
