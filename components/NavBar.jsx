import React from 'react'
import Link from 'next/link'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href='/list'>Home</Link>
        </li>
        <li className={styles.listItem}>
          <Link href='/list/create'>Create</Link>
        </li>
        <li className={styles.listItem}>
          <Link href='#'>Profile</Link>
        </li>
        <div className={styles.searchBox}>
          <input
            type='text'
            className={styles.search}
            placeholder='search'
            name=''
            id=''
          />
          <button className={styles.searchBtn}>Search</button>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
