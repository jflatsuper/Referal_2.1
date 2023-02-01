import React from "react";
const AdCard = ({ data }) => {
    return (
        <>
            {" "}
            <div className="row g-5">
                {data?.map((item) => {
                    return (
                        <div className="col-md-4 col-lg-3 col-sm-12">
                            <div
                                className="card marketCard"
                                style={{ color: "black" }}
                            >
                                {item?.name}
                                {item?.description}
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
