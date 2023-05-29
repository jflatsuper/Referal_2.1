import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
const WithdrawalForm = ({}) => {
    const [loading, setLoading] = useState(false);
    const formikProps = useFormik({
        initialValues: {
            delivery_email: "",
            amount: "",
        },
        onSubmit: (values) => {
            setLoading(true);
            axios
                .post("/createWithdrawal", {
                    ...values,
                })
                .then((data) => {
                    
                   return data?swal({
                        title: "Withdrawal Request Created",
                        text: "Awaiting Approval from EAZYEARN",
                        icon: "info",
                    }):null
                })
                .finally(() => {
                    setLoading(false);
                    window.location.reload(true);
                });
        },
        enableReinitialize: true,
    });
    return (
        <form>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                    padding: "64px",
                    borderRadius: "16px",
                    backgroundColor: "lightgray",
                    color: "black",
                }}
                className="shadow-sm "
            >
                <div
                    className="rowItem"
                    style={{ justifyContent: "space-between" }}
                >
                    <h5 style={{ color: "black" }}>
                        Create New Withdrawal Request
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="row  gx-5 gy-3">
                    <div className="col-sm-12 col-lg-12">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                value={formikProps.values.delivery_email}
                                onChange={formikProps.handleChange(
                                    "delivery_email"
                                )}
                            />
                            <label for="floatingInput">Delivery Email</label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-12">
                        <div class="form-floating">
                            <input
                                type="number"
                                class="form-control"
                                id="floatingPassword"
                                value={formikProps.values.amount}
                                onChange={formikProps.handleChange("amount")}
                            />
                            <label for="floatingPassword">
                                Withdrawal Amount
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-md btn-warning editbtn"
                        onClick={formikProps.handleSubmit}
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </form>
    );
};
export default WithdrawalForm;
