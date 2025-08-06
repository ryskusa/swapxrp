import React from "react";
import QRCode from "react-qr-code";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>SwapXRP</h1>
      <p>Scan to swap:</p>
      <QRCode value="https://swapxrp.xyz" />
    </div>
  );
}

export default App;
