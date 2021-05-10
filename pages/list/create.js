import styles from '../../styles/Editor.module.css'
import { useState } from 'react'
import axios from 'axios'
import router from 'next/router'
import Navbar from '../../components/NavBar'

const create = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('handle submit', e)
    try {
      await axios.post('http://localhost:3000/api/list/create', {
        title: title,
        description: description,
        content: content,
      })
      router.push('/list')
    } catch (error) {
      alert(error)
      console.log('something went wrong', e)
    }
  }
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Create List </h1>
        <div className={styles.editorWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={styles['form-group']}>
              <label htmlFor='title' className={styles['form-label']}>
                List Title
              </label>
              <input
                value={title}
                type='text'
                id='title'
                className={styles['form-input']}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <div className={styles['form-group']}>
                <label htmlFor='title' className={styles['form-label']}>
                  Description
                </label>
                <textarea
                  value={description}
                  name=''
                  id=''
                  cols='30'
                  rows='10'
                  className={styles.content}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <div className={styles['form-group']}>
                <label htmlFor='title' className={styles['form-label']}>
                  Content
                </label>
                <textarea
                  value={content}
                  name=''
                  id=''
                  cols='30'
                  rows='10'
                  className={styles.content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button type='submit' className={styles.button}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default create
