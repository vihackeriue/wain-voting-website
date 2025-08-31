import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from "react-bootstrap";

const initialUsers = [
    { id: 1, username: "uservi", fullname: "Nguyen Van Vi", email: "urykaydj@gmail.com", phone: "0766579459", status: "Đang sử dụng" },
    { id: 2, username: "user1", fullname: "User One", email: "user1@example.com", phone: "1234567890", status: "Đang sử dụng" },
    { id: 3, username: "user2", fullname: "User Two", email: "user2@example.com", phone: "2345678901", status: "Đang sử dụng" },
    { id: 4, username: "user4", fullname: "User Four", email: "user4@example.com", phone: "4567890123", status: "Đang sử dụng" },
    { id: 5, username: "user6", fullname: "User Six", email: "user6@example.com", phone: "6789012345", status: "Đang sử dụng" },
    { id: 6, username: "user8", fullname: "User Eight", email: "user8@example.com", phone: "8901234567", status: "Đang sử dụng" },
    { id: 7, username: "user10", fullname: "User Ten", email: "user10@example.com", phone: "0123456789", status: "Đang sử dụng" },
];

const UserManagementPage = () => {
    const [users, setUsers] = useState(initialUsers);

    const toggleLock = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        status: user.status === "Đang sử dụng" ? "Đang khóa" : "Đang sử dụng",
                    }
                    : user
            )
        );
    };

    return (
        <div className="container mt-4">
            <h3>Danh sách người dùng</h3>
            <Table striped bordered hover>
                <thead className="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Tên Đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td style={{ color: user.status === "Đang sử dụng" ? "green" : "red" }}>
                                {user.status}
                            </td>
                            <td>
                                <Button
                                    variant={user.status === "Đang sử dụng" ? "danger" : "success"}
                                    size="sm"
                                    onClick={() => toggleLock(user.id)}
                                >
                                    {user.status === "Đang sử dụng" ? "Khóa" : "Mở khóa"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default UserManagementPage;