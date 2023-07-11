"use client"
import "./globals.css"
import { Inter, Montserrat } from "next/font/google"
import Header from "@/component/Header/Header"
import Footer from "@/component/Footer/Footer"
import Wagmi from "@/utils/Wagmi"

import { ModalProvider } from "@particle-network/connect-react-ui"
import { WalletEntryPosition } from "@particle-network/auth"
import { Ethereum, EthereumGoerli } from "@particle-network/common"
import { evmWallets } from "@particle-network/connect"

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ModalProvider
          options={{
            projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
            clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
            appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
            chains: [Ethereum, EthereumGoerli],
            particleWalletEntry: {
              displayWalletEntry: true,
              defaultWalletEntryPosition: WalletEntryPosition.BR,
              supportChains: [Ethereum, EthereumGoerli],
              customStyle: {}
            },
            securityAccount: {
              promptSettingWhenSign: 1,
              promptMasterPasswordSettingWhenLogin: 1
            },
            wallets: evmWallets({
              projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
              showQrModal: false
            })
          }}
          theme={"auto"}
          language={"en"} //optional：localize, default en
          walletSort={["Particle Auth", "Wallet"]}
          particleAuthSort={[
            "email",
            "phone",
            "google",
            "github",
            "discord",
            "facebook",
            "applet",
            "twitter"
          ]}
        >
          <Wagmi>
            <Header />
            {children}
            <Footer />
          </Wagmi>
        </ModalProvider>
      </body>
    </html>
  )
}
