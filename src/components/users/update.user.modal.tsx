import { useEffect } from "react";
import { Modal, Input, notification, Form, Select, InputNumber } from "antd";
import { IUsers } from "./users.table";
const { Option } = Select;

interface IProps {
    access_token: string;
    getData: any;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: null | IUsers;
    setDataUpdate: any;
}
const UpdateUserModal = (props: IProps) => {
    const {
        access_token,
        getData,
        isUpdateModalOpen,
        setIsUpdateModalOpen,
        dataUpdate,
        setDataUpdate,
    } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            //code
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                age: dataUpdate.age,
                address: dataUpdate.address,
                role: dataUpdate.role,
                gender: dataUpdate.gender,
            });
        }
    }, [dataUpdate]);

    const onFinish = async (values: any) => {
        const { name, email, age, gender, role, address } = values;

        const data = {
            _id: dataUpdate?._id, //undefined
            name,
            email,
            age,
            gender,
            role,
            address,
        };

        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const d = await res.json();
        if (d.data) {
            //success
            await getData();
            notification.success({
                message: "Cập nhật User thành công.",
            });
            handleCloseCreateModal();
        } else {
            ///
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message),
            });
        }
    };

    const handleCloseCreateModal = () => {
        setIsUpdateModalOpen(false);
        form.resetFields();
        setDataUpdate(null); //Để khi mở mở lại user cũ vẫn tiếp tục bị thay đổi
    };

    return (
        <Modal
            title="Update a user"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
            width={"40vw"}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please input your name!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: dataUpdate ? false : true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password disabled={dataUpdate ? true : false} />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Age"
                    name="age"
                    rules={[
                        { required: true, message: "Please input your age!" },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please input your address!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 5 }}
                    name="gender"
                    label="Gender"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="MALE">male</Option>
                        <Option value="FEMALE">female</Option>
                        <Option value="OTHER">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 5 }}
                    name="role"
                    label="Role"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="USER">User</Option>
                        <Option value="ADMIN">Admin</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UpdateUserModal;
