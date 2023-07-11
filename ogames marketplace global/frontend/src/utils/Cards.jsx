
// import { Card, Illustration, Select } from "@web3uikit/core";
import { Illustration, Select } from "@web3uikit/core";
import styles from "../styles/Home.module.css";
import { useEffect, useState }  from "react";
import Card from "../component/Card/Card";


import React from 'react'
import styled from "styled-components";

const Cards = (props) => {

  const [nft, setNft] = useState(JSON.parse(props.uri.metadata));
  const nftI = nft?.image.includes("ipfs");
  const [nftImage, setNftImage] = useState(() => {
    if (nft?.image) {
      return nftI ? `https://ipfs.io/ipfs/${nft.image.split("ipfs://")[1]}` : nft.image.split("\\")[0];
    }
  });


  return (
      <section className={styles.cardContainer}>
      <Card
        setIsSelected={function noRefCheck() {}}
        onClick={function noRefCheck() {}}
        style={{
          background: 'none',
          margin: 'none'
        }}
        
        // title={nft.name}
      >

        <section>
          {nftImage ? <img src={nftImage} className={styles.img}/> : <Illustration logo="lazyNft" />}
        </section>
      </Card>
      </section>

            
  )
}

export default Cards;