import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()
  const dispatch  = useDispatch()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`https://e-shop-backend.herokuapp.com/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      dispatch(addUser(json))
      console.log(json)


      // update the auth context
      // dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      navigate('/')
    }
  }

  return { login, isLoading, error }
}