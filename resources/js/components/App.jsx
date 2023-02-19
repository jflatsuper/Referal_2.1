import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import largeIcon from "../../../public/icons/EAZYEARN LOGO 64PX BLUE.svg";
import smallIcon from "../../../public/icons/EAZYEARN LOGO 16PX BLUE.svg";
import copy from "../../../public/icons/copy.svg";
import dayjs from "dayjs";
import Withdraw from "./icons/Withdraw";
import Profile from "./icons/Profile";
import Transaction from "./icons/Transaction";
import Market from "./icons/Market";
import ArrowRight from "./icons/ArrowRight";
function App() {
    const [user, setUser] = useState();
    const [referal, setReferal] = useState([]);
    const [copied, setCopied] = useState(false);
    const [notification, setNotification] = useState(null);
    useLayoutEffect(() => {
        axios.get("/getUserWithReferals").then((data) => {
            console.log(data);
            setUser(data.data[0]);
            setReferal(data.data);
        });
        return;
    }, []);
    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 3000);
        }
    }, [copied]);
    useEffect(() => {
        axios.get("/getMostRecent").then((data) => setNotification(data.data));
    }, []);

    return (
        <div>
            <div className="pb-5">
                <h3 className="welcomeName">
                    Hello,
                    <span style={{ color: "orange" }}>
                        {" "}
                        {user?.first_name} {user?.surname}
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
                                            fontSize: "24px",
                                            fontWeight: 500,
                                            width: "100%",
                                        }}
                                    >
                                        {Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "NGN",
                                            minimumFractionDigits: 0,
                                        }).format(
                                            user?.money_balance ?? 0
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
                                <div
                                    data-toggle="tooltip"
                                    title="Withdrawals"
                                    trigger="hover"
                                    data-placement="top"
                                    style={{ color: "white" }}
                                    className="quickLink"
                                >
                                    <a href="/withdrawals">
                                        <Withdraw />
                                    </a>
                                </div>
                                <div
                                    data-toggle="tooltip"
                                    title="Profile"
                                    trigger="hover"
                                    data-placement="top"
                                    style={{ color: "white" }}
                                    className="quickLink"
                                >
                                    <a href="/account">
                                        <Profile />
                                    </a>
                                </div>
                                <div
                                    data-toggle="tooltip"
                                    title="Transactions"
                                    trigger="hover"
                                    data-placement="top"
                                    style={{ color: "white" }}
                                    className="quickLink"
                                >
                                    <a href="/transactions">
                                        <Transaction />
                                    </a>
                                </div>
                                <div
                                    data-toggle="tooltip"
                                    title="Advertisement"
                                    trigger="hover"
                                    data-placement="top"
                                    style={{ color: "white" }}
                                    className="quickLink"
                                >
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
                                                user?.money_balance ?? 0
                                            )}{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 ">
                                <div className="eazyCol p-3">
                                    <h6>Eazy Points</h6>
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
                                            {user?.point_balance}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 ">
                                <div className="eazyCol p-3">
                                    <h6>Referal Number</h6>
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
                                            {referal[0]?.refFirstName?.length
                                                ? referal?.length
                                                : 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 ">
                                <div className="eazyCol p-3">
                                    <h6 className="capitalize">
                                        {String(user?.user_type)} {"account"}
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
                                            {user?.username}
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
                                                fontSize: "48px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "NGN",
                                                minimumFractionDigits: 0,
                                            }).format(
                                                user?.money_balance ?? 0
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
                                        <h3>Eazy Points</h3>
                                    </div>
                                    <div
                                        className="rowItem"
                                        style={{
                                            alignItems: "center",
                                            // justifyContent: "center",
                                        }}
                                    >
                                        <img src={largeIcon} />{" "}
                                        <div
                                            style={{
                                                fontSize: "48px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {user?.point_balance}
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
                                        <h3>Referal Number</h3>
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
                                            {referal[0]?.refFirstName?.length
                                                ? referal?.length
                                                : 0}
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
                                            {String(user?.user_type)}{" "}
                                            {"account"}
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
                                            {user?.username}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{ display: "flex" }}
                    className="card rounded shadow-sm homelargecard homeScreen"
                >
                    <div
                        className="card-body"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ maxHeight: "85%" }}>
                            <h3>Referrals</h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "100%",
                                    overflow: "scroll",
                                }}
                                className="py-4"
                            >
                                {referal[0]?.refFirstName?.length &&
                                    referal?.map((item) => {
                                        return (
                                            <div
                                                className="rowItem py-3 px-3 mb-3 rounded"
                                                style={{
                                                    width: "100%",
                                                    justifyContent:
                                                        "space-between",
                                                    backgroundColor: "#003366",
                                                }}
                                            >
                                                <div
                                                    style={{ fontWeight: 500 }}
                                                    className="maxWidth singleLine"
                                                >
                                                    {" "}
                                                    {item?.refFirstName}
                                                    {item?.refSurname}
                                                </div>
                                                <div className="maxWidth singleLine">
                                                    {" "}
                                                    {item?.refUsername}
                                                </div>
                                                <div className="maxWidth singleLine">
                                                    {dayjs(
                                                        item?.refcreated
                                                    ).fromNow()}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        <div style={{}}>
                            {copied && (
                                <div
                                    style={{ color: "orange", float: "right" }}
                                >
                                    Copied
                                </div>
                            )}
                            <div class="input-group ">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Recipient's username"
                                    value={`https://eazyearn.site/register?referrer=${user?.ref_link}`}
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <button
                                    class="btn btn-warning"
                                    type="button"
                                    id="button-addon2"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `https://eazyearn.site/register?referrer=${user?.ref_link}`
                                        );
                                        setCopied(true);
                                    }}
                                >
                                    <img src={copy} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    color: "black",
                    width: "100%",
                    overflow: "hidden",
                    flexDirection: "row",
                }}
                className="card rounded shadow-sm  "
            >
                {notification && (
                    <>
                        {notification?.link && (
                            <a
                                className="btn btn-primary rowItem"
                                href={notification.link}
                                style={{ gap: "10px", zIndex: 500 }}
                            >
                                Go <ArrowRight />
                            </a>
                        )}
                        <div
                            className="card-body notif"
                            style={{
                                display: "flex",
                                color: "black",
                                border: "none",
                                width: "max-content !important",
                                width: "100%",
                                paddingRight: "10px",
                            }}
                        >
                            <div className={"rowItem"} style={{ gap: "20px" }}>
                                <div
                                    style={{
                                        // display: "flex",
                                        color: "black",
                                        border: "none",
                                        width: "max-content !important",
                                        width: "100%",
                                        paddingRight: "10px",
                                    }}
                                    className="singleLineNotif"
                                >
                                    {" "}
                                    <b className="px-4">{notification?.title}:</b>{" "}
                                    {notification?.description}
                                </div>
                            </div>
                        </div>{" "}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
