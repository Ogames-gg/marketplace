import React from 'react'
import nftImage from '@/assets/footer.png'
import { useAccount, useContractRead, useContractEvent } from 'wagmi'
import styles from './page.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const SaleCard = () => {

  const [nfts, setNfts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { address } = useAccount();
  const chain = "0xaa36a7";

  useEffect(() => {
    let response;
    async function getData() {
      response = axios.get("http://localhost:5001/getcontractnft", {
          params: { address, chain },
        })
        .then((response) => {
          setNfts(response.data.result);
        });
    }
    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
        <Image src={nftImage} alt='image' width={180} height={180} className={styles.img}/>
    </div>
  )
}

export default SaleCard