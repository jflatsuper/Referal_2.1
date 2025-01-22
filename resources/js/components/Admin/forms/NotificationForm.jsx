import React from "react";
import axios from "axios";
import { useFormik } from "formik";
const NotificationForm = () => {
    const formikProps = useFormik({
        initialValues: {
            title: null,
            description: null,
            link: null,
        },
        onSubmit: (values) => {
            axios.post("/createNotification", {
                ...values,
            }).then((data) => window.location.reload(true));;
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
                    <h5 style={{ color: "black" }}>Create New Notification</h5>
                </div>
                <div className="row row gx-5 gy-3">
                    <div className="col-sm-12 col-lg-6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                value={formikProps.values.title}
                                onChange={formikProps.handleChange("title")}
                            />
                            <label htmlFor="floatingInput">Title</label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingPassword"
                                value={formikProps.values.description}
                                onChange={formikProps.handleChange(
                                    "description"
                                )}
                            />
                            <label htmlFor="floatingPassword">
                                Description
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row row gx-5 gy-3">
                    <div className="col">
                        <div className="form-floating">
                            <input
                                type="tel"
                                className="form-control"
                                id="floatingPassword"
                                value={formikProps.values.link}
                                onChange={formikProps.handleChange("link")}
                            />
                            <label htmlFor="floatingPassword">link</label>
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
export default NotificationForm;
