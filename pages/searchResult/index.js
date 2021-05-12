import React from 'react'
import ListItem from '../../components/ListCard'
import { useRouter } from 'next/router'
import { jsonParse } from '../../utils/genericUtils'
import { getSession } from 'next-auth/client'
import styles from '../../styles/SearchResult.module.css'
import Navbar from '../../components/NavBar'

const index = ({ session, data: { searchResult } }) => {
  console.log('data', searchResult)
  const router = useRouter()
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Search Results</h1>
        {searchResult.length === 0 && (
          <h3 className={styles.text}>No Results Found</h3>
        )}
        {searchResult.map((item) => (
          <ListItem
            key={item._id}
            id={item._id}
            title={item.title}
            description={item.description}
            content={item.content}
          ></ListItem>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { searchTerm } = context.query
  console.log('searchTerm', searchTerm)
  let session = await getSession(context)
  const response = await fetch(
    `http://localhost:3000/api/search?q=${searchTerm}`
  )
  const data = await response.json()
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/list',
      },
    }
  }
  return {
    props: { session, data: jsonParse(data) },
  }
}

export default index
