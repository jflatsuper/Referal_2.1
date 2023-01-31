import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useLayoutEffect } from "react";
import link from "../../../../public/icons/EAZYEARN LOGO 24PX WHITE.svg";
import ReactDOM from "react-dom/client";
const AdvertisementScreen = () => {
    const [ads, setAds] = useState([]);
    useLayoutEffect(() => {
        axios.get("/getAllAdvertisements").then((data) => {
            console.log(data);
            setAds(data.data);
        });
        return;
    }, []);
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
        <div className="mainSetting">
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
            <div className="rowItem" style={{ color: "orange" }}>
                <h3>Mark</h3>
                <img src={link} /> <h3>t</h3>
            </div>
            <div className="rowItem" style={{ color: "orange", gap: "10px" }}>
                <img src={link} /> <h3>Market</h3>
            </div>
            <div>
                <div className="row g-5">
                    {ads?.map((item) => {
                        return (
                            <div className="col-md-4 col-lg-3 col-sm-12">
                                <div className="card marketCard" style={{color:'black'}}>
                                    {item?.name}
                                    {item?.description}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="pt-5 rowItem justify-content-center">
                    <button
                        type="button"
                        className="btn btn-md btn-warning editbtn"
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AdvertisementScreen;
if (document.getElementById("user-market")) {
    const Index = ReactDOM.createRoot(document.getElementById("user-market"));

    Index.render(
        <React.StrictMode>
            <AdvertisementScreen />
        </React.StrictMode>
    );
}
