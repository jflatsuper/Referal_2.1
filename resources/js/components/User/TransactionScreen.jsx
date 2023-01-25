import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import DefaultTable from "../tables/Table";
const TransactionScreen = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios.get("/getAllUserTransactions").then((item) => {
            setTransactions(item.data);
        });
    }, []);
    return (
        <>
            <DefaultTable
                tableHeaders={["S/N", "AMOUNT", "STATUS", "DESCRIPTION"]}
                tableBody={transactions?.map(
                    ({ amount, status, transaction_type, id }) => {
                        return { id, amount, status, transaction_type };
                    }
                )}
            />
        </>
    );
};
export default TransactionScreen;

if (document.getElementById("transaction")) {
    const Index = ReactDOM.createRoot(document.getElementById("transaction"));

    Index.render(
        <React.StrictMode>
            <TransactionScreen />
        </React.StrictMode>
    );
}
