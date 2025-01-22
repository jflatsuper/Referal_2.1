import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { FileUploader } from "react-drag-drop-files";
import swal from "sweetalert";

const fileTypes = ["JPG", "PNG", "GIF"];

const AdvertisementForm = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Image, setImageError] = useState();
    function returnFileSize(number) {
        if (number >= 1024 && number <= 1048576 * 2) {
            return true;
        } else if (number > 1048576 * 2) {
            return false;
        }
    }
    const handleChange = (file) => {
        setImageError();
        return returnFileSize(file.target.files[0].size)
            ? setFile(file.target.files[0])
            : setImageError("File is larger than limit of 2MB");
    };
    // const config = {
    //     public_key: "FLWPUBK_TEST-c6065db888e7db229f9657428483b4bc-X",
    //     tx_ref: Date.now(),
    //     amount: 10000,
    //     currency: "NGN",
    //     payment_options: "card,mobilemoney,ussd",
    //     customer: {
    //         email: "test@g.com",
    //         phone_number: "12345643",
    //         name: "Advertiser",
    //     },
    //     customizations: {
    //         title: "Advertisement Payment",
    //         description: "Create an advertisment with EazyEarn",
    //         logo: "../../../../../public/icons/EAZYEARN LOGO 64PX BLUE.svg",
    //     },
    // };
    // const handleFlutterPayment = useFlutterwave(config);
    const createAdvertisement = async (values) => {
        const fd = new FormData();
        fd.append("name", values.name);
        fd.append("description", values?.description);
        fd.append("link", values?.link);
        file && fd.append("file", file);
        fd.append("transaction_id", values?.transaction_id);
        setLoading(true);

        await axios
            .post("/createAdvertisement", fd)
            .then((data) => {
                setLoading(false);
                data.status === 200 &&
                    swal({
                        title: "Advert Successfully Registered",
                        text: "Awaiting Approval from EAZYEARN",
                        icon: "info",
                    }).then((success) => window.location.reload(true));
            })
            .catch((err) => setLoading(false));
    };
    const formikProps = useFormik({
        initialValues: {
            name: "",
            description: "",
            link: "",
        },
        onSubmit: (values) => {
            createAdvertisement({
                ...values,
                transaction_id: "",
            }); // this will close the modal programmatically
            // handleFlutterPayment({
            //     callback: (response) => {
            //         console.log(response);
            //         closePaymentModal();
            //         response.status === "successful" &&
            //             createAdvertisement({
            //                 ...values,
            //                 transaction_id: response.transaction_id,
            //             }); // this will close the modal programmatically
            //     },
            //     onClose: () => {},
            // });
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
                        payment with an be negotiated with the Admin.{" "}
                    </span>
                    <div className="my-3">
                        <span className="text-dark">
                            <b>Step 1</b>: Click the{" "}
                            <a href="http://wa.me/2348063855762?text=Hello+i+want+to+place+an+advert+on+Eazyearn+site">
                                link to request payment details
                            </a>{" "}
                            and send payment proof. Account will be provided by
                            advertisment vendor{" "}
                            <a href="http://wa.me/2348063855762?text=Hello+i+want+to+place+an+advert+on+Eazyearn+site">
                                here
                            </a>
                            .
                        </span>
                    </div>
                    <div className="mb-3">
                        <span className="text-dark">
                            <b>Step 2</b>: Proceed to create your advert in the
                            form below. Advert will be approved once{" "}
                            <span className="text-danger">
                                <b>Step 1</b>
                            </span>{" "}
                            is completed. For complaints,{" "}
                            <a href="http://wa.me/2348063855762?text=Hello+i+want+to+place+an+advert+on+Eazyearn+site">
                                click here.
                            </a>
                            .
                        </span>
                    </div>
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
                                type="link"
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
                        <div>
                            <div>
                                <label for="image_uploads">
                                    Choose images to upload (PNG, JPG)
                                </label>
                            </div>

                            <input
                                type="file"
                                id="image_uploads"
                                name="image_uploads"
                                onChange={handleChange}
                                accept="image/*,.png,.jpeg,.jpg"
                                placeholder="Select Image"
                                style={{
                                    backgroundColor: "black",
                                    height: "48px",
                                    color: "white",
                                    padding: "10px",
                                }}
                            />
                            {Image && <div className="text-danger"></div>}
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="btn btn-md btn-warning editbtn"
                        onClick={formikProps.handleSubmit}
                        disabled={loading}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};
export default AdvertisementForm;
