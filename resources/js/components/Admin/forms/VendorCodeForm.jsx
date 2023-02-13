import React, { useCallback, useState } from "react";
import axios from "axios";
const VendorCreateForm = ({ vendors }) => {
    const [currentVendor, setCurrentVendor] = useState(null);
    const onCreateCode = useCallback(
        (number = 1) => {
            axios
                .post("/createVendorCodes", {
                    vendor: currentVendor,
                    " number": number,
                })
                .then((value) => {
                    console.log(value);
                    return value;
                });
        },
        [currentVendor]
    );
    return (
        <div>
            <form>
                <div>
                    <div className="row">
                        {" "}
                        click this button and select a vendor to create a code
                        of him
                    </div>
                    <input className="form-control" />
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-danger dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Vendors
                        </button>

                        <div class="dropdown-menu">
                            {vendors?.map((item) => (
                                <a
                                    key={item.id}
                                    class="dropdown-item"
                                    onClick={() => setCurrentVendor(item.id)}
                                >
                                    {item?.first_name} {item?.surname}
                                </a>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => onCreateCode()}
                        className="btn btn-primary"
                    >
                        Create code
                    </button>
                </div>
            </form>
        </div>
    );
};
export default VendorCreateForm;
