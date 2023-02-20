import React from "react";
import axios from "axios";
import { useFormik } from "formik";
const UserEditForm = ({ email, first_name, surname, username, phone }) => {
    const formikProps = useFormik({
        initialValues: {
            first_name: first_name,
            surname: surname,
            username: username,
            phone: phone,
        },
        onSubmit: (values) => {
            axios
                .post("/editUser", {
                    ...values,
                })
                .then((data) => window.location.reload(true));
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
                    <h5 style={{ color: "black" }}>User Information</h5>
                </div>
                <div className="row row gx-5 gy-3">
                    <div className="col-sm-12 col-lg-6">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                value={formikProps.values.first_name}
                                onChange={formikProps.handleChange(
                                    "first_name"
                                )}
                            />
                            <label for="floatingInput">First Name</label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                value={formikProps.values.surname}
                                onChange={formikProps.handleChange("surname")}
                            />
                            <label for="floatingPassword">Surname</label>
                        </div>
                    </div>
                </div>
                <div className="row row gx-5 gy-3">
                    <div className="col-lg-7 col-md-7 col-sm-12">
                        <div class="form-floating mb-3">
                            <input
                                type="email"
                                class="form-control"
                                id="floatingInput"
                                value={email}
                                disabled
                            />
                            <label for="floatingInput">Email address</label>
                        </div>
                    </div>
                    <div className="col">
                        <div class="form-floating">
                            <input
                                type="tel"
                                class="form-control"
                                id="floatingPassword"
                                value={formikProps.values.phone}
                                onChange={formikProps.handleChange("phone")}
                            />
                            <label for="floatingPassword">Phone Number</label>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
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
export default UserEditForm;
