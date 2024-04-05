import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UserForm from '@/components/UserForm';
import UserService from '@/services/user.service';

const EditUser = () => {
    const { id } = useParams();
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const getUser = async (id) => {
        try {
            const fetchedUser = await UserService.get(id);
            setUser(fetchedUser);
        } catch (error) {
            console.log(error);
            // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
            history.push(`/notfound${history.location.pathname}`);
        }
    };

    const updateUser = async (data) => {
        try {
            await UserService.update(user._id, data);
            window.alert("Sản phẩm được cập nhật thành công.");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async () => {
        if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
            try {
                await UserService.delete(user._id);
                history.push('/user');
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getUser(id);
        setMessage('');
    }, [id]);

    return (
        <div className="container mt-4 d-flex flex-column align-items-center">
            {user && (
                <>
                    <h4>Hiệu chỉnh người dùng</h4>
                    <UserForm user={user} onSubmit={updateUser} onDelete={deleteUser} />
                    <p>{message}</p>
                </>
            )}
        </div>
    );
};

export default EditUser;
