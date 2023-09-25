"use client";

import { useState } from "react";

export default function Home() {
  const [walletAdress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  
  //Request access to the user's Metamask Wallet
  async function requestAccount() {
    setLoading(true);
    console.log("Requesting account...");

    //Check if Meta Mask Extension exists
    if (typeof window.ethereum !== "undefined") {
      console.log("Metamask is detected on this browser");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts);
        setWalletAddress(accounts);
      } catch (error) {
        console.log("Error, Please connect to MetaMask...");
      }
    } else {
      console.log("Meta Mask not detected");
      window.alert(
        "Make sure you install the Metamask extension on your browser"
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h3 className="font-bold text-xl">
        This page connects your blockchain wallet to Metamask
      </h3>
      <h6 className="italic text-gray-400 text-sm">
        Ps: Make sure you install the Metamask extension on your browser
      </h6>
      <button onClick={requestAccount}> {loading ? "Connecting..." : "Connect Wallet"} </button>
      <h3 className="font-bold text-xl">Your Wallet address: {walletAdress}</h3>
    </main>
  );
}
