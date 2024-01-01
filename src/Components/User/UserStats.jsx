import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { UserContext } from '../../UserContext'
import { STATS_GET } from '../../api'
import Error from '../Helper/Error'
import Head from '../Helper/Head'
import Loading from '../Helper/Loading'

const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))

const UserStats = () => {
  const { data, error, loading, request } = useFetch()
  const { getToken } = React.useContext(UserContext)

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET(getToken())
      await request(url, options)
    }

    getData()
  }, [request, getToken])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return data ? (
    <React.Suspense fallback={<div></div>}>
      <Head title='Estatísticas' />
      <UserStatsGraphs data={data} />
    </React.Suspense>
  ) : null
}

export default UserStats
