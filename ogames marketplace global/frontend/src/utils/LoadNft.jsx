import styles from "@/styles/Home.module.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import Cards from "./Cards"

const LoadNft = () => {

  const [nfts, setNfts] = useState([]);
  const [nftPrice, setNftPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const { address } = useAccount();
  const chain = "0xaa36a7";

  // UseEffect to call Moralis backend to load NFT
  useEffect(() => {
    let response;
    async function getData() {
      response = axios.get("http://localhost:5001/getnfts", {
        params: { address, chain },
      })
        .then((response) => {
          setNfts(response.data.result);
        });
    }
    getData();
  }, []);

  const handleChange = (e) => {
    setNftPrice(Number(e.target.value));
  };

  const handleItemClick = (itemId) => {
    const selected = nfts.find(nft => nft.token_id === itemId);
    setSelectedItem(selected);

    // console.log(selectedItem.token_id)
  };

  console.log(selectedItem)

  async function buyNft() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId();
    const marketPlaceContract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress);
    const nftContract = new web3.eth.Contract(NFTAbi, NFTAddress);
    const token_address = selectedItem.token_address
    const token_id = selectedItem.token_id
    const accounts = await web3.eth.getAccounts();
    nftContract.methods.approve(MarketplaceAddress, token_id).send({ from: address }).then(async function () {
      await marketPlaceContract.methods.makeItem(
        token_address,
        Number(token_id),
        nftPrice
      ).send({ from: address });
      getData();
    });
  }

  return (

    <section className={styles.dataContainer} >
      {nfts.map((nft) => {
        return <div key={nft.token_id} onClick={() => handleItemClick(nft.token_id)}><Cards uri={nft} key={nft.token_id} /> </div>
      })}
    </section>
  )
}


export default LoadNft;
