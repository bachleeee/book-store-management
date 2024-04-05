import React, { useEffect, useState } from 'react';
import ProductService from './service/product.service';
// import ProductList from './components/ProductList';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const maxVisibleProducts = 8;
    
    useEffect(() => {
        const getHomeProduct = async () => {
            try {
                const fetchedProducts = await ProductService.getAllCat("van-hoc");
                setProducts(fetchedProducts);
                updateVisibleProducts(fetchedProducts);
            } catch (error) {
                console.log(error);
            }
        };
        getHomeProduct();
    }, []);

    const updateVisibleProducts = (products) => {
        setVisibleProducts(products.slice(0, maxVisibleProducts));
    };

    return (
        <div className="page">
            <div className="container py-3">
                <div className="row">
                    
                    <div className="col-4">
                        <img src="../assets/img/banner/4.png" alt="" />
                        <img src="../assets/img/banner/5.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="intro-section">
                    <div className="top-title p-3">
                        <h5>Danh mục sản phẩm</h5>
                    </div>
                    <div className="content">
                        <div className="row mx-4">
                            {/* Render danh mục sản phẩm */}
                        </div>
                    </div>
                </div>
                <div className="home-section">
                    <div className="top-title p-3">
                        <h5>Sách bán chạy</h5>
                    </div>
                    <div className="content">
                        <div className="row d-flex justify-content-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
