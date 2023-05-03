import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`https://e-shop-backend.herokuapp.com/auth/signup`, {
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
      // update loading state
      localStorage.setItem('user', JSON.stringify(json))
      dispatch(addUser(json))
      setIsLoading(false)
      navigate('/')
    }
  }

  return { signup, isLoading, error }
}