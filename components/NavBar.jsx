import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import styles from '../styles/NavBar.module.css'
import { signOut } from 'next-auth/client'
import debounce from 'lodash.debounce'
import axios from 'axios'

const NavBar = ({ session }) => {
  const [search, setSearch] = useState('')
  const [suggestionResult, setSuggestionResult] = useState([])

  console.log('suggestionResult', suggestionResult)

  const callSuggestionApi = async (search) => {
    console.log('cal suggestion api', search)
    if (!search) {
      setSuggestionResult([])
      return
    }
    try {
      const result = await axios.get(
        `http://localhost:3000/api/search/suggestion?q=${search}`
      )

      setSuggestionResult(result.data.suggestion)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const debounceApi = useCallback(
    debounce((nextValue) => callSuggestionApi(nextValue), 900),
    []
  )

  const handleChange = (event) => {
    let { value: nextValue } = event.target
    if (nextValue !== '') {
      setSearch(nextValue)
      debounceApi(nextValue)
    } else {
      console.log('next value in else', nextValue)
      setSuggestionResult([])
      setSearch('')
    }
    console.log('should be in')
    // debounceApi()
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href='/list'>Home</Link>
        </li>
        <li className={styles.listItem}>
          <Link href='/list/create'>Create</Link>
        </li>

        <div className={styles.autosuggestion}>
          <div className={styles.searchBox}>
            <input
              type='text'
              className={styles.search}
              placeholder='search'
              name='search'
              id='search'
              value={search}
              onChange={(e) => handleChange(e)}
            />
            <button className={styles.searchBtn}>Search</button>
            {suggestionResult.length > 0 ? (
              <div className={styles.suggestionDiv}>
                {suggestionResult.map((result) => (
                  <li className={styles.searchListItem} key={result._id}>
                    {result.title}
                  </li>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {session && (
          <div className={styles.floatRight}>
            <li>
              <button onClick={signOut} className={styles.logout}>
                Logout
              </button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
