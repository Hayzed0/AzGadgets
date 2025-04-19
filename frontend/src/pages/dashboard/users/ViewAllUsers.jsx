import React, { useEffect, useState } from 'react'
import api from '../../../config/api'
import Loader from '../../../components/Loader'

const ViewAllUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getAllUsers = async() => {
      try {
        setLoading(true)
        const res = await api.get("/api/user/get-all-users", {
          headers: {
            Authorization: `Bearers ${token}`
          }
        })
        const resData = res.data
        setUsers(resData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error.message)
      }
    }
    getAllUsers()
  }, [])

  
  return (
      <div className="w-full p-4">
          <h1 className="text-2xl font-bold mb-4">All Users</h1>
    
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-center text-red-500">Failed to load orders.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded shadow-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">User Id</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">FullName</th>
                    <th className="px-4 py-2 border">Admin Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{user._id}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.isAdmin === true ? "An Admin" : "Not Admin"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  )
}

export default ViewAllUsers