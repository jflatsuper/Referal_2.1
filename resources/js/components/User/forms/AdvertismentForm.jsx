import React from "react";
import axios from "axios";
import { useFormik } from "formik";
const AdvertisementForm = () => {
    const createAdvertisement = (values) => {
        axios
            .post("/createAdvertisement", values)
            .then((data) => console.log("done"))
            .catch((err) => console.log(err));
    };
    const formikProps = useFormik({
        initialValues: {
            name: "first",
            description: "second",
            link: "goal.com",
            transaction_id: "768er7y32r3e",
        },
        onSubmit: (values) => {
            createAdvertisement(values);
        },
        enableReinitialize: true,
    });
    return (
        <form>
            <input
                type={"text"}
                value={formikProps.values.name}
                onChange={formikProps.handleChange("name")}
            />
            <input
                type={"text"}
                value={formikProps.values.description}
                onChange={formikProps.handleChange("description")}
            />
            <input
                type={"text"}
                value={formikProps.values.link}
                onChange={formikProps.handleChange("link")}
            />
            <input
                type={"text"}
                value={formikProps.values.transaction_id}
                onChange={formikProps.handleChange("transaction_id")}
            />
            <button type="button" onClick={formikProps.handleSubmit}>
                Submit
            </button>
        </form>
    );
};
export default AdvertisementForm;
