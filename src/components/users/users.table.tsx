import { Button, message, notification, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";

export interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string;
    address: string;
    gender: string;
    password: string;
    age: string;
}

const UsersTable = () => {
    const [listUsers, setListUsers] = useState([]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

    const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjczNDVjZWNhNjg5ZjQ5MThhY2JiYTlkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MzIxNzM3MzQsImV4cCI6MTgxODU3MzczNH0.RVeaDjkeDTjDqCqNX54h9GyPO2eD8TXOEaayaiV-JKU";

    useEffect(() => {
        //update
        getData();
    }, []);

    //Promise
    const getData = async () => {
        const res = await fetch("http://localhost:8000/api/v1/users/all", {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });

        const d = await res.json();

        if (!d.data) {
            notification.error({
                message: JSON.stringify(d.message),
            });
        }

        setListUsers(d.data.result);
    };

    const confirm = async (user: IUsers) => {
        // message.success("Click on Yes");
        const res = await fetch(
            `http://localhost:8000/api/v1/users/${user._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const d = await res.json();
        if (d.data) {
            notification.success({
                message: "Xóa user thành công.",
            });
            await getData();
        } else {
            notification.error({
                message: JSON.stringify(d.message),
            });
        }
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
        {
            title: "Actions",
            render: (value, record) => {
                return (
                    <div>
                        <Button
                            onClick={() => {
                                console.log(">>> check record: ", record);
                                setDataUpdate(record);
                                setIsUpdateModalOpen(true);
                            }}
                        >
                            <EditOutlined />
                        </Button>

                        <Popconfirm
                            placement="topLeft"
                            title="Delete the user"
                            description={`Are you sure to delete this user. name = ${record.name}?`}
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={{ marginLeft: 20 }} danger>
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

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
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Add new
                    </Button>
                </div>
            </div>
            <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateUserModal
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
};
export default UsersTable;
