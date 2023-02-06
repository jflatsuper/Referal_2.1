import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import wallet from "../../../../../public/icons/wallet.svg";
import check from "../../../../../public/icons/check.svg";
import Check from "../../icons/Check";
import HourGlass from "../../icons/HourGlass";
dayjs.extend(relativeTime);
const WithdrawalItem = ({ item }) => {
    return (
        <div className="card bg-light  rowItem">
            
             <div style={{backgroundColor:"lightgray",borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px",height:"100%"}} className="px-3 py-3"><img src={wallet} /></div>
            <div
                className="card-body py-0 rowItem"
                style={{ justifyContent: "space-between", flexWrap: "wrap" }}
            >
               
                <div style={{ color: "black" }}>
                    <b>Created :</b>{" "}
                    {dayjs(item.created_at).format("DD/MM/YYYY")}
                </div>
                <div style={{ color: "black" }}>
                    <b> Amount :</b> N{item?.amount}
                </div>

                <div>
                    <b style={{ color: "black" }}>Status:</b>{" "}
                    {item?.approved ? "Approved" : "Pending"}
                </div>
                <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={item?.complete ? "Complete" : "In Progress"}
                >
                    {item?.complete ? <Check /> : <HourGlass />}
                </div>
            </div>
        </div>
    );
};
export default WithdrawalItem;
