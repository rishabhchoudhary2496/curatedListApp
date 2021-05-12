import React from 'react'
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

const listDetail = ({ data, session, heart }) => {
  const [user, mailDomain] = data?.list?.creatorEmail.split('@')
  console.log(user, mailDomain)
  let router = useRouter()

  const handleFavButton = (status) => {
    console.log('liked list: ', status)
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
        {/* <FontAwesomeIcon
          className={styles.favIcon}
          icon={EmptyHeart}
          onClick={() => handleFavButton(true)}
        /> */}
        {/* <FontAwesomeIcon
          className={styles.favIcon}
          icon={filledHeart}
          onClick={() => handleFavButton(false)}
        /> */}
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const id = ctx.params.id
  const response = await fetch(`http://localhost:3000/api/list/${id}`)
  const list = await response.json()
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
      session,
    },
  }
}

export default listDetail
