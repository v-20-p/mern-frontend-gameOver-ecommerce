import  { useEffect, useState } from 'react'

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
        <div>
          <img src={findProduct.image} alt={findProduct.name} width={50} />
          <p>{findProduct.name}</p>
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
          <p>
            {findUser.firstName} {findUser.lastName}
          </p>
          <p>email : {findUser.email}</p>
        </div>
      )
    } else {
      return 'none'
    }
  }

  const findOrdersByUserId = (id: number) => {
    const findOrders = orders.filter(({ userId }) => userId == id)

    if (findOrders.length > 0) {
      return findOrders.map((order) => (
        <div key={order.id}>
          <div>{findProductByOrder(order.productId)}</div>
          <p>{order.purchasedAt}</p>
          <div>{findUserByOrder(order.userId)} </div>
        </div>
      ))
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setshowOrders(false)}>all orders</button>

        <button onClick={() => setshowOrders(true)}>orders by user</button>
      </div>

      <div>
        {!showOrders &&
          orders.map((order) => (
            <div key={order.id}>
              <div>{findProductByOrder(order.productId)}</div>
              <p>{order.purchasedAt}</p>
              <div>{findUserByOrder(order.userId)} </div>
            </div>
          ))}
        {showOrders &&
          users.map(({ id, firstName, lastName, email }) => (
            <div key={id} style={{ cursor: 'pointer' }} onClick={() => setSelectedUserId(id)}>
              <p>
                {firstName} {lastName}
              </p>
              <p>email : {email}</p>
            </div>
          ))}

        <div>{showOrders && selectedUserId !== null && findOrdersByUserId(selectedUserId)}</div>
      </div>
    </div>
  )
}

export default ListOrders
