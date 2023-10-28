import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, removeUser, updateUserBan } from '../../redux/slices/products/usersSlice'

const ManageUsers = () => {
  const { users } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleBan = (id: number) => {
    const editedbanuser = users.find((user) => user.id == id)
    if (editedbanuser) {
      dispatch(updateUserBan(editedbanuser))
    }
  }
  const handleDelete = (id: number) => {
    dispatch(removeUser({ userId: id }))
  }
  return (
    <div>
      <h1>users</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h3>
              name : {user.firstName} {user.lastName}
            </h3>
            <p>email : {user.email}</p>
            <p>role : {user.role}</p>
            <p>user is ban : {user.ban ? 'yes' : 'no'}</p>
            <button onClick={() => handleBan(user.id)}>{user.ban ? 'unban' : 'ban'}</button>
            <button onClick={() => handleDelete(user.id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageUsers
