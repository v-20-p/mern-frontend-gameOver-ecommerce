import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { loginUser } from '../../redux/slices/products/usersSlice'
import NavAll from './../homePage/NavAll'
import { SiGamejolt } from 'react-icons/si'

const Login = () => {
  const { users, isLoading, userLoginData, error } = useSelector(
    (state: RootState) => state.userReducer
  )
  const dispatch = useDispatch<AppDispatch>()
  const [userInput, setUserInput] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const [invalidMessage, setInvalidMessage] = useState('')

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }

  const validateForm = () => {
    const { email, password } = userInput
    if (!email || !password) {
      setInvalidMessage('Please fill in all fields.')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const userExists = users.find(
        (user) => user.email === userInput.email && user.password === userInput.password
      )
      if (userExists) {
        if (userExists.ban) {
          setInvalidMessage('You are banned.')
        } else {
          dispatch(loginUser(userExists))
          navigate('/')
        }
      } else {
        setInvalidMessage('The email or password is incorrect.')
      }
    }
  }

  return (
    <>
      <NavAll />
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <p className="logo">
            GAME
            <SiGamejolt />
            OVER
          </p>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="xx@xx.com" onChange={handleChangeInput} />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChangeInput} />
          <p style={{ color: 'red' }}>{invalidMessage}</p>
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default Login
