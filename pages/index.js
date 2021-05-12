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
                  Keep Sharing Your awesome resources collections
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, omnis quam rerum exercitationem molestias aliquid!
                Tenetur ipsum sint deleniti porro numquam? Omnis, quam quibusdam
                consequatur eveniet eos reprehenderit voluptas non quaerat iure
                reiciendis veniam beatae, est commodi aliquam debitis illum nam
                magnam dolore id! Adipisci cupiditate facere assumenda ratione
                laudantium!
              </p>
            </div>
            {/* <Image
              src='/lauren-sauder-1OUzxbySjlQ-unsplash.jpg'
              width='600'
              height='400'
              className={styles.img}
            ></Image> */}
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
