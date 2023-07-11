import { Card, Illustration } from "@web3uikit/core";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Cards = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [price, setPrice] = useState(props.price)
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
        setIsSelected={function noRefCheck() { }}
        style={{
          background: "none",
          margin: "none"
        }}
      // title={nft.name}
      >
        <section>
          {nftImage ?
            <div>
              <Image src={nftImage} alt="nftImage" width={170} height={170} />
              <p className={styles.price}>{props.price} ETH</p>
            </div>
            : <Illustration logo="lazyNft" />}
        </section>
      </Card>
    </section>
  )
}

export default Cards;