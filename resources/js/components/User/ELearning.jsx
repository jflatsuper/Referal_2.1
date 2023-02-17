import React from "react";
import ReactDOM from "react-dom/client";

import link from "../../../../public/icons/EAZYEARN LOGO 24PX WHITE.svg";
const ELearningScreen = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div
                className="rowItem"
                style={{ color: "orange", justifyContent: "space-between" }}
            >
                <div
                    className="rowItem"
                    style={{ gap: "20px", alignItems: "center" }}
                >
                    <img src={link} />
                    <h3 className="m-0">E-Learning Courses</h3>
                </div>
            </div>
            <div
                className="card bg-dark p-3"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <div>
                    <h4 style={{ color: "orange" }}>
                        Eazy Earn Affiliate Marketing Course
                    </h4>
                </div>
                <div>
                    Make good money with afffiliate Marketing. Come learn the
                    basics and start making good money. Learn the right way to
                    insure yourself against affiliate fraud.
                </div>
                <div>This course is provided by Recast TV.</div>
                <div>
                    <a href={"https://t.me/makeitwithaffiliate"}>
                        Click here to join now {">>"}
                    </a>
                </div>
            </div>

            <div
                className="card bg-dark p-3"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <div>
                    <h4 style={{ color: "orange" }}>
                        Digital Marketing and Branding
                    </h4>
                </div>
                <div style={{ color: "lightgray" }}>
                    Course is fully booked. Please stay tuned for 100+ more
                    slots in this course
                </div>
                <div style={{ color: "lightgray" }}>
                    This course is provided by HADES MEDIA.
                </div>
                <div>
                    <a
                        role={"link"}
                        aria-disabled="true"
                        style={{ cursor: "not-allowed", color: "lightgray" }}
                    >
                        Click here to join now {">>"}
                    </a>
                </div>
            </div>
        </div>
    );
};
export default ELearningScreen;
if (document.getElementById("e_learning")) {
    const Index = ReactDOM.createRoot(document.getElementById("e_learning"));

    Index.render(
        <React.StrictMode>
            <ELearningScreen />
        </React.StrictMode>
    );
}
