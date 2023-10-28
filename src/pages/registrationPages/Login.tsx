import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, loginUser } from '../../redux/slices/products/usersSlice'


const Login = () => {
  const { users, isLoading, userLoginData, error } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [userInput,setUserInput]=useState({email:'',password:''})
  const navigate=useNavigate()
  
  useEffect(() => {
    dispatch(fetchUsers())
  },[])
  console.log(isLoading)
  console.log(users)
  const handleChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setUserInput({...userInput,[name]:value})
  }
  console.log(userInput)
let invalidMessage
const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    const usersExists=users.find((user)=>user.email===userInput.email && user.password === userInput.password )
    
    if(usersExists){
      
        if(usersExists.ban){
          console.log('you are ban')
        }else{
          dispatch(loginUser(usersExists))
          navigate('/')
        }

    }else{
        invalidMessage=<p>the email or password is uncorrect</p>
        
    }
}
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">email </label>
        <input type="email" name="email" placeholder='xx@xx.com' onChange={handleChangeInput} required />
        <br />
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={handleChangeInput} required/>
        {invalidMessage}
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default Login
