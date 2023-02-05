import { Button } from "bootstrap";
import React from "react";
import largeIcon from "../../../../../public/icons/EAZYEARN LOGO 64PX BLUE.svg";
const AdCard = ({ data }) => {
    return (
        <>
            {" "}
            <div className="row g-5">
                {data?.map((item) => {
                    return (
                        <div className="col-md-4 col-lg-3 col-sm-12">
                            <div
                                className="card marketCard  "
                                style={{ color: "black", cursor: "pointer" }}
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

                                    <div className="rowItem twoLineText">
                                        {item?.description}
                                    </div>
                                    {item.link && (
                                        <div className="rowItem">
                                            <button className="btn btn-outline-primary" onClick={()=>window.open(item.link,'_blank')}>
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
            <div className="pt-5 rowItem justify-content-center">
                <button
                    type="button"
                    className="btn btn-md btn-warning editbtn"
                >
                    Load More
                </button>
            </div>
        </>
    );
};
export default AdCard;
