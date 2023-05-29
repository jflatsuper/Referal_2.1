import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import wallet from "../../../../../public/icons/wallet.svg";
import check from "../../../../../public/icons/check.svg";
import Check from "../../icons/Check";
import HourGlass from "../../icons/HourGlass";
dayjs.extend(relativeTime);
const RaffleItem = ({ item }) => {
    const date=new Date(item.expiry_date)

    return (
        <div className="card bg-light  rowItem">
            <div
                style={{
                    backgroundColor: "lightgray",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    height: "100%",
                }}
                className="px-3 py-3"
            >
                <img src={wallet} />
            </div>
            <div
                className="card-body py-0 rowItem"
                style={{ justifyContent: "space-between", flexWrap: "wrap" }}
            >
                <div style={{ color: "black" }}>
                    <b>Created :</b>{" "}
                    {dayjs(item.created_at).format("DD/MM/YYYY")}
                </div>
                <div style={{ color: "black" }}>
                    <b>Ticket :</b> N{item?.id}
                </div>

                <div>
                    <b style={{ color: "black" }}>Status:</b>{" "}
                    {Date.now() > date.getTime() ? "Completed" : "Pending"}
                </div>
                <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={item?.won ? "" : "In Progress"}
                >
                    {Date.now() < date.getTime()? (
                        <HourGlass />
                    ) : item.item?.won ? (
                        <div>
                            Won <Check />
                        </div>
                    ) : (
                        <div>Lost</div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default RaffleItem;
