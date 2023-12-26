import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from '@iconify/react'

import { AppDispatch, RootState } from '../../redux/store'

import NavAll from './../homePage/NavAll'
import { SiGamejolt } from 'react-icons/si'
import { forgetPassword, login } from '../../redux/slices/products/usersSlice'
import PopUp from '../../PopUp'

const Login = ({ pathName }: { pathName?: string }) => {
  const { users, isLoading, userLoginData, error } = useSelector(
    (state: RootState) => state.userReducer
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const value = searchParams.get('value')
  const [queryParam, setQueryParam] = useState('')

  useEffect(() => {
    if (value == '1') {
      setQueryParam('the password is change 👌')
    } else if (value == '2') {
      setQueryParam('The account is activate ')
    }
  }, [])

  const dispatch = useDispatch<AppDispatch>()
  const [userInput, setUserInput] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const [invalidMessage, setInvalidMessage] = useState('')
  useEffect(() => {
    if (userLoginData) {
      navigate('/')
    }
  }, [userLoginData, navigate])
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
      dispatch(login(userInput))
    } else {
      setInvalidMessage('The email or password is incorrect.')
    }
  }
  const [send, setSend] = useState('')
  const handleSendForgetPassword = () => {
    const findUser = users.find((user) => user.email == userInput.email)
    if (findUser) {
      dispatch(forgetPassword(findUser.email))
      setSend('check your email to reset password ⭐')
    } else {
      setSend('not found this email 😟')
    }
  }
  const handleClear = () => {
    setSend('')
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
          {queryParam && (
            <h4>
              {queryParam} <span onClick={() => setQueryParam('')}>X</span>
            </h4>
          )}
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
          <br />
          <span>
            Forget password ? click{' '}
            <PopUp nameBtn={'hare'} className="password" span={true}>
              {!send ? (
                <div>
                  <h2>sorry for hear that 😟</h2>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userInput.email}
                    placeholder="xx@xx.com"
                    onChange={handleChangeInput}
                  />
                  <button type="button" onClick={handleSendForgetPassword}>
                    send
                  </button>
                </div>
              ) : (
                <>
                  <h1>{send}</h1>
                  <div>
                    <button type="button" onClick={handleClear}>
                      try Again
                    </button>
                  </div>
                </>
              )}
            </PopUp>
          </span>
        </form>
      </div>
    </>
  )
}

export default Login
