import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useLayoutEffect } from "react";
import link from "../../../../public/icons/link.svg";
import ReactDOM from "react-dom/client";
const SettingsScreen = () => {
    const [user, setUser] = useState();
    useLayoutEffect(() => {
        axios.get("/getUserAccount").then((data) => {
            console.log(data);
            setUser(data.data);
        });
        return;
    }, []);
    const formikProps = useFormik({
        initialValues: "",
        onSubmit: () => {},
        enableReinitialize: true,
    });
    return (
        <div className="mainSetting">
            <div>
                <h3>User Profile</h3>
            </div>

            <div>
                <button
                    type="button"
                    className="btn btn-md btn-warning editbtn"
                >
                    Edit User Information
                </button>
            </div>
            <div>
                <div className=" py-3 px-3 bg-white rounded settingsCard">
                    <div className="contactGap">
                        <div>Name</div>{" "}
                        <div>
                            {user?.first_name} {user?.surname}
                        </div>
                    </div>
                    <div className="contactGap">
                        <div>Username</div> <div>{user?.username}</div>
                    </div>
                    <div className="contactGap">
                        <div>Referee</div>{" "}
                        <div>
                            {user?.refName} {user?.refSurname}
                        </div>
                    </div>
                    <div className="contactGap">
                        <div>Email</div> <div>{user?.email}</div>
                    </div>
                    <div className="contactGap">
                        <div>Referal Code</div> <div>{user?.ref_link}</div>
                    </div>
                </div>
                
                {/* <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        disabled
                        value={user?.email}
                    />
                   
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                    />
                </div>
                
            </form> */}
            </div>

            <div className="pt-5">
                    <button
                        type="button"
                        className="btn btn-md btn-warning editbtn"
                    >
                        Edit Account Details
                    </button>
                </div>

                <div className=" py-3 px-3 bg-white rounded settingsCard">
                    <div className="contactGap">
                        <div>Name</div>{" "}
                        <div>
                            {user?.first_name} {user?.surname}
                        </div>
                    </div>
                    <div className="contactGap">
                        <div>Username</div> <div>{user?.username}</div>
                    </div>
                    <div className="contactGap">
                        <div>Referee</div>{" "}
                        <div>
                            {user?.refName} {user?.refSurname}
                        </div>
                    </div>
                    <div className="contactGap">
                        <div>Email</div> <div>{user?.email}</div>
                    </div>
                    <div className="contactGap">
                        <div>Referal Code</div> <div>{user?.ref_link}</div>
                    </div>
                </div>
        </div>
    );
};
export default SettingsScreen;
if (document.getElementById("user-settings")) {
    const Index = ReactDOM.createRoot(document.getElementById("user-settings"));

    Index.render(
        <React.StrictMode>
            <SettingsScreen />
        </React.StrictMode>
    );
}
