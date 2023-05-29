import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
const AccountEditForm = ({ account_name, account_num, bank }) => {
    const formikProps = useFormik({
        initialValues: {
            account_name: account_name,
            account_num: account_num ? parseInt(account_num) : undefined,
            bank: bank,
        },
        // validationSchema: {
        //     account_name: yup.string(),
        //     account_num: yup.number(),
        //     bank: yup.string(),
        // },
        onSubmit: (values) => {
            axios.post("/editAccount", {
                ...values,
            }).then((data) => window.location.reload(true));
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
                    <h5 style={{ color: "black" }}>Bank Details</h5>
                </div>
                <div className="row gx-5 gy-3">
                    <div className="col-sm-12 col-lg-6">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                value={formikProps.values.bank}
                                onChange={formikProps.handleChange("bank")}
                            />
                            <label for="floatingInput">Bank</label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                value={formikProps.values.account_name}
                                onChange={formikProps.handleChange(
                                    "account_name"
                                )}
                            />
                            <label for="floatingPassword">
                                Name on Account
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div class="form-floating mb-3">
                            <input
                                type="tel"
                                class="form-control"
                                id="floatingInput"
                                value={formikProps.values.account_num}
                                onChange={formikProps.handleChange(
                                    "account_num"
                                )}
                            />
                            <label for="floatingInput">Account Number</label>
                        </div>
                    </div>
                </div>
                <div>
                    {" "}
                    <button
                        type="button"
                        className="btn btn-md btn-warning editbtn"
                        onClick={formikProps.handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};
export default AccountEditForm;
