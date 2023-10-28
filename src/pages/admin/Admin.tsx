import React from 'react'
import ManageProducts from './ManageProducts'
import ManageCategories from './ManageCategories';
import ManageUsers from './ManageUsers';
import { Link ,BrowserRouter , Routes , Route, Outlet } from 'react-router-dom';
import ListOrders from './ListOrders';



function Admin() {



  return (
    <div>
        {/* <ManageProducts/> */}
        {/* <ManageCategories/> */}
   
     
  
            <ul>
              <li>
                <Link to='/dashboard/admin/users'>users</Link>
              </li>
              <li>
                <Link to='/dashboard/admin/categories'>categories</Link>
              </li>
              <li>
                <Link to='/dashboard/admin/products'>products</Link>
              </li>
              <li>
                <Link to='/dashboard/admin/orders'>orders</Link>
              </li>
            </ul>
            <Outlet/>
        {/* <ManageUsers/> */}
    </div>
  )
}

export default Admin