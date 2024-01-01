import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import React from 'react'
import { PHOTO_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import PhotoContent from './PhotoContent'
import Head from '../Helper/Head'

const Photo = () => {
  const { id } = useParams()
  const { data, loading, error, request } = useFetch()

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id)
    request(url, options)
  }, [id, request])

  if (error) {
    return <Error error={error} />
  }
  if (loading) {
    return <Loading />
  }

  return data ? (
    <section className='container mainContainer'>
      <Head title={data.photo.title} />

      <PhotoContent data={data} single={true} />
    </section>
  ) : null
}

export default Photo
