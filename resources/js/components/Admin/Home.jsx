import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
function HomePage() {
    const [values, setValue] = useState([]);
    useEffect(() => {
         axios
            .get("/getAllUsers")
            .then((res) => setValue(res.data));
    }, []);

    return (
        <>
            <div>{values.map(item=>item?.first_name)}</div>
            <div>{values.map(item=>item?.user_type)}</div>
        </>
    );
}
export default HomePage;

if (document.getElementById("homepage")) {
    const Index = ReactDOM.createRoot(document.getElementById("homepage"));

    Index.render(
        <React.StrictMode>
            <HomePage />
        </React.StrictMode>
    );
}
