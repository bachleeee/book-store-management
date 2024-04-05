import React, { useState } from 'react';
import UserForm from '@/components/UserForm';
import UserService from '@/services/user.service';

const AddUser = () => {
    const [user, setUser] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        img: '',
    });
    const [message, setMessage] = useState('');

    const createUser = async (data) => {
        try {
            await UserService.create(data);
            window.alert("Sản phẩm được thêm thành công.");
            setTimeout(() => {
                // Redirect to 'user' page after 2 seconds
                // You need to implement the routing logic using react-router-dom
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="m-5 d-flex flex-column align-items-center">
            <h4>Thêm người dùng mới</h4>
            <UserForm user={user} onSubmit={createUser} />
            <p>{message}</p>
        </div>
    );
};

export default AddUser;
