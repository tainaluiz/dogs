import { useParams } from 'react-router-dom'
import Feed from '../Feed/Feed'
import Head from '../Helper/Head'

const UserProfile = () => {
  const { id } = useParams()

  return (
    <section className='container mainContainer'>
      <Head title={id} />

      <h1 className='title'>{id}</h1>
      <Feed user={id} />
    </section>
  )
}

export default UserProfile
