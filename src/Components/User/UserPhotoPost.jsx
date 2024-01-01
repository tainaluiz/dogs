import React from 'react'
import useFetch from '../../Hooks/useFetch'
import useForm from '../../Hooks/useForm'
import { UserContext } from '../../UserContext'
import { PHOTO_POST } from '../../api'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import Error from '../Helper/Error'
import styles from './UserPhotoPost.module.css'
import { useNavigate } from 'react-router-dom'
import SelectImgIcon from '../../Assets/selecionar-imagem.svg?react'
import Head from '../Helper/Head'

const UserPhotoPost = () => {
  const name = useForm()
  const weight = useForm('number')
  const age = useForm('number')
  const [img, setImg] = React.useState({})
  const { data, error, loading, request } = useFetch()
  const { getToken } = React.useContext(UserContext)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) {
      navigate('/conta')
    }
  }, [data, navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('img', img.raw)
    formData.append('nome', name.value)
    formData.append('peso', weight.value)
    formData.append('idade', age.value)

    const { url, options } = PHOTO_POST(getToken(), formData)

    await request(url, options)
  }

  function handleImgChange({ target }) {
    const raw = target.files[0]
    setImg({
      raw,
      preview: URL.createObjectURL(raw),
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Poste sua foto' />

      <form onSubmit={handleSubmit}>
        <Input label='Nome' name='nome' {...name} />
        <Input type='number' label='Peso' name='peso' {...weight} />
        <Input type='number' label='Idade' name='idade' {...age} />

        <label className={styles.imageSelection} htmlFor='img' title='Selecionar foto' aria-label='Selecionar foto'>
          <SelectImgIcon />
        </label>

        <input className={styles.file} type='file' name='img' id='img' onChange={handleImgChange} />

        {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button>}

        <Error error={error} />
      </form>

      <div>
        {img.preview && <div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')` }}></div>}
      </div>
    </section>
  )
}

export default UserPhotoPost
