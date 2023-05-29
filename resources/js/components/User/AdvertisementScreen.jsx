import axios from "axios";
import React, { useState, useLayoutEffect, useEffect } from "react";
import link from "../../../../public/icons/EAZYEARN LOGO 24PX WHITE.svg";
import ReactDOM from "react-dom/client";
import AdCard from "./Advertisment/Cards";
import Plus from "../icons/plus";
import AdvertisementForm from "./forms/AdvertismentForm";
const AdvertisementScreen = () => {
    const [ads, setAds] = useState([]);
    useLayoutEffect(() => {
        axios.get("/getAllAdvertisements").then((data) => {
            console.log(data);
            setAds(data.data);
        });
        return;
    }, []);
    useEffect(()=>{
        axios.get("/dailyBonus").then((data) => {
           console.log(data)
        });
        return;

    },[])

    return (
        <div className="mainSetting">
            <div
                className="rowItem"
                style={{ color: "orange", justifyContent: "space-between" }}
            >
                <div className="rowItem">
                    {" "}
                    <h3>Mark</h3>
                    <img src={link} /> <h3>t</h3>
                </div>
                <div>
                    {" "}
                    <button
                        className="rowItem btn btn-link"
                        data-bs-toggle="modal"
                        type="button"
                        data-bs-target="#exampleModal"
                        style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "orange",
                            height: "max-content",
                        }}
                    >
                        <Plus />
                        <div>Add Advertisement</div>
                    </button>
                </div>
            </div>
            {/* <div className="rowItem" style={{ color: "orange", gap: "10px" }}>
        <img src={link} /> <h3>Market</h3>
    </div> */}
            <div>
                <AdCard data={ads} />
            </div>
            {/* <div className="pt-5 rowItem justify-content-center">
                <button
                    type="button"
                    className="btn btn-md btn-warning editbtn"
                >
                    Load More
                </button>
            </div> */}

            <div
                className="modal fade modal-xl "
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen-md-down ">
                    <div
                        className="modal-content"
                        style={{ borderRadius: "16px" }}
                    >
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add Product
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div> */}
                        <div className="modal-body px-0 py-0">
                            <AdvertisementForm />
                        </div>
                    </div>
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
