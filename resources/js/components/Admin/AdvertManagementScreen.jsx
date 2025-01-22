
import React,{useState,useLayoutEffect} from "react";
import ReactDOM from "react-dom/client";
import AdCardAdmin from "./components/AdCardAdmin";
const AdvertManagementScreen = () => {
    const [ads, setAds] = useState([]);
    useLayoutEffect(() => {
        axios.get("/getAllAdvertisementsAd").then((data) => {
            console.log(data);
            setAds(data.data);
        });
        return;
    }, []);
    

    return  <div className="mainSetting">
    <div
        className="rowItem"
        style={{ color: "orange", justifyContent: "space-between" }}
    >
        <div className="rowItem">
            {" "}
            <h3>Advert Management</h3>
        </div>
       
    </div>
    {/* <div className="rowItem" style={{ color: "orange", gap: "10px" }}>
<img src={link} /> <h3>Market</h3>
</div> */}
    <div>
        <AdCardAdmin data={ads} />
    </div>
    {/* <div className="pt-5 rowItem justify-content-center">
        <button
            type="button"
            className="btn btn-md btn-warning editbtn"
        >
            Load More
        </button>
    </div> */}

   
</div>;
};
export default AdvertManagementScreen;
if (document.getElementById("admin-ad")) {
    const Index = ReactDOM.createRoot(document.getElementById("admin-ad"));

    Index.render(
        <React.StrictMode>
            <AdvertManagementScreen />
        </React.StrictMode>
    );
}
