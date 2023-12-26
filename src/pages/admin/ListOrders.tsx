import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deleteOrder, fetchOrders } from '../../redux/slices/products/ordersSlice'
import { fetchUsers } from '../../redux/slices/products/usersSlice'
import { fetchProductItem } from '../../redux/slices/products/productsSlice'

const ListOrders = () => {
  const { orders } = useSelector((state: RootState) => state.orderReducer)
  const { users } = useSelector((state: RootState) => state.userReducer)
  // const { items } = useSelector((state: RootState) => state.productsReducer)

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [showOrders, setshowOrders] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrders())
        await dispatch(fetchUsers())
        // await dispatch(fetchProductItem({}))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [dispatch])

  const handleDelete = (id: string) => {
    dispatch(deleteOrder(id))
  }

  const findProductByOrder = (orderId: string) => {
    const findOrder = orders.find((order) => order._id == orderId)
    if (findOrder) {
      return (
        <div className="table-cell">
          {findOrder.products.map(({ product, quantity }) => (
            <div key={product?._id} className="order-content">
              {product ? (
                <>
                  <span>{product.title}</span>
                  <p>
                    <span>quantity: {quantity}</span>
                    <span>price: ${product.price}</span>
                  </p>
                </>
              ) : (
                <h5>the product not found or deleted</h5>
              )}
            </div>
          ))}
        </div>
      )
    }
  }

  const findUserByOrder = (userId: string) => {
    const findUser = users.find((user) => user._id === userId)
    console.log(users, userId)
    if (findUser) {
      return (
        <div>
          <p className="table-cell">
            {findUser.name} {'@' + findUser.userName}
          </p>
          <p className="table-cell">{findUser.email}</p>
        </div>
      )
    } else {
      return (
        <div>
          <p className="table-cell">user is deleted</p>
        </div>
      )
    }
  }

  const findOrdersByUserId = (id: string) => {
    const findOrders = orders.filter(({ user }) => user === id)

    if (findOrders.length > 0) {
      return findOrders.map((order) => (
        <div key={order._id} className="table-row">
          {findProductByOrder(String(order._id))}
          <div className="table-cell">
            <p className="order-content">total pricee: {order.totalPriceOfOrder}</p>
            <p className="order-content">{order.createdAt.slice(0, 10)}</p>
          </div>
          {findUserByOrder(order.user)}
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
              <div key={order._id} className="table-row">
                {findProductByOrder(String(order._id))}
                <div className="table-cell" style={{ display: 'block' }}>
                  <p>
                    the total price is ${order.totalPriceOfOrder} <br />
                    <br /> Purchase at {order.createdAt
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}{' '}
                  </p>
                </div>
                {findUserByOrder(order.user)}
                <button onClick={() => handleDelete(String(order._id))} className="delete2">
                  delete
                </button>
              </div>
            ))}

          {showOrders &&
            users.map(({ _id, name, userName, email }) => (
              <div
                key={_id}
                className="table-row"
                style={{ width: !selectedUserId ? '1000px' : '100%', cursor: 'pointer' }}
                onClick={() => setSelectedUserId(String(_id))}>
                <p>name {name}</p>
                <p>username {'@' + userName}</p>
                <p>email {email}</p>
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
