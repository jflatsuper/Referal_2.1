import React from 'react'
import ReactDOM from "react-dom/client";
const VendorManagementScreen=()=>{
    return (
        <div>This is the VendorManagementScreen screen</div>
    )
}
export default VendorManagementScreen;

if (document.getElementById("create_ven")) {
    const Index = ReactDOM.createRoot(document.getElementById("create_ven"));

    Index.render(
        <React.StrictMode>
            <VendorManagementScreen />
        </React.StrictMode>
    );
}