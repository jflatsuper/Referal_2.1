import React from "react";
import ReactDOM from "react-dom/client";
const SettingsScreen = () => {
    return (
        <>
            <div>This is the settings page</div>
        </>
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
