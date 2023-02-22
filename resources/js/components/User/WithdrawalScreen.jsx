import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Plus from "../icons/plus";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import EmptyMessage from "./Empty/EmptyWithdrawals";
import WithdrawalGroup from "./Withdrawals/WithdrawalGroup";
import WithdrawalForm from "./forms/WithdrawalForm";
const WithdrawalScreen = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [pending, setPending] = useState([]);
    useLayoutEffect(() => {
        axios("/getWithdrawalDetails").then((data) => {
            const pendingVal = [];
            const completed = [];
            data?.data?.map((item) => {
                console.log(item);
                return item?.complete
                    ?  completed.push(item)
                    : item?.amount && pendingVal.push(item);
            });
            console.log(pendingVal);
            setPending(pendingVal);
            setWithdrawals(completed);
        });
    }, []);
    console.log(pending);

    const config = {
        public_key: "FLWPUBK_TEST-c6065db888e7db229f9657428483b4bc-X",
        tx_ref: Date.now(),
        amount: 100,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: "user@gmail.com",
            phone_number: "070********",
            name: "john doe",
        },
        customizations: {
            title: "my Payment Title",
            description: "Payment for items in cart",
            logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
    };
    const handleFlutterPayment = useFlutterwave(config);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
           
            {/* <h1>Hello Test</h1>

            <button
                onClick={() => {
                    handleFlutterPayment({
                        callback: (response) => {
                            console.log(response);
                            closePaymentModal(); // this will close the modal programmatically
                        },
                        onClose: () => {},
                    });
                }}
            >
                Payment with React hooks
            </button> */}
            <div
                className="rowItem"
                style={{
                    color: "orange",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h3 className="mb-0">Withdrawals</h3>

                <button
                    className="rowItem btn btn-link"
                    data-bs-toggle="modal"
                    type="button"
                    data-bs-target="#exampleModal"
                    style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "orange",
                    }}
                >
                    <Plus />
                    <div>Withdrawal Request</div>
                </button>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "orange",
                    gap: "40px",
                }}
            >
                <div className="rowItem">
                    {" "}
                    <h3>Pending Requests</h3>
                </div>
                {pending.length ? (
                    <WithdrawalGroup data={pending} />
                ) : (
                    <EmptyMessage status={"pending"} />
                )}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "orange",
                    gap: "40px",
                }}
            >
                <div className="rowItem">
                    {" "}
                    <h3>Withdrawal History</h3>
                </div>
                {withdrawals.length ? (
                    <WithdrawalGroup data={withdrawals} />
                ) : (
                    <EmptyMessage status={"completed"} />
                )}
            </div>
            <div
                className="modal fade modal-xl "
                id="exampleModal"
                tabindex="-1"
                role="dialog"
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
                            <WithdrawalForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WithdrawalScreen;
if (document.getElementById("withdrawal")) {
    const Index = ReactDOM.createRoot(document.getElementById("withdrawal"));

    Index.render(
        <React.StrictMode>
            <WithdrawalScreen />
        </React.StrictMode>
    );
}
