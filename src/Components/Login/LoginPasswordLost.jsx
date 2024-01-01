import useFetch from '../../Hooks/useFetch'
import useForm from '../../Hooks/useForm'
import { PASSWORD_LOST } from '../../api'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginPasswordLost = () => {
  const login = useForm()
  const { data, loading, error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()

    if (!login.validate()) {
      return
    }

    const { url, options } = PASSWORD_LOST({
      login: login.value,
      url: window.location.href.replace('perdeu', 'resetar'),
    })

    await request(url, options)
  }

  return (
    <section className='animeLeft'>
      <Head title='Perdeu a senha?' />

      <h1 className='title'>Perdeu a senha?</h1>

      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label='Email / Usuário' name='login' {...login} />
          <Button disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</Button>
        </form>
      )}

      <Error error={error} />
    </section>
  )
}

export default LoginPasswordLost
