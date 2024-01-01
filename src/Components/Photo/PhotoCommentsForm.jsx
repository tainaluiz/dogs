import React from 'react'
import SendIcon from '../../Assets/enviar.svg?react'
import useFetch from '../../Hooks/useFetch'
import { UserContext } from '../../UserContext'
import { COMMENT_POST } from '../../api'
import Error from '../Helper/Error'
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState('')
  const { getToken } = React.useContext(UserContext)
  const { request, error } = useFetch()
  const commentTextArea = React.useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()

    const { url, options } = COMMENT_POST(id, { comment }, getToken())

    const { response, json } = await request(url, options)

    if (response.ok) {
      setComments((comments) => [...comments, json])
      setComment('')
      commentTextArea.current.focus()
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id='comment'
        name='comment'
        placeholder='Comente...'
        ref={commentTextArea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />

      <button className={styles.button}>
        <SendIcon />
      </button>

      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm
