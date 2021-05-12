import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/NavBar.module.css'
import { signOut } from 'next-auth/client'
import debounce from 'lodash.debounce'
import axios from 'axios'
import { useRouter } from 'next/router'
import ActiveLink from './ActiveLink'

const NavBar = ({ session }) => {
  const [search, setSearch] = useState('')
  const [suggestionResult, setSuggestionResult] = useState([])
  const router = useRouter()

  useEffect(() => {
    setSuggestionResult([])
  }, [])

  const callSuggestionApi = async (searchTerm) => {
    if (!searchTerm) return setSuggestionResult([])
    try {
      const result = await axios.get(
        `http://localhost:3000/api/search/suggestion?q=${searchTerm}`
      )

      setSuggestionResult(result.data.suggestion)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const callSearchApi = async (searchTerm) => {
    console.log('search', searchTerm)
    // try {
    //   const response = await axios.get(
    //     `http://localhost:3000/api/search?q=${searchTerm}`
    //   )

    // console.log(response.data.searchResult)
    // localStorage.setItem(
    //   'searchResult',
    //   JSON.stringify(response?.data?.searchResult)
    // )

    setSuggestionResult([])
    router.push({
      pathname: '/searchResult',
      query: { searchTerm },
    })
  }

  const debounceApi = useCallback(
    debounce((newValue) => callSuggestionApi(newValue), 900),
    []
  )

  const handleChange = (newValue) => {
    setSearch(newValue)
    debounceApi(newValue)
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
              onChange={(e) => handleChange(e.target.value)}
            />
            <button
              className={styles.searchBtn}
              onClick={() => callSearchApi(search)}
            >
              Search
            </button>
            {suggestionResult.length > 0 ? (
              <div className={styles.suggestionDiv}>
                {suggestionResult.map((result) => (
                  <li
                    className={styles.searchListItem}
                    key={result._id}
                    onClick={() => callSearchApi(result?.title)}
                  >
                    {result.title}
                  </li>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {session && (
          <div>
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
