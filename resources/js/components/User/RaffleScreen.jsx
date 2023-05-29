import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Plus from "../icons/plus";
import RaffleGroup from "./Raffle/RaffleGroup";
import EmptyMessage from "./Empty/EmptyWithdrawals";
const RaffleScreen = () => {
    const [userRaffles, setUserRaffles] = useState([]);
    const onJoinRaffle = async () => {
        await axios
            .post("/joinRaffle")
            .then((data) => {
                return data
                    ? swal({
                          title: "Successfully Bought Raffle Ticket",
                          text: "Winner will be annouced shortly",
                          icon: "success",
                      }).then((item) => {
                          
                          window.location.reload(true);
                      })
                    : null;
            })
            
        return;
    };
    useEffect(() => {
        axios.get("/getRaffleTickets").then((data) => {
            setUserRaffles([...data.data]);
        });
    }, []);

    return (
        <div>
            <div
                className="rowItem"
                style={{
                    color: "orange",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h3 className="mb-0">Raffle Draw</h3>

                <button
                    className="rowItem btn btn-link"
                    onClick={(e) => {
                        e.preventDefault();
                        onJoinRaffle();
                    }}
                    type="button"
                    style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "orange",
                    }}
                >
                    <Plus />
                    <div>Join Raffle Draw</div>
                </button>
            </div>
            <div>
                <div>
                    <h4>
                        {" "}
                        Join the raffle draw with 3000 Eazy Points and stand a
                        chance to win prizes as decided by the Admin.
                    </h4>
                </div>
               
            </div>
            <div
                style={{
                    width: "100%",
                    color: "orange",
                }}
            >
                {userRaffles.length ? (
                    <RaffleGroup data={userRaffles} />
                ) : (
                    <EmptyMessage status={"current Raffle Tickets"} />
                )}
            </div>
        </div>
    );
};
export default RaffleScreen;
if (document.getElementById("raffle")) {
    const Index = ReactDOM.createRoot(document.getElementById("raffle"));
    Index.render(
        <React.StrictMode>
            <RaffleScreen />
        </React.StrictMode>
    );
}
