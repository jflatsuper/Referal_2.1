import React from "react";
import ReactDOM from "react-dom/client";
const ELearningScreen = () => {
    return <div></div>;
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
