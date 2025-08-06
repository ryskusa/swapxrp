
// The Swap MVP - React + Vercel-ready frontend
// Features: Asset swap form, live $3 XRP fee calculation, QR code stub

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const App = () => {
  const [sellerAddress, setSellerAddress] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [giving, setGiving] = useState('');
  const [receiving, setReceiving] = useState('');
  const [xrpPrice, setXrpPrice] = useState(null);
  const [swapLink, setSwapLink] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd')
      .then(res => res.json())
      .then(data => setXrpPrice(data.ripple.usd))
      .catch(() => setXrpPrice(0.5)); // fallback price
  }, []);

  const handleCreateSwap = () => {
    const swapData = {
      seller: sellerAddress,
      buyer: buyerAddress,
      giving,
      receiving,
      feeInXrp: (3 / (xrpPrice || 0.5)).toFixed(4),
    };
    const encoded = btoa(JSON.stringify(swapData));
    const link = `${window.location.origin}/swap/${encoded}`;
    setSwapLink(link);
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white font-mono">
      <h1 className="text-2xl mb-4 text-green-400">The Swap</h1>
      <div className="space-y-4 max-w-xl">
        <input className="w-full p-2 bg-gray-900 border border-gray-700" placeholder="Your (Seller) Wallet Address" value={sellerAddress} onChange={e => setSellerAddress(e.target.value)} />
        <input className="w-full p-2 bg-gray-900 border border-gray-700" placeholder="Buyer Wallet Address (Optional)" value={buyerAddress} onChange={e => setBuyerAddress(e.target.value)} />
        <textarea className="w-full p-2 bg-gray-900 border border-gray-700" rows="3" placeholder="What are you giving? (e.g. 5 Drippy NFTs)" value={giving} onChange={e => setGiving(e.target.value)} />
        <textarea className="w-full p-2 bg-gray-900 border border-gray-700" rows="3" placeholder="What do you want in return? (e.g. 2000 XRP)" value={receiving} onChange={e => setReceiving(e.target.value)} />

        <div className="text-sm text-gray-400">
          XRP Price: ${xrpPrice ? xrpPrice.toFixed(4) : 'Loading...'} USD<br />
          Flat Fee: $3 ≈ {(xrpPrice ? (3 / xrpPrice).toFixed(4) : '...')} XRP (paid by seller)
        </div>

        <button className="bg-green-600 px-4 py-2 rounded" onClick={handleCreateSwap}>Generate Swap Link</button>

        {swapLink && (
          <div className="mt-6 p-4 bg-gray-800 border border-green-500">
            <p className="mb-2">Share this link or QR code:</p>
            <QRCode value={swapLink} size={128} />
            <p className="mt-2 text-xs break-words">{swapLink}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
