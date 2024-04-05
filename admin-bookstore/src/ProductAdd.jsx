import React, { useState } from 'react';
import ProductForm from '@/components/ProductForm';
import ProductService from '@/services/product.service';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        img: '',
    });
    const [message, setMessage] = useState('');

    const createProduct = async (data) => {
        try {
            await ProductService.create(data);
            window.alert("Sản phẩm được thêm thành công.");
            setTimeout(() => {
                // Redirect to 'product' page after 2 seconds
                // You need to implement the routing logic using react-router-dom
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="m-5 d-flex flex-column align-items-center">
            <h4>Thêm sản phẩm mới</h4>
            <ProductForm product={product} onSubmit={createProduct} />
            <p>{message}</p>
        </div>
    );
};

export default AddProduct;
