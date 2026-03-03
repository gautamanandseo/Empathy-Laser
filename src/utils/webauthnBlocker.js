/**
 * This file is deprecated and has been neutralized.
 * WebAuthn functionality has been completely removed from the application.
 */

export const WebAuthnBlocker = {
  init: () => {},
  detectWebAuthn: () => ({ isPolyfilled: false, hasGlobalWebAuthn: false }),
  checkCSP: () => true,
  monitorCredentials: () => {},
  logAuthAttempt: () => {}
};

export default WebAuthnBlocker;