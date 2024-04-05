import React from 'react';
import OrderService from '../service/order.service';

const OrderList = ({ orders, activeIndex, setActiveIndex }) => {
    const updateActiveIndex = (index) => {
        setActiveIndex(index);
    };

    const deleteOrder = async (index, orderId) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
            if (!confirmDelete) {
                return;
            }
            await OrderService.delete(orderId);
            orders.splice(index, 1);
            setActiveIndex(-1);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const modifyOrder = (index, orderId) => {
        // Redirect to 'order.edit' route with id parameter
        // You need to implement the routing logic using react-router-dom
    };

    const formatCategory = (category) => {
        switch (category) {
            case 'van-hoc':
                return 'Văn học';
            case 'tam-ly-hoc':
                return 'Tâm lý học';
            case 'kinh-te':
                return 'Kinh tế';
            case 'ngoai-ngu':
                return 'Ngoại ngữ';
            default:
                return category;
        }
    };

    const formatCurrency = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);

        return `${formattedPrice}`;
    };

    return (
        <ul className="list-group">
            {orders.map((order, index) => (
                <li key={order._id} className={`list-group-item ${index === activeIndex ? 'active' : ''}`} onClick={() => updateActiveIndex(index)}>
                    <div className="col-5 order-name">{order.orderby}</div>
                    <div className="col-2 order-category">{order.amount}</div>
                    <div className="col-2 order-price">{order.orderStatus}</div>
                    <div className="col-1">
                        <i className="fa-solid fa-trash delete-icon mr-3" onClick={() => deleteOrder(index, order._id)}></i>
                        <i className="fa-solid fa-pen modify-icon" onClick={() => modifyOrder(index, order._id)}></i>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
