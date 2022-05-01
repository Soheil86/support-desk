import axios from 'axios'

const API_URL = 'http://localhost:5000/'

// Register user
const register = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/users', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//LogOut User
const logout = () => localStorage.removeItem('user')

//LogIn User
const login = async (userData) => {
  const response = await axios.post(
    'http://localhost:5000/api/users/login/',
    userData
  )

  if (response.data) {
    console.log(response.data)
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const authService = { register, logout, login }

export default authService
