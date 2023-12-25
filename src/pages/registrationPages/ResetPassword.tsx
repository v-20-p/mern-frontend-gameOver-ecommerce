import React, { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

import NavAll from '../homePage/NavAll'
 
import { SiGamejolt } from 'react-icons/si'
import PopUp from '../../PopUp'
import { resetpasswordUser } from '../../redux/slices/products/usersSlice'


const ResetPassword = () => {
  // const { token  } = useParams() 
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  
  const [searchParams, setSearchParams] = useSearchParams()
  const token =searchParams.get('token')

  const decoded=jwtDecode(token as string) as {email:string}
  
  const [userInput, setUserInput] = useState({ password1: '', password2: '' })
  const [invalidMessage, setInvalidMessage] = useState('')
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
    setInvalidMessage('') 
  }
  const validateForm = () => {
    const { password1, password2 } = userInput
    if (password1 != password2) {
      
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log({token:token,newPassword:userInput.password1})
      dispatch(resetpasswordUser({token:token,newPassword:userInput.password1}))
        }
       else {
        setInvalidMessage('password not match') 
    }
  }



  return (
 <>
 <NavAll />
     <div className="form">
        {token ?<form action="" onSubmit={handleSubmit}>
          <p className="logo">
            GAME
            <SiGamejolt />
            OVER
          </p>
          <h2>Reset password</h2>
          <h4>email : {decoded!.email}</h4>
          <label htmlFor="email">password</label>
          <input type="password" name="password1" placeholder="xxxxxxx" onChange={handleChangeInput} />
          <br />
          <label htmlFor="password">confirm assword</label>
          <input type="password" name="password2" onChange={handleChangeInput} />
          <p style={{ color: 'red' }}>{invalidMessage}</p>
          <button type="submit">send</button>

          {/* <span>
            Forget password ? click <PopUp nameBtn={'hare'} className='password' span={true}>
            </PopUp>
          </span> */}
        </form>:<form><h1>you dont have access</h1></form>}

      </div>
    </>

  )
}

export default ResetPassword
