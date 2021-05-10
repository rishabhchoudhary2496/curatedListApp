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
                <p className={styles.subText}>Share it With Others</p>
                <Link href='/list'>
                  {!session ? (
                    <button onClick={signin} className={styles.button}>
                      Get Started
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
          {/* <div className={styles.inspirationBox}>
          <div>Inspiration</div>
          <div className={styles.inspirationText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            omnis quam rerum exercitationem molestias aliquid! Tenetur ipsum
            sint deleniti porro numquam? Omnis, quam quibusdam consequatur
            eveniet eos reprehenderit voluptas non quaerat iure reiciendis
            veniam beatae, est commodi aliquam debitis illum nam magnam dolore
            id! Adipisci cupiditate facere assumenda ratione laudantium!
          </div>
        </div> */}
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
