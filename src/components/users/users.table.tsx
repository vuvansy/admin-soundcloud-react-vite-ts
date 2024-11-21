import { Button, Input, Modal, notification, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string;
}

const UsersTable = () => {
    const [listUsers, setListUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjczNDVjZWNhNjg5ZjQ5MThhY2JiYTlkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MzIxNzM3MzQsImV4cCI6MTgxODU3MzczNH0.RVeaDjkeDTjDqCqNX54h9GyPO2eD8TXOEaayaiV-JKU";

    useEffect(() => {
        //update
        console.log(">>> check useEffect");
        getData();
    }, []);

    const getData = async () => {
        const res = await fetch("http://localhost:8000/api/v1/users/all", {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });

        const d = await res.json();
        setListUsers(d.data.result);
    };

    const columns: ColumnsType<IUsers> = [
        {
            title: "Email",
            dataIndex: "email",
            render: (value, record) => {
                // console.log(record);
                return <div>{record.email}</div>;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            //Tên của dataIndex chính là thuộc tính của biến Object truyền vào nó tự dộng mapping giá trị
        },
        {
            title: "Gender",
            dataIndex: "gender",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Role",
            dataIndex: "role",
        },
    ];

    const handleOk = async () => {
        const data = {
            name,
            email,
            password,
            age,
            gender,
            role,
            address,
        };

        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });

        const d = await res.json();
        if (d.data) {
            //success
            await getData();
            await getData();
            notification.success({
                message: "Tạo mới user thành công.",
            });

            handleCloseCreateModal();
        } else {
            ///
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message),
            });
        }
        console.log(d);
    };

    const handleCloseCreateModal = () => {
        setIsModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h2>Table Users</h2>
                <div>
                    <Button
                        icon={<PlusOutlined />}
                        type={"primary"}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add new
                    </Button>
                </div>
            </div>
            <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

            <Modal
                title="Add new user"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false} //Click ra ngoài modal không đóng
            >
                <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <Input
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <Input
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <Input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <Input
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
            </Modal>
        </>
    );
};
export default UsersTable;
