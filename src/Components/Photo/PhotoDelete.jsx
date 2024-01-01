import React from 'react'
import styles from './PhotoDelete.module.css'
import { UserContext } from '../../UserContext'
import { PHOTO_DELETE } from '../../api'
import useFetch from '../../Hooks/useFetch'

const PhotoDelete = ({ id }) => {
  const { getToken } = React.useContext(UserContext)
  const { loading, request } = useFetch()

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja excluir?')

    if (!confirm) {
      return
    }

    const { url, options } = PHOTO_DELETE(id, getToken())

    const { response } = await request(url, options)

    if (response.ok) {
      window.location.reload()
    }
  }

  return (
    <>
      <button className={styles.delete} onClick={handleClick} disabled={loading}>
        {loading ? 'Excluindo' : 'Excluir'}
      </button>
    </>
  )
}

export default PhotoDelete
