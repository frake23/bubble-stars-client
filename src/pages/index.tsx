import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Bubble Stars</title>
      </Head>
      <Header/>
    </div>
  )
}

export default Home
