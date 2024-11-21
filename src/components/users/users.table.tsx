import { Button, Modal, Table } from "antd";
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

    useEffect(() => {
        //update
        console.log(">>> check useEffect");
        getData();
    }, []);

    const getData = async () => {
        const access_token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjczNDVjZWNhNjg5ZjQ5MThhY2JiYTlkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MzIxNzM3MzQsImV4cCI6MTgxODU3MzczNH0.RVeaDjkeDTjDqCqNX54h9GyPO2eD8TXOEaayaiV-JKU";

        const res = await fetch("http://localhost:8000/api/v1/users/all", {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });

        const d = await res.json();
        setListUsers(d.data.result);
    };

    console.log(">>> check render listUsers: ", listUsers); //mounting
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
                        onClick={showModal}
                    >
                        Add new
                    </Button>
                </div>
            </div>
            <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};
export default UsersTable;
