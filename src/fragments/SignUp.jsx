import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'

const Auth = () => {

    const register = async (data) => {

      try {
        const response = await axios.post('http://localhost:5000/users',
        data
        )
        console.log(response)
      } catch (error) {
        console.log(error.message)
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
                  <label for='id'> Phone Number:</label>
                  <input required type="number" name='id' onChange={handleChange}/>
                </div>
                <div className='auth-input'>
                  <label for='name'>Username:</label>
                  <input required type="text" name='name' onChange={handleChange} />
                </div> 
                <div className='auth-input'>
                  <label for='email'>Email:</label>
                  <input required type="text" name='email' onChange={handleChange} />
                </div>
                <div className='auth-input'>
                  <label for='avatarURL'>Avatar Link:</label>
                  <input required type="text" name='avatarURL' onChange={handleChange}/>
                </div>
                <div className='auth-input'>
                  <label for='password'>Password:</label>
                  <input required type="password" name='password' onChange={handleChange}/>
                </div>
            <button type='submit' className='btn-submit'>SIGN UP</button>
          </form>
  )
}

export default Auth