import React from "react";
import RaffleItem from "./RaffleItem";
const RaffleGroup = ({ data }) => {
    return (
        <div  style={{display:"flex",flexDirection:"column",gap:'20px'}}>
            {data.map((item) => {
               return <RaffleItem item={item} key={item.id}/>;
            })}
        </div>
    );
};
export default RaffleGroup