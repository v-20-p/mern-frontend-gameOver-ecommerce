import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import { Link, useNavigate } from 'react-router-dom'
import {  reigsterUser } from '../../redux/slices/products/usersSlice'

import NavAll from '../homePage/NavAll'
import { SiGamejolt } from 'react-icons/si'

const ValidateEmailPage = () => {
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
          <p>Please verify your email to access the full functionality of the app.</p>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default ValidateEmailPage
