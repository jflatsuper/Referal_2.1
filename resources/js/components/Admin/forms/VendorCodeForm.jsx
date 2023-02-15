import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { last } from "lodash";
const VendorCreateForm = ({ vendors }) => {
    const onCreateCode = useCallback((number = 1, currentVendor) => {
        console.log(number, currentVendor);
        axios
            .post("/createVendorCodes", {
                vendor: currentVendor,
                number: number,
            })
            .then((value) => {
                console.log(value);
                return value;
            });
    }, []);
    const formikProps = useFormik({
        initialValues: {
            number: 10,
            vendor: {
                id: null,
                first_name: "",
                surname: "",
            },
        },
        onSubmit: (values) => {
            onCreateCode(values?.number, values?.vendor?.id);
        },
        enableReinitialize: true,
    });
    return (
        <div
            className="p-3"
            style={{
                backgroundColor: "lightgrey",
                color: "black",
                display: "flex",
                flexDirection: "column",
                gap: "40px",
            }}
        >
            <div
                className="rowItem"
                style={{ justifyContent: "space-between" }}
            >
                <div>
                    <h4>
                        <b>Add New Vendor Code</b>
                    </h4>
                </div>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <form>
                <div>
                    <div className="row g-5">
                        <div className=" col-sm-12 col-lg-6">
                            <div class="form-floating mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInput"
                                    value={formikProps.values.vendor.first_name}
                                    onChange={formikProps.handleChange(
                                        "vendor"
                                    )}
                                />
                                <label htmlFor="floatingInput">Vendor</label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <div class="form-floating mb-3">
                                <input
                                    type="number"
                                    class="form-control"
                                    id="floatingPassword"
                                    value={formikProps.values.number}
                                    onChange={formikProps.handleChange(
                                        "number"
                                    )}
                                />
                                <label for="floatingPassword">
                                    Number of codes
                                </label>
                            </div>
                        </div>
                    </div>
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
                                    onClick={() =>
                                        formikProps.setFieldValue(
                                            "vendor",
                                            item
                                        )
                                    }
                                >
                                    {item?.first_name} {item?.surname}
                                </a>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={formikProps.handleSubmit}
                        className="btn btn-primary"
                    >
                        Create code
                    </button>
                </div>
            </form>
        </div>
    );
};
export default VendorCreateForm;
