import React from "react";
import axios from "axios";
import { useFormik } from "formik";
const WithdrawalForm = ({}) => {
    const formikProps = useFormik({
        initialValues: {
            delivery_email: "",
            amount: "",
        },
        onSubmit: (values) => {
            axios.post("/createWithdrawal", {
                ...values,
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
                <div>
                    <h5 style={{ color: "black" }}>
                        Create New Withdrawal Request
                    </h5>
                </div>
                <div className="row g-5">
                    <div className="col">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                value={formikProps.values.delivery_email}
                                onChange={formikProps.handleChange("delivery_email")}
                            />
                            <label for="floatingInput">Delivery Email</label>
                        </div>
                    </div>
                    <div className="col">
                        <div class="form-floating">
                            <input
                                type="text"
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
                        type="button"
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
