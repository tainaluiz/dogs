import Image from '../Helper/Image'
import styles from './FeedPhoto.module.css'

const FeedPhoto = ({ photo, setModalPhoto }) => {
  return (
    <li className={styles.photo} onClick={() => setModalPhoto(photo)}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.views}>{photo.acessos}</span>
    </li>
  )
}

export default FeedPhoto
