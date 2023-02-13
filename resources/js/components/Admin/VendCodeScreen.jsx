import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import { Formik } from "formik";
import Plus from "../icons/plus";
import VendorCreateForm from "./forms/VendorCodeForm";
const VendorManagementScreen = () => {
    const [vendorCodes, setVendorCodes] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [currentUser,setCurrentUser]=useState()


    useEffect(() => {
        axios.get("/getAllVendorCodes").then((value) => {
            console.log(value);
            return setVendorCodes(value.data);
        });
    }, []);
    useEffect(() => {
        axios.get("/getAllVendors").then((value) => {
            console.log(value);
            return setVendors(value.data);
        });
    }, []);

    return (
        <div className="mainSetting">
            <div
                className="rowItem"
                style={{ color: "orange", justifyContent: "space-between" }}
            >
                <div className="rowItem">
                    {" "}
                    <h3>Vendor Management</h3>
                </div>
                <div>
                    {" "}
                    <button
                        className="rowItem btn btn-link"
                        data-bs-toggle="modal"
                        type="button"
                        data-bs-target="#exampleModal"
                        style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "orange",
                            height: "max-content",
                        }}
                    >
                        <Plus />
                        <div>Create Coupon Code</div>
                    </button>
                </div>
            </div>

            <div
                style={{ display: "flex" }}
                className="card rounded shadow-sm homelargecard homeScreen"
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
                        <h3>Vendors</h3>
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
                            {vendors?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        data-bs-toggle="modal"
                                        data-bs-target="#vendorModal"
                                        onClick={() => {
                                            setCurrentUser(item)
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
                                            className="maxWidth singleLine"
                                        >
                                            {" "}
                                            {item?.first_name}
                                            {item?.surname}
                                        </div>
                                        <div className="maxWidth singleLine">
                                            {" "}
                                            {item?.username}
                                        </div>
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
            <div className="row">
                {vendorCodes.map((item) => (
                    <div className="row"> {item?.verif_code}</div>
                ))}
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
                        style={{ borderRadius: "16px", color: "black" }}
                    >
                        <div className="modal-body px-0 py-0">
                            <div>
                                <div>
                                    cfdfced
                                    {currentUser?.first_name} {" "}{currentUser?.surname}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade modal-xl "
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen-md-down ">
                    <div
                        className="modal-content"
                        style={{ borderRadius: "16px" }}
                    >
                        <div className="modal-body px-0 py-0">
                            <VendorCreateForm vendors={vendors} />
                        </div>
                    </div>
                </div>
            </div>

            {/* <Formik> */}

            {/* </Formik> */}
        </div>
    );
};
export default VendorManagementScreen;

if (document.getElementById("create_ven")) {
    const Index = ReactDOM.createRoot(document.getElementById("create_ven"));

    Index.render(
        <React.StrictMode>
            <VendorManagementScreen />
        </React.StrictMode>
    );
}
