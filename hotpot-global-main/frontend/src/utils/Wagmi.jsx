"use client"
import "@particle-network/connect-react-ui/dist/index.css"
import {
  connectorsForWallets,
  RainbowKitProvider
} from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet
} from "@rainbow-me/rainbowkit/wallets"
import React from "react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { goerli, sepolia } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, publicClient } = configureChains(
  [sepolia, goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider()
  ]
)

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

const connectors = connectorsForWallets([
  {
    groupName: "hotpot",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains })
    ]
  }
])

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const Wagmi = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} showRecentTransactions={true}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Wagmi
