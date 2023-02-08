import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

const AdvertisementForm = () => {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        console.log(file)
        setFile(file);
    };
    const config = {
        public_key: "FLWPUBK_TEST-c6065db888e7db229f9657428483b4bc-X",
        tx_ref: Date.now(),
        amount: 10000,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: "test@g.com",
            phone_number: "12345643",
            name: "Advertiser",
        },
        customizations: {
            title: "Advertisement Payment",
            description: "Create an advertisment with EazyEarn",
            logo: "../../../../../public/icons/EAZYEARN LOGO 64PX BLUE.svg",
        },
    };
    const handleFlutterPayment = useFlutterwave(config);
    const createAdvertisement = async (values) => {
        const fd = new FormData();
        fd.append("name", values.name);
        fd.append("description", values?.description);
        fd.append("link", values?.link);
        fd.append("file", file);
        fd.append("transaction_id", values?.transaction_id);

        await axios
            .post("/createAdvertisement", fd)
            .then((data) => {
                console.log(data);
                console.log(values);
            })
            .catch((err) => console.log(err));
    };
    const formikProps = useFormik({
        initialValues: {
            name: "first",
            description: "second",
            link: "goal.com",
        },
        onSubmit: (values) => {
            handleFlutterPayment({
                callback: (response) => {
                    console.log(response);
                    closePaymentModal();
                    response.status === "successful" &&
                        createAdvertisement({
                            ...values,
                            transaction_id: response.transaction_id,
                        }); // this will close the modal programmatically
                },
                onClose: () => {},
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
                    <div
                        className="rowItem"
                        style={{ justifyContent: "space-between" }}
                    >
                        <h5 style={{ color: "black" }}>Add Product</h5>{" "}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <span className="text-danger">
                        {" "}
                        Please note, each advertisment will require a one time
                        payment of N10,000 only.{" "}
                    </span>
                </div>
                <div className="row g-5">
                    <div className=" col-sm-12 col-lg-6">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                value={formikProps.values.name}
                                onChange={formikProps.handleChange("name")}
                            />
                            <label for="floatingInput">Product Name</label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                value={formikProps.values.description}
                                onChange={formikProps.handleChange(
                                    "description"
                                )}
                            />
                            <label for="floatingPassword">Description</label>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-lg-7 col-md-7 col-sm-12">
                        <div class="form-floating mb-3">
                            <input
                                type="email"
                                class="form-control"
                                id="floatingInput"
                                value={formikProps.values.link}
                                onChange={formikProps.handleChange("link")}
                            />
                            <label for="floatingInput">
                                Product External Link
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div
                        className="col "
                        style={{
                            maxWidth: "100% !important",
                            overflow: "hidden",
                        }}
                    >
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            maxSize={1}
                            classes="col w-100"
                            children={<div className="divStyle">
                               {file?file?.name:" Select Image / Drop Image Here"}
                            </div>}
                        />
                    </div>
                </div>

                <div>
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
export default AdvertisementForm;
