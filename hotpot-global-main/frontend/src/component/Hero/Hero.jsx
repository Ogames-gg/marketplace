import Heropot from "@/assets/heropot.svg"
import Image from "next/image"
import styles from "./page.module.css"

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <Image className={styles.hero} src={Heropot} alt='hero' width={1360} height={416} />
    </div>
  )
}

export default Hero