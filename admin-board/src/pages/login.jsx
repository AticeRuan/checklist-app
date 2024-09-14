import LoginFrom from '../components/auth/loginForm'
import { useState } from 'react'
import { useLoginUserMutation } from '../app/api/userApi'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/ui/loading'
import Error from '../components/ui/error'

const Login = () => {
  const [user, setUser] = useState({ user_name: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const [loginUser, { isLoading, error }] = useLoginUserMutation()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = user

    try {
      const loggedInUser = await loginUser(data).unwrap()

      if (loggedInUser && loggedInUser.token) {
        localStorage.setItem('token', loggedInUser.token)
        localStorage.setItem('refreshToken', loggedInUser.refreshToken)
        dispatch(login(loggedInUser))

        navigate('/')
      } else {
        console.error('Login failed: No token received')
      }
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  if (isLoading)
    return (
      <div>
        <Loading text="Logging in..." />
      </div>
    )

  if (error) {
    return <Error text="Failed to login, refresh and try again" />
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-b-mid-blue text-white flex-col gap-8 z-[55] ">
      <div className="flex flex-col items-start w-[30.9rem] gap-[1.5rem]">
        <div className="flex flex-col items-start w-[30.9rem] gap-1">
          <h1 className="text-[2.215rem] font-bold w-full">
            ListSync Admin Console
          </h1>
          <p>Powered by Ballnace</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-[1.51rem]">Sign in</p>
          <p>listsync.ballance.co.nz</p>
        </div>
      </div>

      <LoginFrom
        user={user}
        handleChange={handleChange}
        handleLogin={handleLogin}
      />
    </div>
  )
}

export default Login
