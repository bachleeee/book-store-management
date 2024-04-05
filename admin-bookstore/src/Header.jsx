import React from 'react';
import { Link } from 'react-router-dom';
import UserService from './service/user.service';
import { useSelector, useDispatch } from 'react-redux';
const Sidebar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const logoutClick = () => {
    // const shouldLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');

    // if (shouldLogout) {
    //   authStore.logout();
    // }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="../assets/img/mybookstrore (1).png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/product">
              <i className="fas fa-box"></i> Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link to="/user">
              <i className="fas fa-users"></i> Quản lý khách hàng
            </Link>
          </li>
          <li>
            <Link to="/order">
              <i className="fas fa-shopping-cart"></i> Quản lý đơn hàng
            </Link>
          </li>
        </ul>
      </nav>
      {isLoggedIn && (
        <div className="ml-2 logout-button">
          <button className="btn btn-secondary mb-5 ml-5" onClick={logoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
