import React from "react";
import ReactDOM from "react-dom/client";
import DefaultTable from "../tables/Table";
const TransactionScreen = () => {
    return (
        <>
         <DefaultTable/>
        <p>we are here</p></>
       
    );
};
export default TransactionScreen;

if (document.getElementById("transaction")) {
    const Index = ReactDOM.createRoot(
        document.getElementById("transaction")
    );

    Index.render(
        <React.StrictMode>
            <TransactionScreen />
        </React.StrictMode>
    );
}
