import React from 'react'
import ReactDOM from "react-dom/client";
const WithdrawalRequestScreen=()=>{
    return (
        <div>

        </div>
    )
}
export default WithdrawalRequestScreen
if (document.getElementById("with_request")) {
    const Index =ReactDOM.createRoot(document.getElementById("with_request"));

    Index.render(
        <React.StrictMode>
            <WithdrawalRequestScreen />
        </React.StrictMode>
    );
}
