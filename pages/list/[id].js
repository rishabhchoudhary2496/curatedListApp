import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { jsonParse } from '../../utils/genericUtils'
import styles from '../../styles/ListDetail.module.css'
import moment from 'moment'
import {
  faUser,
  faCalendar,
  faHeart as filledHeart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as EmptyHeart } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'

const listDetail = ({ data, likedData, session }) => {
  const [user, mailDomain] = data?.list?.creatorEmail.split('@')
  const [favStatus, setFavStatus] = useState(false)
  console.log(user, mailDomain)
  let router = useRouter()
  const { id } = router.query
  console.log('id', id)
  console.log('liked data', likedData)

  useEffect(async () => {
    const likedResponse = await axios.get(
      `http://localhost:3000/api/list/fav?listId=${id}&userEmail=${session?.user?.email}`
    )
    console.log('likedResponse', likedResponse)
    setFavStatus(likedResponse.data.value)
  }, [])

  const handleFavButton = async (status) => {
    if (status == false) {
      console.log('entering it')
      const response = await axios.delete(
        `http://localhost:3000/api/list/unfav?listId=${id}&userEmail=${session?.user?.email}`
      )
      console.log('response', response)

      if (response.status == 200) {
        setFavStatus(false)
      } else {
        setFavStatus(true)
      }
    } else if (status == true) {
      const response = await axios.post('http://localhost:3000/api/list/fav', {
        listId: id,
        userEmail: session?.user?.email,
      })
      if (response.status == 200) {
        setFavStatus(true)
      } else {
        setFavStatus(false)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>{data?.list?.title}</h1>
        <h3 className={styles.description}>{data?.list?.description}</h3>
        <p className={styles.contentText}>{data?.list?.content}</p>
        <p className={styles.dateText}>
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          {user} {'('}
          <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
          {moment(data.createdAt).format('MMM Do YYYY')}
          {')'}
        </p>
        {favStatus == false && (
          <FontAwesomeIcon
            className={styles.favIcon}
            icon={EmptyHeart}
            onClick={() => handleFavButton(true)}
          />
        )}

        {favStatus == true && (
          <FontAwesomeIcon
            className={styles.favIcon}
            icon={filledHeart}
            onClick={() => handleFavButton(false)}
          />
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const userEmail = session?.user?.email
  const id = ctx.params.id
  const likedResponse = await fetch(
    `http://localhost:3000/api/list/fav?listId=${id}&userEmail=${userEmail}`
  )

  const response = await fetch(`http://localhost:3000/api/list/${id}`)

  const list = await response.json()
  const likedStatus = await likedResponse.json()
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  return {
    props: {
      data: jsonParse(list),
      likedData: jsonParse(likedStatus),
      session,
    },
  }
}

export default listDetail
