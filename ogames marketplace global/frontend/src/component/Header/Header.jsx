"use client"

import React from "react"
import styles from "./page.module.css"
import Logo from "../../assets/logo.webp"
import Image from "next/image"
import { useAccount } from "wagmi"

import { useAccount as useParticleAccount } from "@particle-network/connect-react-ui"
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth"
import { ConnectButton } from "@particle-network/connect-react-ui"
import { ParticleProvider } from "@particle-network/provider"
import clsx from "clsx"
import { ethers } from "ethers"

const Header = () => {
  const { isConnected } = useAccount()
  const account = useParticleAccount()
  const particle = new ParticleNetwork({
    projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
    clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
    appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
    chainName: "ETHEREUM",
    chainId: 1,
    wallet: {
      displayWalletEntry: true,
      defaultWalletEntryPosition: WalletEntryPosition.BR,
      uiMode: "dark",
      supportChains: [{ id: 5, name: "ETHEREUM" }],
      customStyle: {}
    },
    securityAccount: {
      //prompt set payment password. 0: None, 1: Once(default), 2: Always
      promptSettingWhenSign: 0,
      //prompt set master password. 0: None(default), 1: Once, 2: Always
      promptMasterPasswordSettingWhenLogin: 0
    }
  })

  const particleProvider = new ParticleProvider(particle.auth)

  const ethersProvider = new ethers.providers.Web3Provider(
    particleProvider,
    "any"
  )
  const ethersSigner = ethersProvider.getSigner()

  const handleParticleLogin = async () => {
    const userInfo = await particle.auth.login()
    console.log("===== user info =====", userInfo)
    console.log(" account: " + account)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <div className={styles.Logo}>
          <Image src={Logo} alt="logo" width={30} height={30} />
        </div>
        <div className={styles.Text}>
          <h4>HOTPOT</h4>
        </div>
      </div>

      <div className={styles.buttons}>
        {isConnected && <button className={styles.Btn}>My TIX: 0</button>}
        {isConnected && <button className={styles.Btn}>Total: 0</button>}
      </div>
      <div
        className={clsx(
          styles.Wallet,
          isConnected ? styles.expanded : styles.Wallet
        )}
      >
        <ConnectButton />
      </div>
    </div>
  )
}

export default Header
