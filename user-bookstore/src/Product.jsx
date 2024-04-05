import React, { useState, useEffect } from 'react';
import ProductService from "./service/product.service";
import ProductList from './components/ProductList';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        try {
            const fetchedProducts = await ProductService.getAll();
            setProducts(fetchedProducts);
            sortByPrice('asc', fetchedProducts);
        } catch (error) {
            console.log(error);
        }
    };

    const increasePage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const decreasePage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const sortByPrice = (order, products) => {
        const sorted = [...products].sort((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
        setSortedProducts(sorted);
    };

    const sortBySale = (order, products) => {
        const sorted = [...products].sort((a, b) => {
            const quantityA = a.quantity;
            const quantityB = b.quantity;
            return order === 'asc' ? quantityA - quantityB : quantityB - quantityA;
        });
        setSortedProducts(sorted);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="btn-group">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => sortByPrice('asc', products)}>Giá thấp đến cao</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => sortByPrice('desc', products)}>Giá cao đến thấp</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => sortBySale('desc', products)}>Sách bán chạy</button>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        {products.map((product, index) => (
                            <div key={index}>
                                <ProductList product={product} key={product._id} />
                            </div>
                        ))}
                    </div>

                    <div className="m-3 d-flex justify-content-around">
                        <button className="btn btn-sm" onClick={decreasePage} disabled={currentPage === 1}>
                            <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
                        </button>
                        <div>
                            <h5>{currentPage}</h5>
                        </div>
                        <button className="btn btn-sm" onClick={increasePage}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
