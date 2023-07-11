"use client"
import LoadNft from "@/utils/LoadNft"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import styles from "./page.module.css"

const MyCollection = () => {

  // handling wallet connection
  const { isConnected } = useAccount()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) return null;

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.Text}>My collection</h4>

      {isConnected ? (
        <LoadNft />
      ) : null}

      {isConnected ? (
        <div className={styles.inputWrapper}>
          <input className={styles.amount} type="text" placeholder="Amount" />
          <button className={styles.list}>List</button>
          <button className={styles.cancel}>Cancel</button>
        </div>
      ) : null}
    </div>
  )
}

export default MyCollection