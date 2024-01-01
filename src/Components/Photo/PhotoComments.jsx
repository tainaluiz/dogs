import React from 'react'
import { UserContext } from '../../UserContext'
import styles from './PhotoComments.module.css'
import PhotoCommentsForm from './PhotoCommentsForm'

const PhotoComments = (props) => {
  const { data } = React.useContext(UserContext)
  const [comments, setComments] = React.useState(() => props.comments)
  const commentsSection = React.useRef(null)

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight
  }, [comments])

  return (
    <>
      <ul className={`${styles.comments} ${props.single ? styles.single : ''}`} ref={commentsSection}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}:</b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {data && <PhotoCommentsForm id={props.id} setComments={setComments} single={props.single} />}
    </>
  )
}

export default PhotoComments
