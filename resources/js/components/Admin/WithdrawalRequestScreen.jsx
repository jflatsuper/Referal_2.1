import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import DefaultTable from "../tables/Table";
import dayjs from "dayjs";
const WithdrawalRequestScreen = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    useEffect(() => {
        axios
            .get("/getAllValidWithdrawalRequests")
            .then((data) => setWithdrawals(data.data));
    }, []);
    return (
        <div>
            <div
                style={{
                    backgroundColor: " #000034",
                    width: "100%",
                    color: "white",
                }}
                className="card rounded pb-5 px-0"
            >
                <div
                    style={{
                        backgroundColor: " #000034",
                        width: "100%",
                        overflow: "scroll",
                        color: "white",
                    }}
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
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    {[
                                        "",
                                        "S/N",
                                        "Username",
                                        "Name on Account",
                                        "Withdrawal Amount",
                                        "Current Balance",
                                        "Created At",
                                    ].map((item) => (
                                        <th scope="col" key={item} id={item}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ color: "white" }}>
                                {withdrawals
                                    ?.map(
                                        (
                                            {
                                                id,
                                                username,
                                                amount,
                                                account_name,
                                                money_balance,
                                                created_at,
                                            },
                                            index
                                        ) => {
                                            const date =
                                                dayjs(created_at).format(
                                                    "MMMM D, YYYY"
                                                );
                                            return {
                                                index: index + 1,
                                                username,
                                                account_name,
                                                amount,
                                                money_balance,
                                                date,
                                            };
                                        }
                                    )
                                    .map((item, id) => {
                                        const values = Object.values(item);
                                        console.log(item);
                                        console.log(values);
                                        return (
                                            <tr key={id}>
                                                <td>
                                                    <input
                                                        type={"checkbox"}
                                                        defaultChecked
                                                    />
                                                </td>
                                                {values.map((item, index) => (
                                                    <td scope="row" key={index}>
                                                        {item}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
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
export default WithdrawalRequestScreen;
if (document.getElementById("with_request")) {
    const Index = ReactDOM.createRoot(document.getElementById("with_request"));

    Index.render(
        <React.StrictMode>
            <WithdrawalRequestScreen />
        </React.StrictMode>
    );
}
