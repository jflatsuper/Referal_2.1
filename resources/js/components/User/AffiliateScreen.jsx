import React from "react";
import ReactDOM from "react-dom/client";
const AffiliateScreen = () => {
    return <div>This is it</div>;
};
export default AffiliateScreen;
if (document.getElementById("affiliate")) {
    const Index = ReactDOM.createRoot(document.getElementById("affiliate"));

    Index.render(
        <React.StrictMode>
            <AffiliateScreen />
        </React.StrictMode>
    );
}
