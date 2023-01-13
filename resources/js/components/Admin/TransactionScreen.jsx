import React from "react";
import ReactDOM from "react-dom/client";
const TransactionScreen = () => {
    return (
        <div>
            <div>This is the transaction screen cadscdsacvdsv</div>
            <div>This is the transaction screen cadscdsacvdsv</div>{" "}
            <div>This is the transaction screen cadscdsacvdsv</div>
            <div>This is the transaction screen cadscdsacvdsv</div>
        </div>
    );
};
export default TransactionScreen;

if (document.getElementById("admin-transaction")) {
    const Index = ReactDOM.createRoot(
        document.getElementById("admin-transaction")
    );

    Index.render(
        <React.StrictMode>
            <TransactionScreen />
        </React.StrictMode>
    );
}
