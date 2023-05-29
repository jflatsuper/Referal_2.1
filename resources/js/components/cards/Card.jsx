import React from "react";

const DefaultCard = ({props}) => {
    return (
        <div className="card rounded shadow-sm largecard">
            <div><img src="https://img.icons8.com/material-rounded/16/null/naira.png"/>5000

</div>
            <div className="card-body">{props?.ref_link}!</div>
        </div>
    );
};
export default DefaultCard;
