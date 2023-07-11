import { SmartAccount } from "@particle-network/biconomy"

import {
  BiconomyWrapProvider,
  SendTransactionMode,
  SendTransactionEvent
} from "@particle-network/biconomy"
import Web3 from "web3"

const smartAccount = new SmartAccount(provider, {
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
  networkConfig: [
    { dappAPIKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY, chainId: 5 }
  ]
})

// AA address
const AAaddress = await smartAccount.getAddress()
// EOA address
const EOAaddress = await smartAccount.getOwner()
// load account more info.
const accountInfo = await smartAccount.getAccount()

console.log(
  "AAaddress, EOAaddress, accountInfo",
  AAaddress,
  EOAaddress,
  accountInfo
)

// send gasless transaction
const tx = {
  to,
  value,
  data
}
const txHash = await smartAccount.sendGaslessTransaction(tx)
console.log("txHash", txHash)

// check the constract is deployed
// const isDeploy = await smartAccount.isDeployed();
// if (!isDeploy) {
//     const txHash = await smartAccount.deployWalletContract();
// }

// =================== using web3 =============================

// use select pay gas token or gasless
const wrapProvider = new BiconomyWrapProvider(
  smartAccount,
  SendTransactionMode.UserSelect
)
const web3 = new Web3(wrapProvider)
wrapProvider.once(SendTransactionEvent.Request, (feeQuotes) => {
  // let the user select the pay gas token
  wrapProvider.resolveSendTransaction(feeQuotes[0])

  // or send gasless
  wrapProvider.resolveSendTransaction()

  // or reject send transaction
  wrapProvider.rejectSendTransaction({ message: "user rejected" })
})

let txnResp = await web3.eth.sendTransaction(tx)
console.log("txnResp", txnResp)
