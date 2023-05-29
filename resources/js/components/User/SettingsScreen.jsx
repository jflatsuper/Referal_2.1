import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import link from "../../../../public/icons/link.svg";
import ReactDOM from "react-dom/client";
import AccountEditForm from "./forms/EditAccountForm";
import UserEditForm from "./forms/EditUserForm";
const SettingsScreen = () => {
    const [user, setUser] = useState();
    const [toggle, setToggle] = useState(true);
    const [toggle1, setToggle1] = useState(true);
    useLayoutEffect(() => {
        axios.get("/getUserAccount").then((data) => {
            console.log(data);
            setUser(data.data);
        });
        return;
    }, []);
   
    return (
        <div className="mainSetting">
            <div>
                <h3>User Profile</h3>
            </div>

            <div>
                <button
                    type="button"
                    className="btn btn-md btn-warning editbtn"
                    onClick={() => setToggle(!toggle)}
                >
                    Edit User Information
                </button>
            </div>
            <div>
                {toggle ? (
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
                ) : (
                    <UserEditForm {...user}/>
                )}
            </div>

            <div className="pt-5">
                <button
                    type="button"
                    className="btn btn-md btn-warning editbtn"
                    onClick={() => setToggle1(!toggle1)}
                >
                    Edit Account Details
                </button>
            </div>
            {toggle1 ? (
                <div className=" py-3 px-3 bg-white rounded settingsCard">
                    <div className="contactGap">
                        <div>Bank</div>{" "}
                        <div>
                            {user?.bank??'Unavailable'}
                        </div>
                    </div>
                    <div className="contactGap">
                        <div>Account Number</div> <div>{user?.account_num??'Unavailable'}</div>
                    </div>
                    <div className="contactGap">
                        <div>Account Name</div>{" "}
                        <div>
                            {user?.account_name??'N/A'}
                        </div>
                    </div>
                    
                </div>
            ) : (
                <AccountEditForm {...user}  />
            )}
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
