import React, { useState } from 'react'
import '../style/register.scss'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {loading , handleRegister}  = useAuth()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister({email,username,password})
    navigate('/')
  }
  return (
    <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
        <FormGroup 
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        label="Username" placeholder="Enter your username"/>
        <FormGroup 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        label="Email" placeholder="Enter your email"/>
        <FormGroup 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        label="Password" placeholder="Enter your password"/>
        <button className='button'>Register</button>
        </form>
        <p>Already have an account ? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register



/**
 * /login = login page dikha skate hai 
 * 
 */