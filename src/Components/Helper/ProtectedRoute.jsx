import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'

const ProtectedRoute = ({ children }) => {
  const { data } = React.useContext(UserContext)

  switch (data) {
    case undefined:
      return <></>
    case null:
      return <Navigate to='/login' />
    default:
      return children
  }
}

export default ProtectedRoute
