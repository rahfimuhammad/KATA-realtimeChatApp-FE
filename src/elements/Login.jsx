import React, { useState } from 'react'
import axios from 'axios'
import { useApp } from '../context/AppProvider'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Spinner from './Spinner'
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const { setId, setProfile } = useApp()
  const [loading, setLoading] = useState(false)
  const notifySuccess = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
  
  const login = async (data) => {
      
    try {
      setLoading(true)
      const response = await axios.post('https://kata-realtimechatapp-be.onrender.com/login',
      data
      )
      notifySuccess(response?.message)
      setId(response?.data?.id)
      setProfile(response?.data)
      setLoading(false)
    } catch (error) {
      notifyError(error.message)
    } finally {
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
          <form 
              onSubmit={formik.handleSubmit} 
              action="submit" 
              className='auth-form'>
            <div className='auth-input'>
              <label htmlFor='id'>Phone Number: </label>
              <input 
                  required type="number" 
                  name='id' 
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
              />
              {formik.touched.id && formik.errors.id ? (
                    <p className="error-message">{formik.errors.id}</p>
                  ) : null}
            </div>
            <div className='auth-input'>
              <label htmlFor='password'>Password:</label>
              <input 
                  required 
                  type="password" 
                  name='password' 
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                  <p className="error-message">{formik.errors.password}</p>
              ) : null}
            </div>
            <button 
                type='submit' 
                className='btn-submit'>
              {loading
              ? <Spinner size={25}/> 
              : "Sign In" 
              }
            </button>
          </form>
  )
}

export default Login