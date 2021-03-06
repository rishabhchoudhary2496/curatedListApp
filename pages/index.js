import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { signin, signOut, useSession, getSession } from 'next-auth/client'

export default function Home({ session }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Curated List App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <div className={styles.banner}>
            <div className={styles.headingBox}>
              <div>
                <h1 className={styles.heading}>Curate Your Awesome List</h1>
                <p className={styles.subText}>
                  Keep Sharing Your awesome resource collections
                </p>
                <Link href='/list'>
                  {!session ? (
                    <button onClick={signin} className={styles.button}>
                      Sign In
                    </button>
                  ) : (
                    <button className={styles.button} onClick={signOut}>
                      Sign Out
                    </button>
                  )}
                </Link>
              </div>
            </div>
            <Image
              src='/Data Arranging_Two Color.svg'
              width='500'
              height='500'
            ></Image>
          </div>
          <div className={styles.inspirationBox}>
            <div className={styles.inspirationText}>
              <p className={styles.headingInspiration}>Inspiration</p>
              <p className={styles.inspiration}>
                  I Got the inspiration from seeing people creating awesome 
                  collections of resources as github repo.so i wanted to take that idea and to create a webapp
                  where this curated list of resources could be bit more organized and more specialized place for the resources
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  let session = await getSession(context)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/list',
      },
    }
  }
  return {
    props: { session },
  }
}
