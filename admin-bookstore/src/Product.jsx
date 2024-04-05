import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import ProductCard from '@/components/ProductCard';
import ProductList from './components/ProductList';
import ProductService from './service/product.service';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveProducts();
    }, []);

    useEffect(() => {
        setActiveIndex(-1);
    }, [searchText]);

    const soluong = products.reduce((total, product) => total + product.quantity, 0);

    const productStrings = products.map((product) => {
        const { name, category, description, price, quantity, img } = product;
        return [name, category, description, price, quantity, img].join("");
    });

    const filteredProducts = !searchText ? products : products.filter((_product, index) =>
        productStrings[index].includes(searchText)
    );

    const activeProduct = activeIndex < 0 ? null : filteredProducts[activeIndex];
    const filteredProductsCount = filteredProducts.length;

    const retrieveProducts = async () => {
        try {
            const fetchedProducts = await ProductService.getAll();
            setProducts(fetchedProducts);
            console.log(products)
        } catch (error) {
            console.log(error);
        }
    };

    const refreshList = () => {
        retrieveProducts();
        setActiveIndex(-1);
    };

    const removeAllProducts = async () => {
        if (window.confirm("Bạn muốn xóa tất cả sản phẩm?")) {
            try {
                await ProductService.deleteAll();
                refreshList();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const goToAddProduct = () => {
        // Redirect to add product page
    };

    return (
        <div className="container">
            <div className="page row my-3">
                <div className="col-md-12">
                    <h4 className="d-flex justify-content-center">
                        Danh sách sản phẩm
                        <i className="fa-solid fa-book"></i>
                    </h4>

                    <div className="d-flex justify-content-center mb-3">
                        <div className="col-5"><strong>Tên sản phẩm</strong></div>
                        <div className="col-2 mr-4"><strong>Thể loại</strong></div>
                        <div className="col-2"><strong>Giá</strong></div>
                        <div className="col-1"><strong>SL</strong></div>
                        <div className="col-1">
                            <button className="btn btn-sm btn-success" onClick={goToAddProduct}>
                                <i className="fas fa-plus"></i> Thêm
                            </button>
                        </div>
                    </div>

                    <ProductList products={filteredProducts} activeIndex={activeIndex} />

                    <p>{filteredProductsCount > 0 ? 'Không có sản phẩm.' : null}</p>

                    <div className="m-3 d-flex justify-content-around">
                        <button className="btn btn-sm btn-primary" onClick={refreshList}>
                            <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
                        </button>
                        <div>
                            <h3>{filteredProductsCount} /10</h3>
                        </div>
                        <button className="btn btn-sm btn-primary">
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                    <div className="mt-3 row justify-content-around align-items-center">
                        <button className="btn btn-sm btn-primary" onClick={refreshList}>
                            <i className="fas fa-redo"></i> Làm mới
                        </button>

                        <button className="btn btn-sm btn-danger" onClick={removeAllProducts}>
                            <i className="fas fa-trash"></i> Xóa tất cả
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductPage;
