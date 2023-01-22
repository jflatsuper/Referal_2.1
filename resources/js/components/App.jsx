import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return (
        <div style={{ width: "100%", backgroundColor: "yellow" }}>
            {/* <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card rounded">

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div> */}
            <div className="row justify-content-center pb-5 ">
                <div className="col-md-5 ">
                    <div className="card rounded shadow-sm">
                        <div className="card-body">
                            I'm an example component!
                        </div>
                    </div>
                </div>
                <div className="col-md-5 offset-md-2">
                    <div className="card rounded">
                        <div className="card-body">
                            I'm an example component!
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-space-between">
                <div className="col-md-5">
                    <div className="card rounded">
                        <div className="card-body">
                            I'm an example component!
                        </div>
                    </div>
                </div>
                <div className="col-md-5 offset-md-2">
                    <div className="card rounded">
                        <div className="card-body">
                            I'm an example component!
                        </div>
                    </div>
                </div>
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
