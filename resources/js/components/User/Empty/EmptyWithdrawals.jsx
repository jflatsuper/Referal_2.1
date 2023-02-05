import React from "react";
import Archive from "../../icons/Archive";
const EmptyMessage = ({ status }) => {
    return (
        <>
            <div
                className="card rowItem"
                style={{ height: "200px", justifyContent: "center" }}
            >
                <div className="card-body ">
                    <div
                        className="rowItem"
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            gap:'10px'
                        }}
                    >
                        <h4>You have no {status} withdrawals</h4>{" "}
                        <h3><Archive /></h3>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EmptyMessage;
