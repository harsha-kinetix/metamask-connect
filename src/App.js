import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MetaMaskOnboarding from "metamask-onboarding";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
function App() {
  const [{ metaMaskPresent, metaMaskConnected }, setMetaMaskObject] = useState({
    metaMaskPresent: false,
    metaMaskConnected: false
  });
  const [publicKey, setPublicKey] = useState("metamask not connected");
  const web3 = new Web3(Web3.givenProvider || "http://localhost/8545");

  const connectMetaMask = async () => {
    let accounts;
    try {
      await web3?.givenProvider?.request({ method: "eth_requestAccounts" });
      setMetaMaskObject({ metaMaskConnected: true, metaMaskPresent });
      accounts = await web3.eth.getAccounts();
      setPublicKey(() => accounts[0]);
    } catch (error) {
      console.error("metmask error", error);
    }
  };

  useEffect(() => {
    const isMetaMaskPresent = () => {
      return web3?.givenProvider?.isMetaMask ? true : false;
    };
    setMetaMaskObject(() =>
      isMetaMaskPresent()
        ? { metaMaskPresent: true, metaMaskConnected }
        : { metaMaskPresent: false, metaMaskConnected }
    );
  }, [web3?.givenProvider?.isMetaMask, metaMaskConnected]);

  return (
    <div className="App">
      <h1>hello world from Kinetix</h1>
      {!metaMaskPresent && (
        <Button
          onClick={() => {
            const onboarding = new MetaMaskOnboarding();
            onboarding.startOnboarding();
          }}
          startIcon={<DeleteIcon />}
          variant="contained"
        >
          install metamask
        </Button>
      )}
      {metaMaskPresent && !metaMaskConnected && (
        <Button
          onClick={() => {
            connectMetaMask();
          }}
          variant="contained"
        >
          connect MetaMask
        </Button>
      )}
      <br />
      <Alert severity="info">connected account's address: {publicKey} </Alert>
    </div>
  );
}

export default App;
