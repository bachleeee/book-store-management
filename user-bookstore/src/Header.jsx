import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector từ react-redux
const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 
  const user = useSelector(state => state.auth.user); 

  return (
    <div className="header-wrapper">
      <div className="bot-header">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Link to="/" className="menu-item">
                <img src="../assets/img/mybookstrore (1).png" alt="logo" style={{ width: '240px' }} />
              </Link>
            </div>
            <div className="col-7">
              <div className="row">
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
                    <img src="../assets/ico_menu.svg" alt="" />
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link to="/product" className="dropdown-item">Văn học</Link>
                    <Link to="/tam-ly-hoc" className="dropdown-item">Tâm lý</Link>
                    <Link to="/van-hoc" className="dropdown-item">Tiểu thuyết</Link>
                    <Link to="/tam-ly-hoc" className="dropdown-item">Kinh tế</Link>
                  </div>
                </div>
                <form action="/search" method="GET" className="form-inline">
                  <div className="input-group">
                    <input type="text" name="name" className="form-control" style={{ width: '450px' }} placeholder="Bạn muốn tìm quà tặng..." />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-outline-danger">Tìm kiếm</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex justify-content-end">
                <div className="btn-click d-flex">
                  <Link to="/cart" className="btn-cart mr-2">
                    <i className="fa fa-shopping-cart"></i>
                    <p>Giỏ hàng</p>
                  </Link>
                  {isLoggedIn ? (
                    <div className="btn-user mr-2">
                      <i className="fa fa-user"></i>
                      <p>{user?.name}</p>
                    </div>
                  ) : (
                    <Link to="/login" className="btn-user mr-2">
                      <i className="fa fa-user"></i>
                      <p>Đăng nhập</p>
                    </Link>
                  )}
                  {isLoggedIn && (
                    <div className="ml-2">
                      <button className="btn btn-outline-danger" >Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
