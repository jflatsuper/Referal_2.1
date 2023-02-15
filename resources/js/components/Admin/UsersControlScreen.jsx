import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
const UserManagementScreen = () => {
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    useEffect(() => {getUser()}, []);
    const getUser = async () => {
        axios.get(`/getTenUsers?page=${current}`).then((data) => {
            setTotal(data?.total);
            setCurrent((prev) => prev + 1);
            setUsers([...users]);
        });
    };
    return <div>This is it</div>;
};
export default UserManagementScreen;
if (document.getElementById("user_manage")) {
    const Index = ReactDOM.createRoot(document.getElementById("user_manage"));

    Index.render(
        <React.StrictMode>
            <UserManagementScreen />
        </React.StrictMode>
    );
}
