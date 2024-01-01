import React from 'react'

const useFetch = () => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const request = React.useCallback(async (url, options) => {
    let response = null
    let json = null

    setError(null)
    setLoading(true)

    try {
      response = await fetch(url, options)
      json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      setData(json)
    } catch (err) {
      setError(err.message)
      json = null
    }

    setLoading(false)
    setData(json)

    return { response, json }
  }, [])

  return {
    data,
    loading,
    error,
    request,
  }
}

export default useFetch
