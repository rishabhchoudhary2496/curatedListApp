import styles from '../styles/List.module.css'
import Link from 'next/link'

const ListCard = ({ id, title, description, content }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles['card-title']}>{title}</h3>
      <p className={styles['card-description']}>{description}</p>
      <Link href={`/list/${id}`}>
        <button className={styles.button}>View</button>
      </Link>
    </div>
  )
}

export default ListCard
