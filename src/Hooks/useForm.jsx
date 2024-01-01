import React from 'react'

const validationType = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    message: 'Preencha um e-mail válido',
  },
  password: {
    regex: /^[^\s]{8,}$/i,
    message: 'A senha deve conter no mínimo 8 caracteres, exceto espaços',
  },
  number: {
    regex: /^\d+$/,
    message: 'Informe apenas números',
  },
}

const useForm = (type) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(null)

  function validate(value) {
    if (type?.length === 0) {
      return true
    }

    if (value.length === 0) {
      setError('Preencha um valor')
      return false
    }

    const validationObj = validationType[type]

    if (validationObj && !validationObj.regex.test(value)) {
      setError(validationObj.message)
      return false
    }

    setError(null)
    return true
  }

  function onChange({ target }) {
    setValue(target.value)

    if (error) {
      validate(target.value)
    }
  }

  return {
    error,
    value,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }
}

export default useForm
