"use client"

import styles from './page.module.css'
import { useAccount } from 'wagmi'
import React, { useState, useEffect } from 'react'
import LoadNft from '@/MarketPlace/LoadNft'


const ForSale = () => {
  const { isConnected } = useAccount()
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) return null;

  return (
    <div className={styles.wrapper}>
        <h4 className={styles.Text}>All NFT's for sale</h4>
        {/* {isConnected && <LoadListing />} */}
        {isConnected && <LoadNft />}
    </div>
  )
}

export default ForSale