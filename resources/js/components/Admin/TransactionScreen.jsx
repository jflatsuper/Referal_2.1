import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import DefaultTable from "../tables/Table";
import dayjs from "dayjs";
const TransactionScreen = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios.get("/getAllUserTransactions").then((item) => {
            setTransactions(item.data);
        });
    }, []);
    return (
        <div>
            <div className="pb-5" style={{color:'orange'}}>
                <h3>Transactions Report</h3>
            </div>
            <div
                style={{ backgroundColor: " #000034",width:"100%",color: "white" }}
                className="card rounded pb-5 px-0"
            >
            <div
                style={{ backgroundColor: " #000034",width:"100%",overflow:"scroll", color: "white" }}
                className="card rounded pt-5 px-0"
            >
                
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        justifyContent: "center",
                    }}
                    className=" py-5 px-5"
                >
                    <DefaultTable
                        tableHeaders={[
                            "S/N",
                            "AMOUNT",
                            "STATUS",
                            "DESCRIPTION",
                            "DATE",
                        ]}
                        tableBody={transactions?.map(
                            ({
                                amount,
                                status,
                                transaction_type,
                                id,
                                created_at,
                            }) => {
                                const date =
                                    dayjs(created_at).format("MMMM D, YYYY");
                                return {
                                    id,
                                    amount,
                                    status,
                                    transaction_type,
                                    date,
                                };
                            }
                        )}
                    />
                   
                </div>
                
            </div>
            <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link">Previous</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                    </div>
        </div>
    );
};
export default TransactionScreen;

if (document.getElementById("admin-transaction")) {
    const Index = ReactDOM.createRoot(document.getElementById("admin-transaction"));

    Index.render(
        <React.StrictMode>
            <TransactionScreen />
        </React.StrictMode>
    );
}
