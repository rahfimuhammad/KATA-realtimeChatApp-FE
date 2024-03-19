import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner'

const SignUp = ({ setIsRegister }) => {

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

    const register = async (data) => {

      try {
        setLoading(true)
        const response = await axios.post('https://kata-server-e0c6f72de554.herokuapp.com/users',
        data
        )
        notifySuccess(response?.data.message)
        setLoading(false)
      } catch (error) {
        notifyError(error.message)
      } finally {
        setLoading(false)
        setTimeout(() => {
          setIsRegister(prevData => !prevData);
      }, 2000);
      }
    }

    const handleSubmit = () => {
        register(formik.values)
    }

    const handleChange = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)
      }

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            email: "",
            avatarURL: "",
            password: ""
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object().shape({
            id: yup.string().required().min(10).max(13),
            name: yup.string().required().min(5),
            email: yup.string().required().email(),
            avatarURL: yup.string().required().url(),
            password: yup.string().required().min(6)
        })
    })

  return (
          <form action="submit" onSubmit={formik.handleSubmit} className='auth-form'>
                <div className='auth-input'>
                  <label htmlFor='id'> Phone Number:</label>
                  <input required type="number" name='id' onChange={handleChange}/>
                </div>
                <div className='auth-input'>
                  <label htmlFor='name'>Username:</label>
                  <input required type="text" name='name' onChange={handleChange} />
                </div> 
                <div className='auth-input'>
                  <label htmlFor='email'>Email:</label>
                  <input required type="text" name='email' onChange={handleChange} />
                </div>
                <div className='auth-input'>
                  <label htmlFor='avatarURL'>Avatar Link:</label>
                  <input required type="text" name='avatarURL' onChange={handleChange}/>
                </div>
                <div className='auth-input'>
                  <label htmlFor='password'>Password:</label>
                  <input required type="password" name='password' onChange={handleChange}/>
                </div>
            <button type='submit' className='btn-submit'>
              {loading
              ? <Spinner size={22}/> 
              : "SIGN UP"}
            </button>
          </form>
  )
}

export default SignUp