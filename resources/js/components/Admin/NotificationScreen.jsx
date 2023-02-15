import React from "react";
import ReactDOM from "react-dom/client";
const NotificationScreen = () => {
    return <div>This is it</div>;
};
export default NotificationScreen;
if (document.getElementById("notif")) {
    const Index = ReactDOM.createRoot(document.getElementById("notif"));

    Index.render(
        <React.StrictMode>
            <NotificationScreen />
        </React.StrictMode>
    );
}
