

import { Link, Outlet } from 'react-router-dom'

import ListOrders from './ListOrders'

function Admin() {
  return (
    <div>


      <ul>
        <li>
          <Link to="/dashboard/admin/users">users</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/categories">categories</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">orders</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default Admin
