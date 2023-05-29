import React from "react";
import WithdrawalItem from "./WithdrawalItem";
const WithdrawalGroup = ({ data }) => {
    return (
        <div  style={{display:"flex",flexDirection:"column",gap:'20px'}}>
            {data.map((item) => {
               return <WithdrawalItem item={item} />;
            })}
        </div>
    );
};
export default WithdrawalGroup