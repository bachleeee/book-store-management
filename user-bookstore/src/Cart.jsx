import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './components/CartItem';
import UserService from './service/user.service';
import { useSelector } from 'react-redux';
const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  // Sử dụng useSelector để lấy trạng thái từ Redux store
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    getUserCart();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getUserCart = async () => {
    const token = user.token
    try {
      if (isLoggedIn) {
        const userCart = await UserService.getCart(token);
        setCartProducts(userCart);
      } else {
        console.error('User is not logged in.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      const token = user.token

      const result = {
        total: totalAmount()
      }

      if (isLoggedIn) {
        await UserService.crateOrder(token, result);
        setShowAddToCartMessage(true);
      }

      if (showAddToCartMessage) {
        window.alert("Đặt hàng thành công");
        window.location.href = '/order';
      }
    } catch (error) {
      console.log(error)
    }
  };

  const totalAmount = () => {
    return cartProducts.reduce((total, product) => {
      return total + product.products[0].price * product.products[0].count;
    }, 0);
  };

  return (
    <div className="page py-5">
      <div className="container">
        <div className="col-12">
          <div className="row d-flex align-items-center">
            <div className="col-9">
              <h2>Thông tin giỏ hàng</h2>
            </div>
            <div className="col-3">
              <Link to="/order">
                <h4>Kiểm tra đơn hàng</h4>
              </Link>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12">
              {cartProducts.map(product => (
                <CartItem key={product._id} product={product} />
              ))}
            </div>
          </div>
          {isLoggedIn && (
            <div className="d-flex justify-content-end m-5">
              <div className="total-amount">
                <h3>Tổng tiền: {formatCurrency(totalAmount())}</h3>
                <div onClick={createOrder} className="btn btn-primary">
                  Đặt hàng
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
