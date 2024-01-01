import styles from './Footer.module.css'
import FooterIcon from '../Assets/dogs-footer.svg?react'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterIcon />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  )
}

export default Footer
