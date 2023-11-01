

import { Link, Outlet } from 'react-router-dom'
import NavAll from './../homePage/NavAll';

function Admin() {
  return (
    <>
    <NavAll/>
    <div className='admin'>
    <div className='admin-nav'>
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
        <li>
          <Link to="/">home</Link>
        </li>
      </ul>
     
    </div>
    <Outlet />
    
    </div>
    </>
  )
}

export default Admin
