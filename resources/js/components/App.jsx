import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import DefaultCard from "./cards/Card";

function App() {
    const [user, setUser] = useState();
    useLayoutEffect(() => {
        axios.get("/getCurrentUser").then((data) => {
            console.log(data);
            setUser(data.data);
        });
        return;
    }, []);
    return (
        <div>
            <div className="pb-5">
                <h3 className="welcomeName">Hello,<span style={{color:"orange"}}>{' '}{user?.first_name}{' '}{user?.surname}</span></h3>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%" }}>
                    <div className="row justify-content-flex-start pb-5 ">
                        <div className="col-md-5 ">
                            <DefaultCard />
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <DefaultCard />
                        </div>
                    </div>
                    <div className="row justify-content-flex-start pb-5 ">
                        <div className="col-md-5 ">
                            <DefaultCard />
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <DefaultCard />
                        </div>
                    </div>
                </div>
                <div
                    style={{ display: "flex", width: "50%" }}
                    className="card rounded shadow-sm homelargecard"
                >
                    <div className="card-body">I'm an example component!</div>
                </div>
            </div>
            <div
                style={{ display: "flex" }}
                className="card rounded shadow-sm "
            >
                <div className="card-body">I'm an example component!</div>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
