import styles from '../styles/List.module.css'
import Image from 'next/image'

const ListCard = ({ title, description, content }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles['card-title']}>{title}</h3>
      <p className={styles['card-description']}>{description}</p>
      <button className={styles.button}>View</button>
    </div>
  )
}

export default ListCard
