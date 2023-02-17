import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useFormik } from "formik";
import dayjs from "dayjs";
import axios from "axios";
const acctypes = [
    { name: "Guest", value: "guest" },
    { name: "Vendor", value: "vendor" },
];
const UserManagementScreen = () => {
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    const getUser = () => {
        const val = axios.get(`/getTenUsers?page=${current}`).then((data) => {
            console.log(data);
            setTotal(data?.total);
            setCurrent((prev) => prev + 1);

            return data.data;
        });
        return val;
    };
    useEffect(() => {
        getUser().then((data) => setUsers([...users, ...data.data]));
    }, []);
    const blockUser = useCallback(() => {
        axios.post("/blockUser", {
            user: currentUser.id,
            status:
                currentUser.account_status === "blocked" ? "active" : "blocked",
        });
    }, [currentUser]);
    const changeUserType = useCallback((values) => {
        values.newtype &&
            values.user &&
            axios.post("/changeAccountType", values);
    }, []);
    const formikProps = useFormik({
        initialValues: {
            user: null,
            newtype: null,
        },
        onSubmit: (values) => {
            changeUserType(values);
            return true;
        },
        enableReinitialize: true,
    });
    return (
        <div className="mainSetting">
            <div
                className="rowItem"
                style={{ color: "orange", justifyContent: "space-between" }}
            >
                <div className="rowItem">
                    {" "}
                    <h3>User Managment</h3>
                </div>
            </div>

            <div
                style={{ display: "flex", overflow: "hidden" }}
                className="card rounded shadow-sm homelargecard "
            >
                <div
                    className="card-body"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ maxHeight: "85%" }}>
                        <h3>Users</h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "100%",
                                overflow: "scroll",
                            }}
                            className="py-4"
                        >
                            {[...users]?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        data-bs-toggle="modal"
                                        data-bs-target="#vendorModal"
                                        onClick={() => {
                                            setCurrentUser(item);
                                            formikProps.setFieldValue(
                                                "user",
                                                item.id
                                            );
                                        }}
                                        className="rowItem py-3 px-3 mb-3 rounded btn"
                                        style={{
                                            width: "100%",
                                            justifyContent: "space-between",
                                            backgroundColor: "#003366",
                                            color: "orange",
                                        }}
                                    >
                                        <div
                                            style={{ fontWeight: 500 }}
                                            className=""
                                        >
                                            {" "}
                                            {index + 1}
                                        </div>

                                        <div
                                            style={{ fontWeight: 500 }}
                                            className="maxWidth singleLine"
                                        >
                                            {" "}
                                            {item?.first_name} {item?.surname}
                                        </div>

                                        <div
                                            style={{ fontWeight: 500 }}
                                            className="maxWidth singleLine"
                                        >
                                            {" "}
                                            {item?.username}
                                        </div>
                                        <div
                                            style={{ fontWeight: 500 }}
                                            className="maxWidth singleLine"
                                        >
                                            {" "}
                                            {item?.user_type}
                                        </div>
                                        <div
                                            style={{ fontWeight: 500 }}
                                            className="maxWidth singleLine"
                                        >
                                            {" "}
                                            {item?.account_status}
                                        </div>
                                        {/* <div className="maxWidth singleLine">
                                    {" "}
                                    {item?.username}
                                </div> */}
                                        <div className="maxWidth singleLine">
                                            {dayjs(item?.created_at).fromNow()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade modal-xl "
                id="vendorModal"
                tabindex="-1"
                aria-labelledby="vendorModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen-md-down ">
                    <div
                        className="modal-content"
                        style={{
                            borderRadius: "16px",
                            color: "black",
                            backgroundColor: "lightgray",
                        }}
                    >
                        <div
                            className="modal-body p-3"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "40px",
                            }}
                        >
                            <div
                                className="rowItem"
                                style={{ justifyContent: "space-between" }}
                            >
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                                <div>
                                    <b>
                                        {currentUser?.first_name}{" "}
                                        {currentUser?.surname}
                                    </b>
                                </div>
                            </div>
                            <div>
                                <b> Username:</b> {currentUser?.username}
                            </div>
                            <div>
                                <div>
                                    <form>
                                        <button
                                            type="submit"
                                            onClick={blockUser}
                                        >
                                            {currentUser?.account_status ===
                                            "blocked"
                                                ? "Unblock User"
                                                : "Block User"}
                                        </button>
                                    </form>

                                    <div className="btn-group">
                                        <form>
                                            <button
                                                className="btn btn-danger dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Update Account
                                            </button>

                                            <div class="dropdown-menu">
                                                {acctypes?.map((item) => (
                                                    <a
                                                        key={item.id}
                                                        class="dropdown-item"
                                                        onClick={() =>
                                                            formikProps.setFieldValue(
                                                                "newtype",
                                                                item.value
                                                            )
                                                        }
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() =>
                                                    formikProps.handleSubmit()
                                                }
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                Update Account
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
