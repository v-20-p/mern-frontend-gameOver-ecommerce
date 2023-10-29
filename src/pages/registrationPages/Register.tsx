import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchUsers, register } from '../../redux/slices/products/usersSlice'

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { users} = useSelector((state: RootState) => state.userReducer)
    
    const [userInput,setUserInput]=useState({firstName:'',lastName:'',email:'',password:''})
    const navigate=useNavigate()

    useEffect(() => {
        dispatch(fetchUsers())
      },[dispatch])

      const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        dispatch(register(userInput))
        navigate('/login')
        



      }
      const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setUserInput({...userInput,[name]:value})
    

      }

    
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="firstName">first Name :</label>
            <input type="text" name="firstName"  onChange={handleChange} />
            <label htmlFor="lastName">last Name :</label>
            <input type="text" name="lastName" onChange={handleChange} />
            <label htmlFor="email">email</label>
            <input type="email" name="email" onChange={handleChange} />
            <label htmlFor="password">password</label>
            <input type="password" name="password"onChange={handleChange} />
            <button type='submit'>submit</button>
        </form>

    </div>
  )
}

export default Register