import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Formik } from "formik";
const VendorManagementScreen = () => {
    const [vendorCodes, setVendorCodes] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [currentVendor, setCurrentVendor] = useState(null);
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
    const onCreateCode = useCallback(
        (number = 1) => {
            axios
                .post(
                    "/createVendorCodes",{ "vendor": currentVendor," number": number }
                )
                .then((value) => {
                    console.log(value);
                    return value;
                });
        },
        [currentVendor]
    );
    return (
        <div className="mainContainer">
            <div className="row">
                This is the VendorManagementScreen screen These are the vendor
                Codes
            </div>
            <div className="row">
                {vendorCodes.map((item) => (
                    <div className="row"> {item?.verif_code}</div>
                ))}
            </div>
            <div>
                <div className="row">
                    {" "}
                    click this button and select a vendor to create a code of
                    him
                </div>
                <input className="form-control" />
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-danger dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Vendors
                    </button>

                    <div class="dropdown-menu">
                        {vendors?.map((item) => (
                            <a
                                key={item.id}
                                class="dropdown-item"
                                onClick={() => setCurrentVendor(item.id)}
                            >
                                {item?.first_name} {item?.surname}
                            </a>
                        ))}
                    </div>
                </div>
                <button onClick={()=>onCreateCode()} className="btn btn-primary">
                    Create code
                </button>
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
