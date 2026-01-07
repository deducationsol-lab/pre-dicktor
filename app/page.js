'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useState } from 'react';

require('@solana/wallet-adapter-react-ui/styles.css');

export default function Home() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  const [markets] = useState([
    {
      question: "Will Bitcoin hit $150K in 2026?",
      yesPrice: 0.62,
      noPrice: 0.38,
      volume: 124000,
      liquidity: 45000
    },
    {
      question: "Will Solana flip Ethereum market cap in 2026?",
      yesPrice: 0.28,
      noPrice: 0.72,
      volume: 89000,
      liquidity: 32000
    },
    {
      question: "Will $DEDU hit $0.001 in 2026?",
      yesPrice: 0.45,
      noPrice: 0.55,
      volume: 156000,
      liquidity: 68000
    }
  ]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={{
            background: '#000',
            color: '#0f0',
            minHeight: '100vh',
            fontFamily: 'Orbitron, sans-serif',
            padding: '20px'
          }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{
                fontSize: '5rem',
                background: 'linear-gradient(90deg, #39ff14, #ff00ff, #00ffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                PRE-DICKTOR
              </h1>
              <p style={{ fontSize: '2rem', color: '#ff00ff' }}>
                The Ultimate Solana Prediction Market 🍆🚀
              </p>
              <WalletMultiButton style={{
                background: '#ff00ff',
                color: 'black',
                fontWeight: 'bold',
                padding: '15px 30px',
                borderRadius: '50px'
              }} />
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', color: '#39ff14', margin: '60px 0 40px' }}>
                🔥 HOT MARKETS
              </h2>

              {markets.map((market, i) => (
                <div key={i} style={{
                  background: 'rgba(20, 0, 40, 0.7)',
                  border: '3px solid #ff00ff',
                  borderRadius: '20px',
                  padding: '30px',
                  margin: '30px 0',
                  boxShadow: '0 0 30px #ff00ff'
                }}>
                  <h3 style={{ color: '#00ffff', textAlign: 'center', fontSize: '2rem' }}>
                    {market.question}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0' }}>
                    <div style={{ textAlign: 'center' }}>
                      <h2 style={{ color: '#39ff14' }}>YES</h2>
                      <h1 style={{ fontSize: '4rem', color: '#39ff14' }}>${market.yesPrice.toFixed(2)}</h1>
                      <button style={{
                        background: '#39ff14',
                        color: 'black',
                        padding: '15px 40px',
                        borderRadius: '50px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}>
                        BUY YES
                      </button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <h2 style={{ color: '#ff0066' }}>NO</h2>
                      <h1 style={{ fontSize: '4rem', color: '#ff0066' }}>${market.noPrice.toFixed(2)}</h1>
                      <button style={{
                        background: '#ff0066',
                        color: 'white',
                        padding: '15px 40px',
                        borderRadius: '50px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}>
                        BUY NO
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', color: '#b0ffb0' }}>
                    Volume: ${market.volume.toLocaleString()} | Liquidity: ${market.liquidity.toLocaleString()}
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'center', margin: '80px 0' }}>
                <h2 style={{ color: '#39ff14' }}>GET $DEDU TO BET</h2>
                <div style={{ margin: '30px auto', maxWidth: '600px' }}>
                  <div id="jupiter-terminal"></div>
                  <script src="https://terminal.jup.ag/main-v2.js" data-preload="true"></script>
                  <script dangerouslySetInnerHTML={{__html: `
                    JupTerminal.init({
                      containerId: "jupiter-terminal",
                      defaultExplorer: "Solscan",
                      formProps: {
                        initialInputMint: "So11111111111111111111111111111111111111112",
                        initialOutputMint: "AqDGzh4jRZipMrkBuekDXDB1Py2huA8G5xCvrSgmpump"
                      }
                    });
                  `}} />
                </div>
              </div>
            </div>

            <footer style={{ textAlign: 'center', marginTop: '100px', color: '#ff00ff' }}>
              <h2>PRE-DICKTOR</h2>
              <p>Powered by $DEDU | Built for Degens | WAGMI 🍆</p>
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
