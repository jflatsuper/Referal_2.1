import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useLayoutEffect } from "react";
import link from "../../../../public/icons/EAZYEARN LOGO 24PX WHITE.svg";
import ReactDOM from "react-dom/client";
const AdvertisementScreen = () => {
    const [ads, setAds] = useState([1, 2, 3]);
    // useLayoutEffect(() => {
    //     axios.get("/getAllAdvertisements").then((data) => {
    //         console.log(data);
    //         setAds(data.data);
    //     });
    //     return;
    // }, []);
    const formikProps = useFormik({
        initialValues: "",
        onSubmit: () => {},
        enableReinitialize: true,
    });
    return (
        <div className="mainSetting">
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
                                <div className="card "></div>
                            </div>
                        );
                    })}
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
