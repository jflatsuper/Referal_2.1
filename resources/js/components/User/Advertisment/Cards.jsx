import { Button } from "bootstrap";
import React, { useState } from "react";
import largeIcon from "../../../../../public/icons/EAZYEARN LOGO 64PX BLUE.svg";
import ChevDown from "../../icons/ChevDown";
const AdCard = ({ data }) => {
    return (
        <>
            {" "}
            <div className="row gx-5">
                {data?.map((item) => {
                    const image = JSON.parse(item?.image);
                    return (
                        <div className="col-md-4 col-lg-3 col-sm-12">
                            <div
                                className="card marketCard  "
                                style={{
                                    color: "black",
                                    cursor: "pointer",
                                    backgroundImage: `url(${image?.path})`,
                                    backgroundSize: "cover",
                                }}
                            >
                                <div
                                    className="card-body   justify-content-space-between"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        height: "100%",
                                        overflowX: "hidden",
                                    }}
                                >
                                    <div className=" advertCard">
                                        <div className="rowItem">
                                            <img
                                                src={largeIcon}
                                                class=""
                                                alt="..."
                                            />
                                            <div className="singleLine h4">
                                                {item?.name}
                                            </div>
                                        </div>
                                        <div
                                            className="rowItem 
                                            d-lg-none chev"
                                            style={{ justifyContent: "center" }}
                                        >
                                            <ChevDown />
                                        </div>
                                        <div
                                            className={`rowItem fourLineText description `}
                                        >
                                            {item?.description}
                                        </div>
                                    </div>

                                    {item.link && (
                                        <div className="rowItem">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    window.open(
                                                        item.link,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                Visit Link
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
           
        </>
    );
};
export default AdCard;
