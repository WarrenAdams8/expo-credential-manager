const { AndroidConfig, withStringsXml, createRunOncePlugin } = require('expo/config-plugins');

const SERVER_CLIENT_ID = 'expo_credential_manager_server_client_id';
const HOSTED_DOMAIN_FILTER = 'expo_credential_manager_hosted_domain_filter';

const withCredentialManager = (config, props = {}) => {
  const serverClientId = props.serverClientId;
  const hostedDomainFilter = props.hostedDomainFilter;

  if (!serverClientId && !hostedDomainFilter) {
    return config;
  }

  return withStringsXml(config, (modConfig) => {
    let strings = modConfig.modResults;

    if (serverClientId) {
      strings = AndroidConfig.Strings.setStringItem(
        [
          {
            $: { name: SERVER_CLIENT_ID, translatable: 'false' },
            _: serverClientId,
          },
        ],
        strings
      );
    }

    if (hostedDomainFilter) {
      strings = AndroidConfig.Strings.setStringItem(
        [
          {
            $: { name: HOSTED_DOMAIN_FILTER, translatable: 'false' },
            _: hostedDomainFilter,
          },
        ],
        strings
      );
    }

    modConfig.modResults = strings;
    return modConfig;
  });
};

module.exports = createRunOncePlugin(withCredentialManager, 'expo-credential-manager', '0.1.0');
