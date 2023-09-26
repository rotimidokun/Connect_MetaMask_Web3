"use client";

import { useState } from "react";
import { JsonRpcSigner, ethers } from "ethers";

export default function Home() {
  const [walletAdress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);

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
        setIsConnected(true);
        // let connectedProvider = new ethers.providers.Web3Provider(
        //   window.ethereum
        // );
        let connectedProvider = new ethers.BrowserProvider(window.ethereum)
        const signer = await connectedProvider.getSigner()
        setSigner(signer); //the connected account
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Meta Mask not detected");
      window.alert(
        "Make sure you install the Metamask extension on your browser"
      );
      setIsConnected(false);
    }

    setLoading(false);
  }

  async function executeTransaction() {
    if (typeof window.ethereum !== "undefined") {
      //address #
      //abi #
      //function
      //node connection - metamask # - our local rpc conection

      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_favoriteNumber",
              type: "uint256",
            },
          ],
          name: "addPerson",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "nameToFavoriteNumber",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "people",
          outputs: [
            {
              internalType: "uint256",
              name: "favoriteNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "retrieve",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_favoriteNumber",
              type: "uint256",
            },
          ],
          name: "store",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        await contract.store(42);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h3 className="font-bold text-xl">
        This page connects your blockchain wallet to Metamask
      </h3>
      <h6 className="italic text-gray-400 text-sm">
        Ps: Make sure you install the Metamask extension on your browser
      </h6>

      <button onClick={requestAccount}>
        {loading ? "Connecting..." : isConnected ? "Connected" : "Connect"}
      </button>

      {isConnected ? (
        <button onClick={executeTransaction}> Execute </button>
      ) : (
        ""
      )}

      <h3 className="font-bold text-xl">Your Wallet address: {walletAdress}</h3>
    </main>
  );
}
