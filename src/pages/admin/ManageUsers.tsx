import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deleteUser, fetchUsers, userIsban } from '../../redux/slices/products/usersSlice'

const ManageUsers = () => {
  const { users } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>()
  
  const handleBan = (id: string) => {
    const editedbanuser = users.find((user) => user._id == id)
  
    if (editedbanuser) {
      dispatch(userIsban(String(editedbanuser._id)))
      dispatch(fetchUsers())
   
    }
  }
  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
    dispatch(fetchUsers())
  }
  return (
    <div className="admin-content">
      <div>
        <h2 className="h2">Users</h2>
        <div className="table">
          <div className="table-header">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p>User is Ban</p>
            <p>Actions 1</p>
            <p>Actions 2</p>
          </div>
          {users.map((user) => (
            <div key={user._id} className="table-row">
              <p>
                {user.name} 
              </p>
              <p style={{ maxWidth: '13.5vw' }}>{user.email}</p>
              <p>{user.isAdmin}</p>
              <p>{user.isBan ? 'Yes' : 'No'}</p>

              <p
                style={{ color: 'darkblue', cursor: 'pointer' }}
                onClick={() => handleBan(String(user._id))}>
                {user.isBan ? 'Unban' : 'Ban'}
              </p>
              <p style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(String(user._id))}>
                Delete
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
