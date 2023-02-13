import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import largeIcon from "../../../../public/icons/EAZYEARN LOGO 64PX BLUE.svg";
import smallIcon from "../../../../public/icons/EAZYEARN LOGO 16PX BLUE.svg";
import copy from "../../../../public/icons/copy.svg";
import { ref } from "yup";
import dayjs from "dayjs";
import Withdraw from "../icons/Withdraw";
import Profile from "../icons/Profile";
import Transaction from "../icons/Transaction";
import Market from "../icons/Market";
function HomePage() {
    const [values, setValue] = useState([]);
    useEffect(() => {
         axios
            .get("/getSiteStats")
            .then((res) => setValue(res.data));
    }, []);

    return (
        <div>
        <div className="pb-5">
            <h3 className="welcomeName">
                Hello,
                <span style={{ color: "orange" }}>
                    {" "}
                    Admin
                </span>
            </h3>
        </div>
        <div className="mainCont">
            <div className="homeScreen d-block d-lg-none">
                <div className="card rounded shadow-sm largecardMobile mb-5">
                    <div
                        className="card-body"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            <div className="rowItem row">
                                {/* <img src={largeIcon} /> */}
                                <h6>TOTAL BALANCE</h6>
                            </div>
                            <div
                                className="rowItem"
                                style={{
                                    alignItems: "center",
                                    // justifyContent: "center",
                                }}
                            >
                                {/* <img src="https://img.icons8.com/material-rounded/48/null/naira.png" />{" "} */}
                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        width: "100%",
                                    }}
                                >
                                    {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "NGN",
                                        minimumFractionDigits: 0,
                                    }).format(
                                        values?.account?.money_balance?? 0
                                    )}{" "}
                                    <hr />
                                    {/* {user?.money_balance} */}
                                </div>
                            </div>
                        </div>
                        <div
                            className="row p-2"
                            style={{ justifyContent: "space-between" }}
                        >
                            <div className="quickLink">
                                <a href="/withdrawals">
                                    <Withdraw />
                                </a>
                            </div>
                            <div className="quickLink">
                                <a href="/account">
                                    <Profile />
                                </a>
                            </div>
                            <div className="quickLink">
                                <a href="/transactions">
                                    <Transaction />
                                </a>
                            </div>
                            <div className="quickLink">
                                <a href="/market">
                                    <Market />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row gx-3 gy-3 mb-5">
                        <div className="col-6 ">
                            <div className="eazyCol p-3">
                                <h6>Current Balance</h6>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                        // justifyContent: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            color: "burlywood",
                                        }}
                                    >
                                        {Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "NGN",
                                            minimumFractionDigits: 0,
                                        }).format(
                                            values?.account?.money_balance?? 0
                                        )}{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className="eazyCol p-3">
                                <h6>Complete Withdrawals</h6>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                        gap: "3px",
                                        // justifyContent: "center",
                                    }}
                                >
                                    <img src={smallIcon} />{" "}
                                    <div
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            color: "burlywood",
                                        }}
                                    >
                                        {values?.completed}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className="eazyCol p-3">
                                <h6>Pending Withdrawals</h6>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                        // justifyContent: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            color: "burlywood",
                                        }}
                                    >
                                        {values?.pending}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className="eazyCol p-3">
                                <h6 className="capitalize">
                                   Active Users
                                </h6>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                        // justifyContent: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            color: "burlywood",
                                        }}
                                    >
                                        {values?.users}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homeScreen d-none d-lg-block">
                <div className="row justify-content-flex-start  ">
                    <div className="col-md-5 mb-5">
                        <div className="card rounded shadow-sm largecard">
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <div className="rowItem">
                                    {/* <img src={largeIcon} /> */}
                                    <h3>Current Balance</h3>
                                </div>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                        // justifyContent: "center",
                                    }}
                                >
                                    {/* <img src="https://img.icons8.com/material-rounded/48/null/naira.png" />{" "} */}
                                    <div
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "NGN",
                                            minimumFractionDigits: 0,
                                        }).format(
                                            values?.account?.money_balance?? 0
                                        )}{" "}
                                        {/* {user?.money_balance} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 offset-md-1 mb-5">
                        <div className="card rounded shadow-sm largecard">
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <div className="rowItem">
                                    {/* <img src={largeIcon} /> */}
                                    <h3>Active Users</h3>
                                </div>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                
                                    <div
                                        style={{
                                            fontSize: "48px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {values?.users}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-flex-start ">
                    <div className="col-md-5 mb-5">
                        <div className="card rounded shadow-sm largecard">
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <div className="rowItem">
                                    {/* <img src={largeIcon} /> */}
                                    <h3>Pending Withdrawals</h3>
                                </div>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                    }}
                                >
                                    {/* <img src="https://img.icons8.com/material-rounded/48/null/naira.png" />{" "} */}
                                    <div
                                        style={{
                                            fontSize: "48px",
                                            fontWeight: 500,
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {values?.pending}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 offset-md-1 mb-5">
                        <div className="card rounded shadow-sm largecard">
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <div className="rowItem">
                                    {/* <img src={largeIcon} /> */}
                                    <h3 className="capitalize">
                                        Complete Withdrawals
                                    </h3>
                                </div>
                                <div
                                    className="rowItem"
                                    style={{
                                        alignItems: "center",
                                    }}
                                >
                                    {/* <img src="https://img.icons8.com/material-rounded/48/null/naira.png" />{" "} */}
                                    <div
                                        style={{
                                            fontSize: "48px",
                                            fontWeight: 500,
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {values?.completed}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    );
}
export default HomePage;

if (document.getElementById("homepage")) {
    const Index = ReactDOM.createRoot(document.getElementById("homepage"));

    Index.render(
        <React.StrictMode>
            <HomePage />
        </React.StrictMode>
    );
}
