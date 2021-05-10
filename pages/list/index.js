import axios from 'axios'
import ListCard from '../../components/ListCard'
import styles from '../../styles/List.module.css'
import { jsonParse } from '../../utils/genericUtils'

const List = ({ data }) => {
  console.log('data', data)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.mainHeading}>Top Curated Lists</h1>
        {data.list.map((listItem) => (
          <ListCard
            key={listItem._id}
            title={listItem.title}
            description={listItem.description}
            content={listItem.content}
          />
        ))}
      </main>
      <aside className={styles.aside}></aside>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const response = await fetch('http://localhost:3000/api/list')
  const list = await response.json()
  return {
    props: {
      data: jsonParse(list),
    },
  }
}

export default List
