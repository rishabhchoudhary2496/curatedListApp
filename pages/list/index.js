import ListCard from '../../components/ListCard'
import styles from '../../styles/List.module.css'
import { jsonParse } from '../../utils/genericUtils'
import Navbar from '../../components/NavBar'
import { getSession } from 'next-auth/client'
import Pagination from 'next-pagination'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const List = ({ data, session }) => {
  console.log('total Docs', data.list.totalDocs)
  console.log('session', session)
  return (
    <>
      <Navbar session={session} />
      <div className={styles.container}>
        <main className={styles.main}>
          <div></div>
          <h1 className={styles.mainHeading}>
            Top Curated Lists
            <FontAwesomeIcon className={styles.icon} icon={faClipboardList} />
          </h1>
          {data?.list?.docs.length == 0 && (
            <h3 className={styles.h3}>No List Found</h3>
          )}
          {data?.list?.docs.map((listItem) => (
            <ListCard
              key={listItem._id}
              id={listItem._id}
              title={listItem.title}
              description={listItem.description}
              content={listItem.content}
            />
          ))}
          {data?.list?.docs.length > 0 && (
            <Pagination
              total={data?.list?.totalDocs}
              sizes={[10, data?.list?.limit]}
            />
          )}
        </main>
        <aside className={styles.aside}></aside>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  console.log('ctx.query', ctx.query)
  const page = ctx.query.page || 1
  const response = await fetch(`http://localhost:3000/api/list?page=${page}`)
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

export default List
