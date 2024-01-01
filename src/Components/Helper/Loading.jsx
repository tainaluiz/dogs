import React from 'react'
import styles from './Loading.module.css'
import LoadingIcon from '../../Assets/carregando.svg?react'

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <LoadingIcon />
      </div>
    </div>
  )
}

export default Loading
