import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import AddIcon from '../../Assets/adicionar.svg?react'
import StatsIcon from '../../Assets/estatisticas.svg?react'
import FeedIcon from '../../Assets/feed.svg?react'
import LogoutIcon from '../../Assets/sair.svg?react'
import useMedia from '../../Hooks/useMedia'
import { UserContext } from '../../UserContext'
import styles from './UserHeaderNav.module.css'

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext)
  const mobile = useMedia('(max-width: 40rem)')
  const [mobileMenu, setMobileMenu] = React.useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  function logout() {
    userLogout()
    navigate('/login')
  }

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          aria-label='Menu'
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to='/conta' end>
          <FeedIcon />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to='/conta/estatisticas'>
          <StatsIcon />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to='/conta/postar'>
          <AddIcon />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={logout}>
          <LogoutIcon />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  )
}

export default UserHeaderNav
