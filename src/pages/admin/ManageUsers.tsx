import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, removeUser, updateUserBan } from '../../redux/slices/products/usersSlice'

const ManageUsers = () => {
  const { users } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>()

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
    <div className="admin-content">
      <div>
        <h2 className='h2'>Users</h2>
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
            <div key={user.id} className="table-row">
              <p >
                {user.firstName} {user.lastName}
              </p>
              <p style={{maxWidth:"13.5vw"}}>{user.email}</p>
              <p>{user.role}</p>
              <p>{user.ban ? 'Yes' : 'No'}</p>
             
                <p style={{color:'darkblue',cursor:'pointer'}} onClick={() => handleBan(user.id)}>{user.ban ? 'Unban' : 'Ban'}</p>
                <p style={{color:'red',cursor:'pointer'}} onClick={() => handleDelete(user.id)}>Delete</p>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
