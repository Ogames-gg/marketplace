"use client"
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { MarketplaceAbi, MarketplaceAddress } from "../constant";
import Cards from './Cards';

const LoadNft = () => {
  // state to get & load NFT
  const [nfts, setNfts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCombine, setIsCombine] = useState([])

  const { address } = useAccount();
  const chain = "0xaa36a7";

  // UseEffect to call Moralis backend to load NFT
  useEffect(() => {
    let response;
    async function getData() {
      response = axios.get("http://localhost:5001/getnfts", {
        params: {
          address: "0x5829ab0cA7af63c40e38bB2f5ad5935184506039",
          chain
        },
      })
        .then((response) => {
          setNfts(response.data.result);
        });
    }
    getData();
  }, [1000]);


  const handleItemClick = (itemId) => {
    const selected = nfts.find(nft => nft.token_id === itemId);
    setSelectedItem(selected);
  };

  // console.log(nfts.find(nft => nft.token_id))

  async function FetchNft() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId();
    const marketPlaceContract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress);

    // await nftContract.methods.approve('0xF978382a678d65a6B9a39032abF777C1e1daACBD', token_id).send({ from: address});
    const fetchPrices = await marketPlaceContract.methods.getAllListedNfts().call();

    // await marketPlaceContract.methods.makeItem(token_address, token_id, nftPrice).send({ from: address});
    // getData();
    const combined = fetchPrices.map((fetchPrice) => {
      // console.log(fetchPrice.toString())
      const selected = nfts.find(nft => nft.token_id);
      return {
        uri: selected.token_uri,
        contract: selected.token_address,
        itemId: fetchPrice.itemId.toString(),
        price: fetchPrice.price.toString()
      };
    })
    setIsCombine(combined)
  }

  useEffect(() => {
    FetchNft();
    const intervalId = setInterval(() => {
      // Call your function here
      FetchNft();
      console.log(isCombine);
    }, 1 * 5 * 1000);

    return () => clearInterval(intervalId)
  }, [])

  const doSomething = isCombine.find(combine => combine.price)

  async function buyNft() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId();
    const marketPlaceContract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress);
    // const nftContract = new web3.eth.Contract(NFTAbi, NFTAddress);
    const itemId = doSomething?.itemId
    const price = doSomething?.price
    const accounts = await web3.eth.getAccounts();
    // await nftContract.methods.approve('0x5829ab0cA7af63c40e38bB2f5ad5935184506039', token_id).send({ from: address});
    await marketPlaceContract.methods.purchaseItem(itemId).send({ from: address, value: price });
    getData();
    FetchNft();
  }

  return (
    <section className={styles.dataContainers} >

      {nfts.map((nft, index) => {
        return <div key={index} onClick={() => handleItemClick(nft.token_id)}><Cards index uri={nft} key={nft.token_id} price={doSomething?.price} /> </div>
      })}
      {console.log(selectedItem, "test", doSomething?.price)}

      <section>
        <div className={styles.inputWrappers}>

          <button
            onClick={buyNft}
            className={styles.buy}
          >Buy</button>

        </div>
      </section>
    </section>
  )
}

export default LoadNft