import { useState } from 'react'
import { Tick } from '../components/svg/tick'
import Cancel from '../components/svg/cancel'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useChangePasswordMutation } from '../app/api/userApi'
import Loading from '../components/ui/loading'
import Error from '../components/ui/error'
const User = () => {
  const user = useSelector((state) => state.auth.user)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    minLowercase: false,
    minUppercase: false,
    minNumbers: false,
    minSymbols: false,
  })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [changePassword, { isLoading, isError }] = useChangePasswordMutation()

  useEffect(() => {
    const checkPasswordMatch = () => {
      setPasswordsMatch(newPassword === confirmPassword)
    }
    validatePassword(newPassword)

    checkPasswordMatch()
  }, [newPassword, confirmPassword])

  const validatePassword = (password) => {
    setPasswordStrength({
      minLength: password.length >= 8,
      minLowercase: /[a-z]/.test(password),
      minUppercase: /[A-Z]/.test(password),
      minNumbers: /[0-9]/.test(password),
      minSymbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate that user.name is defined
    if (!user.name) {
      console.error('User name is missing or undefined')
      setIsSubmitting(false)
      return
    }
    const data = {
      user_name: user.name,
      password: currentPassword,
      newPassword: newPassword,
    }

    try {
      const response = await changePassword(data).unwrap()

      if (response.error) {
        alert('Error changing password:', response.error.data.message)

        return
      }
      console.log('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      alert(
        'Error changing password:',
        error.data.message || 'Failed to change password. Please try again',
      )
      console.log(error.data?.message)
      console.error('Error changing password:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  if (isLoading) return <Loading text="Changing Password..." />
  if (isError)
    return <Error text="Error Changing Password, refresh and try again" />

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1rem] mb-5">
        Hi {user?.name}
      </h1>
      <h2 className="text-xl flex items-center rounded-xl p-3 bg-b-light-blue">
        <span className="bg-b-dark-green p-1 uppercase  text-white text-sm rounded-tr-lg rounded-br-lg font-bold">
          Role
        </span>
        <span className="ml-1 font-bold capitalize"> {user?.role}</span>
      </h2>
      <div className="flex-1 p-8 w-full flex items-center flex-col">
        <h1 className="text-2xl font-bold mb-6 uppercase text-b-active-blue">
          Change Password
        </h1>
        <div className=" text-card-foreground rounded-lg shadow-sm p-6 w-[32rem] mx-auto">
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <div className="space-y-4">
              <div className="flex flex-col w-full">
                <label htmlFor="currentPassword" className="text-lg ">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="border-2 border-b-light-blue p-2 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-lg ">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="border-2 border-b-light-blue p-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-lg ">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-2 border-b-light-blue p-2 rounded-lg"
                />
                {!passwordsMatch && confirmPassword && (
                  <p className="text-destructive text-sm mt-1 text-b-orange tracking-wide font-bold ">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>
            <PasswordStrengthIndicator strength={passwordStrength} />
            <button
              type="submit"
              className="text-xl bg-b-active-blue w-full text-white p-2 rounded-lg disabled:bg-b-light-blue disabled:text-b-light-grey hover:bg-b-light-blue hover:text-b-deep-blue text-center"
              disabled={
                isSubmitting ||
                !passwordsMatch ||
                Object.values(passwordStrength).some((v) => !v)
              }
            >
              {isSubmitting ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default User
function PasswordStrengthIndicator({ strength }) {
  const criteria = [
    { key: 'minLength', text: 'At least 8 characters long' },
    { key: 'minLowercase', text: 'Contains a lowercase letter' },
    { key: 'minUppercase', text: 'Contains an uppercase letter' },
    { key: 'minNumbers', text: 'Contains a number' },
    { key: 'minSymbols', text: 'Contains a symbol' },
  ]

  return (
    <div className="my-5">
      <p className="text-sm font-medium  mb-1">Password must:</p>
      <ul className="text-sm ">
        {criteria.map(({ key, text }) => (
          <li
            key={key}
            className="flex items-center text-lg text-b-active-blue capitalize font"
          >
            {strength[key] ? <Tick width="23" /> : <Cancel width="23" />}
            <p className="ml-4"> {text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
