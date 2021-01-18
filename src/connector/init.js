import WalletConnect from "@walletconnect/client";

export const initConnection = (uri) => {
  // Create connector
  const connector = new WalletConnect(
    {
      uri,
      // Required
      clientMeta: {
        description: "WalletConnect Developer App",
        url: "https://walletconnect.org",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
        name: "WalletConnect",
      },
    }
  );

  // Subscribe to session requests
  connector.on("session_request", (error, payload) => {
    if (error) {
      throw error;
    }

    // TESTING ONLY: Delete before production
    console.log("Session Request:")
    console.log(payload)

    // Handle Session Request

    /* payload:
    {
      id: 1,
      jsonrpc: '2.0'.
      method: 'session_request',
      params: [{
        peerId: '15d8b6a3-15bd-493e-9358-111e3a4e6ee4',
        peerMeta: {
          name: "WalletConnect Example",
          description: "Try out WalletConnect v1.x.x",
          icons: ["https://example.walletconnect.org/favicon.ico"],
          url: "https://example.walletconnect.org"
        }
      }]
    }
    */
  });

  // Subscribe to call requests
  connector.on("call_request", (error, payload) => {
    if (error) {
      throw error;
    }

    // TESTING ONLY: Delete before production
    console.log("Call Request:")
    console.log(payload)

    // Handle Call Request

    /* payload:
    {
      id: 1,
      jsonrpc: '2.0'.
      method: 'eth_sign',
      params: [
        "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
        "My email is john@doe.com - 1537836206101"
      ]
    }
    */
  });

  connector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }

    // TESTING ONLY: Delete before production
    console.log("Disconnect:")
    console.log(payload)

    // Delete connector
  });

  return connector
}