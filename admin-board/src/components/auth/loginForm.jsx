const LoginFrom = ({ user, handleLogin, handleChange }) => {
  return (
    <div className="flex flex-col w-[30.9rem] gap-6">
      <div className="flex flex-col w-full gap-1">
        <label>Username</label>
        <input
          type="text"
          name="user_name"
          className="w-full h-[2.75rem] text-lg p-4 rounded-md text-black"
          value={user.user_name}
          onChange={handleChange}
        />
      </div>{' '}
      <div className="flex flex-col w-full gap-1">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="w-full  h-[2.75rem] text-lg p-4 rounded-md text-black"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <button
        className="w-full h-[2.75rem] text-black bg-b-light-blue rounded-md hover:bg-b-active-blue hover:text-white font-[500] text-lg"
        onClick={handleLogin}
      >
        Sign in
      </button>
    </div>
  )
}

export default LoginFrom
