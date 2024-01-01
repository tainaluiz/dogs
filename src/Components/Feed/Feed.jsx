import PropTypes from 'prop-types'
import React from 'react'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null)
  const [pages, setPages] = React.useState([1])
  const [infinite, setInfinite] = React.useState(true)
  const [wait, setWait] = React.useState(false)

  React.useEffect(() => {
    function infiniteScroll() {
      if (!infinite || wait) {
        return
      }

      const scroll = window.scrollY
      const height = document.body.offsetHeight - window.innerHeight

      if (scroll > height * 0.75) {
        setPages((pages) => [...pages, pages.length + 1])
        setWait(true)
      }
    }

    const events = ['wheel', 'scroll']

    events.forEach((e) => window.addEventListener(e, infiniteScroll))

    return () => {
      events.forEach((e) => window.removeEventListener(e, infiniteScroll))
    }
  }, [infinite, wait])

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}

      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
          setWait={setWait}
        />
      ))}
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
}

export default Feed
