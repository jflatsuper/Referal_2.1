import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import swal from "sweetalert";
const WithdrawalRequestScreen = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    useEffect(() => {
        axios
            .get("/getAllValidWithdrawalRequests")
            .then((data) => setWithdrawals(data.data));
    }, []);
    const approveWithdrawal = async (item) => {
      await  axios
            .post("/approveWithdrawal", {
                trans_id: item.transaction_id,
                user_id: item.user_id,
                amount: item.amount,
            })
            .then((item) => {
                swal({
                    title: "Withdrawal Approved",
                    text: "Request Completed",
                    icon: "success",
                }).then((item) => window.location.reload(true));
            });
    };
    const cancelWithdrawal = async (item) => {
        await axios
            .post("/declineWithdrawal", {
                trans_id: item.transaction_id,
                user_id: item.user_id,
            })
            .then((item) => {
                console.log(item);
                swal({
                    title: "Withdrawal Request Cancelled",
                    text: "Request Completed",
                    icon: "success",
                }).then((item) => window.location.reload(true));
            });
    };
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
                                        "Approve",
                                        "Cancel",
                                        "Account",
                                        "Bank",
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
                                                transaction_id,
                                                user_id,
                                                account_name,
                                                account_num,
                                                bank,
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
                                                account_num,
                                                bank,
                                                username,
                                                account_name,
                                                amount,
                                                money_balance,
                                                date,
                                                transaction_id,
                                                user_id,
                                            };
                                        }
                                    )
                                    .map((item, id) => {
                                        const values = Object?.values(item);
                                        console.log(item);
                                        console.log(values);
                                        return (
                                            <tr key={id}>
                                                <td>
                                                    <form>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            onClick={() =>{
                                                                e.preventDefault()
                                                                approveWithdrawal(
                                                                    item
                                                                )
                                                            }}
                                                        >
                                                            Approve
                                                        </button>
                                                    </form>
                                                </td>
                                                <td>
                                                    <form>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-danger"
                                                            onClick={(e) =>{
                                                                e.preventDefault()
                                                                cancelWithdrawal(
                                                                    item
                                                                )}
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </form>
                                                </td>
                                                {values
                                                    ?.slice(0, 7)
                                                    ?.map((item, index) => (
                                                        <td
                                                            scope="row"
                                                            key={index}
                                                        >
                                                            {item ?? "N/A"}
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
