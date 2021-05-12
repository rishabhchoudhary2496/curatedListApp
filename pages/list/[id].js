import React from 'react'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { jsonParse } from '../../utils/genericUtils'
import styles from '../../styles/ListDetail.module.css'
import moment from 'moment'

const listDetail = ({ data, session }) => {
  console.log('data', new Date(data.createdAt))
  console.log('date',moment().utc(data.createdAt).format('DD/MM/YYYY'))
  let router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>{data?.list?.title}</h1>
        <h3 className={styles.description}>{data?.list?.description}</h3>
        <p className={styles.contentText}>{data?.list?.content}</p>
        <p className={styles.dateText}>
          {moment(data.createdAt).format('MMM Do YYYY')}
        </p>
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
