import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import { Link, useNavigate } from 'react-router-dom'
import { reigsterUser } from '../../redux/slices/products/usersSlice'

import NavAll from '../homePage/NavAll'
import { SiGamejolt } from 'react-icons/si'

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [userInput, setUserInput] = useState({
    name: '',
    userName: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [invalidMessage, setInvalidMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if required fields are not empty
    if (!userInput.name || !userInput.userName || !userInput.email || !userInput.password) {
      setInvalidMessage('Please fill in all fields.')
    } else {
      dispatch(reigsterUser(userInput))
      navigate('/login')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
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
          <h2>Register</h2>
          <label htmlFor="name">name</label>
          <input type="text" name="name" onChange={handleChange} />
          <label htmlFor="userName">user name</label>
          <input type="text" name="userName" onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} />
          <p style={{ color: 'red' }}>{invalidMessage}</p>
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default Register
