import React from 'react'
import useForm from '../../Hooks/useForm'
import { UserContext } from '../../UserContext'
import { USER_POST } from '../../api'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import Error from '../Helper/Error'
import useFetch from '../../Hooks/useFetch'
import Head from '../Helper/Head'

const LoginCreate = () => {
  const username = useForm()
  const email = useForm('email')
  const password = useForm()
  const { loading, error, request } = useFetch()

  const { userLogin } = React.useContext(UserContext)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    })

    const { response } = await request(url, options)

    if (response.ok) {
      await userLogin(username.value, password.value)
    }
  }

  function validateForm() {
    return [username, email, password].map((field) => field.validate()).every((valid) => valid)
  }

  return (
    <section className='animeLeft'>
      <Head title='Cadastro' />

      <h1 className='title'>Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
        <Input label='Usuário' name='username' {...username} />
        <Input type='email' label='E-mail' name='email' {...email} />
        <Input type='password' label='Senha' name='password' {...password} />

        {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
        <Error error={error} />
      </form>
    </section>
  )
}

export default LoginCreate
