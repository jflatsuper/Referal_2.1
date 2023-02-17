import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Plus from "../icons/plus";
import NotificationForm from "./forms/NotificationForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    useLayoutEffect(() => {
        axios("/getNotifications").then((data) => {
            console.log(data.data);
            setNotifications(data.data);
        });
    }, []);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
            <div
                className="rowItem"
                style={{
                    color: "orange",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h3 className="mb-0">Notifications</h3>

                <button
                    className="rowItem btn btn-link"
                    data-bs-toggle="modal"
                    type="button"
                    data-bs-target="#exampleModal"
                    style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "orange",
                    }}
                >
                    <Plus />
                    <div>New Notification</div>
                </button>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {notifications?.map((item) => {
                    return (
                        <div key={item.id} className="card bg-light  rowItem">
                            <div
                                className="card-body py-3 rowItem"
                                style={{
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                }}
                            >
                                <div style={{ color: "black" }}>
                                    <b>Created :</b>{" "}
                                    {dayjs(item.created_at).format(
                                        "DD/MM/YYYY"
                                    )}
                                </div>
                                <div style={{ color: "black" }}>
                                    <b> Title :</b> {item.title}
                                </div>

                                <div style={{ color: "black" }}>
                                    <b >
                                        Description:
                                    </b>{" "}
                                    {item?.description}
                                </div>
                                <div
                                style={{ color: "black" }}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    // title={
                                    //     item?.complete
                                    //         ? "Complete"
                                    //         : "In Progress"
                                    // }
                                >
                                    {item?.link}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div
                className="modal fade modal-xl "
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen-md-down ">
                    <div
                        className="modal-content"
                        style={{ borderRadius: "16px" }}
                    >
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add Product
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div> */}
                        <div className="modal-body px-0 py-0">
                            <NotificationForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NotificationScreen;
if (document.getElementById("notif")) {
    const Index = ReactDOM.createRoot(document.getElementById("notif"));

    Index.render(
        <React.StrictMode>
            <NotificationScreen />
        </React.StrictMode>
    );
}
