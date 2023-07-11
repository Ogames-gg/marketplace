"use client"
import styles from "./page.module.css"
import Hero from "@/component/Hero/Hero"
import MyCollection from "@/component/MyCollection/MyCollection"
import ForSale from "@/component/ForSale/ForSale"

export default function Home() {
  return (
    <div className={styles.main}>
      <Hero />
      <div className={styles.dashboard}>
        <MyCollection />
        <ForSale />
      </div>
    </div>
  )
}
