import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook từ react-redux
import ProductService from './service/product.service';
import UserService from './service/user.service';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [maxQuantityExceeded, setMaxQuantityExceeded] = useState(false);
  const { slug } = useParams();
  
  // Sử dụng useSelector để lấy trạng thái từ Redux store
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await ProductService.getBySlug(slug);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product details:', error);
        if (error.response && error.response.status === 404) {
          console.error('Product not found (404).');
        }
      }
    };

    getProduct();
  }, [slug]);

  const formatCurrency = (price) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);

    return formattedPrice;
  };

  const addToCart = async () => {
    try {
      const cookieValue = Cookies.get('token');

      const cartItem = {
        _id: product._id,
        count: quantity,
      };

      const newCartItemArray = { cart: [cartItem] };

      if (isLoggedIn) {
        if (quantity > product.quantity) {
          setMaxQuantityExceeded(true);
        } else {
          await UserService.addtocart(cookieValue, newCartItemArray);
          setShowAddToCartMessage(true);
        }
      }

      if (maxQuantityExceeded) {
        window.alert("Quá số lượng sản phẩm");
        window.location.reload();
      } else if (showAddToCartMessage) {
        window.alert("Đã thêm sản phẩm vào giỏ hàng");
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-4">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img src={product.img} style={{ width: '370px' }} alt="" />
            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                className={`btn btn-danger btn-lg ${product.quantity <= 0 || !isLoggedIn ? 'btn-disabled' : ''}`}
                disabled={product.quantity <= 0 || !isLoggedIn}
                onClick={addToCart}
              >
                {isLoggedIn ? 'Thêm vào giỏ hàng' : 'Đăng nhập để Thêm vào giỏ hàng'}
              </button>
            </div>
          </div>
          <div className="col-7">
            <h1>{product.name}</h1>
            <p className="status">Tình trạng: {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</p>
            <p className="nxb">Nhà xuất bản: Nhà xuất bản trẻ</p>
            <div className="d-flex justify-content-between my-4 ">
              <p className="price">{formatCurrency(product.price)}</p>
            </div>
            <div>
              <label htmlFor="quantity">Số lượng:</label>
              <input className="quantity-input" type="number" id="quantity" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="home-section mt-4">
          <div className="home-book">
            <div className="top-title p-3">
              <div className="row">
                <div className="col-2">
                  <p className="des">Mô tả</p>
                </div>
              </div>
            </div>
            <div className="content">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
