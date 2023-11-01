import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchOrders } from '../../redux/slices/products/ordersSlice'
import { fetchUsers } from '../../redux/slices/products/usersSlice'
import { fetchProductItem } from '../../redux/slices/products/productsSlice'

const ListOrders = () => {
  const { orders } = useSelector((state: RootState) => state.orderReducer)
  const { users } = useSelector((state: RootState) => state.userReducer)
  const { items } = useSelector((state: RootState) => state.productsReducer)

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [showOrders, setshowOrders] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrders())
        await dispatch(fetchUsers())
        await dispatch(fetchProductItem())
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [dispatch])

  const findProductByOrder = (productId: number) => {
    const findProduct = items.find((item) => item.id === productId)
    if (findProduct) {
      return (
        <div className="table-cell">
          <img src={findProduct.image} alt={findProduct.name} width={50} />
          <p className="table-cell">{findProduct.name}</p>
        </div>
      )
    } else {
      return 'none'
    }
  }

  const findUserByOrder = (userId: number) => {
    const findUser = users.find((user) => user.id === userId)
    if (findUser) {
      return (
        <div>
          <p className="table-cell">
            {findUser.firstName} {findUser.lastName}
          </p>
          <p className="table-cell">{findUser.email}</p>
        </div>
      )
    } else {
      return 'none'
    }
  }

  const findOrdersByUserId = (id: number) => {
    const findOrders = orders.filter(({ userId }) => userId === id)

    if (findOrders.length > 0) {
      return findOrders.map((order) => (
        <div key={order.id} className="table-row">
          {findProductByOrder(order.productId)}
          <p className="table-cell">{order.purchasedAt}</p>
          {findUserByOrder(order.userId)}
        </div>
      ))
    }
  }

  return (
    <div className="admin-content">
      <h2 className="h2">orders</h2>
      <div className="button-container">
        <button onClick={() => setshowOrders(false)}>All Orders</button>
        <button onClick={() => setshowOrders(true)}>Orders by User</button>
      </div>

      <div className="flex-tables">
        <div className="table-container">
          {!showOrders &&
            orders.map((order) => (
              <div key={order.id} className="table-row">
                {findProductByOrder(order.productId)}
                <p className="table-cell">{order.purchasedAt}</p>
                {findUserByOrder(order.userId)}
              </div>
            ))}
          {showOrders &&
            users.map(({ id, firstName, lastName, email }) => (
              <div
                key={id}
                style={{ cursor: 'pointer' }}
                className="table-row"
                onClick={() => setSelectedUserId(id)}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>{email}</p>
              </div>
            ))}
        </div>

        {showOrders && selectedUserId !== null && (
          <div className="table-container">{findOrdersByUserId(selectedUserId)}</div>
        )}
      </div>
    </div>
  )
}

export default ListOrders
