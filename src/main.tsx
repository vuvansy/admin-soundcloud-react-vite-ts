import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import UsersPage from "./screens/users.page.tsx";

import {
    createBrowserRouter,
    Link,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { TeamOutlined, FireOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
    {
        label: <Link to={"/"}>Home</Link>,
        key: "home",
        icon: <FireOutlined />,
    },
    {
        label: <Link to="/users">Manage Users</Link>,
        key: "users",
        icon: <TeamOutlined />,
    },
];

const Header = () => {
    const [current, setCurrent] = useState("home");
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

const LayoutAdmin = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <App /> },
            {
                path: "users",
                element: <UsersPage />,
            },
        ],
    },

    {
        path: "/tracks",
        element: <div>Manage tracks</div>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
