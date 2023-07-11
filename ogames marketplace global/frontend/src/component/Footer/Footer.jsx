import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Footerpot from '@/assets/footer.png'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
        <Image className={styles.img} src={Footerpot} alt='footer' width={100} height={100}/>
        <div className={styles.Text}><h4>(c) 2023 / <a href='https://twitter.com/hotpot_gg' target='_blank' className={styles.link}>Twitter</a></h4></div>
    </div>
  )
}

export default Footer