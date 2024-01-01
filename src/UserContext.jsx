import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api'

const TOKEN_KEY = 'token'

const UserContext = React.createContext()

const UserStorage = ({ children }) => {
  const [data, setData] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()

  const userLogout = React.useCallback(function () {
    setData(null)
    setError(null)
    setLoading(false)
    window.localStorage.removeItem(TOKEN_KEY)
  }, [])

  async function getUser(token) {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    setData(json)
  }

  async function userLogin(username, password) {
    setLoading(true)
    setError(null)

    const { url, options } = TOKEN_POST({
      username,
      password,
    })

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        const statusText = response.statusText || 'Verifique os dados e tente novamente'
        throw new Error(`Erro: ${statusText}`)
      }

      const { token } = await response.json()
      window.localStorage.setItem(TOKEN_KEY, token)

      await getUser(token)
      navigate('/conta')
    } catch (err) {
      window.localStorage.removeItem(TOKEN_KEY)
      setData(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function getToken() {
    return window.localStorage.getItem(TOKEN_KEY)
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = getToken()

      if (token) {
        setLoading(true)
        setError(null)

        const { url, options } = TOKEN_VALIDATE_POST(token)

        try {
          const response = await fetch(url, options)

          if (!response.ok) {
            throw new Error('Token inválido')
          }

          await getUser(token)
        } catch (err) {
          userLogout()
        } finally {
          setLoading(false)
        }
      } else {
        setData(null)
      }
    }

    autoLogin()
  }, [userLogout])

  return <UserContext.Provider value={{ userLogin, userLogout, getToken, data, error, loading }}>{children}</UserContext.Provider>
}

export { UserContext, UserStorage }
