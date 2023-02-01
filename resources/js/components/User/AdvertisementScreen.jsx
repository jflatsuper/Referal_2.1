import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import link from "../../../../public/icons/EAZYEARN LOGO 24PX WHITE.svg";
import ReactDOM from "react-dom/client";
import AdCard from "./Advertisment/Cards";
const AdvertisementScreen = () => {
    const [ads, setAds] = useState([]);
    useLayoutEffect(() => {
        axios.get("/getAllAdvertisements").then((data) => {
            console.log(data);
            setAds(data.data);
        });
        return;
    }, []);

    return (
        <div className="mainSetting">
            <div className="rowItem" style={{ color: "orange" }}>
                <h3>Mark</h3>
                <img src={link} /> <h3>t</h3>
            </div>
            {/* <div className="rowItem" style={{ color: "orange", gap: "10px" }}>
        <img src={link} /> <h3>Market</h3>
    </div> */}
            <div>
                <AdCard data={ads} />
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
