import React, { useState } from 'react'
import axios from 'axios'
import { useApp } from '../context/AppProvider'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Spinner from './Spinner'

const Login = () => {

  const { setId, setProfile } = useApp()
  const [loading, setLoading] = useState(false)
  
  const login = async (data) => {
      
    try {
      setLoading(true)
      const response = await axios.post('https://kata-server-e0c6f72de554.herokuapp.com/login',
      data
      )
      setId(response?.data?.id)
      setProfile(response?.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleLogin = () => {

    login(formik.values)
  }

  const formik = useFormik({
    initialValues: {
      id: "",
      password: ""
    },
    onSubmit: handleLogin,
    validationSchema: yup.object().shape({
      id: yup.string().required().min(10).max(13),
      password: yup.string().required().min(6)
    })
  })

  const handleChange = (event) => {
    const { target } = event
    formik.setFieldValue(target.name, target.value)
  }

  return (
          <form onSubmit={formik.handleSubmit} action="submit" className='auth-form'>
            <div className='auth-input'>
              <label htmlFor='id'>Phone Number: </label>
              <input required type="number" name='id' onChange={handleChange}/>
            </div>
            <div className='auth-input'>
              <label htmlFor='password'>Password:</label>
              <input required type="password" name='password' onChange={handleChange}/>
            </div>
            <button type='submit' className='btn-submit'>
              {loading
              ? <Spinner size={22}/> 
              : "SIGN IN" 
              }
            </button>
          </form>
  )
}

export default Login