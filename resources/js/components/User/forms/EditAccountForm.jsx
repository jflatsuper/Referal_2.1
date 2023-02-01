import React from "react";
import axios from "axios";
import { useFormik } from "formik";
const AccountEditForm = ({ account_name, account_num, bank }) => {
    const formikProps = useFormik({
        initialValues: {
            account_name:"",
            account_num:"",
            bank:""
        },
        onSubmit: () => {},
        enableReinitialize: true,
    });
    return (
        <form>
            <div class="row g-2">
                <div class="col-md">
                    <div class="form-floating">
                        <input
                            type="text"
                            class="form-control"
                            id="floatingInputGrid"
                            placeholder="name@example.com"
                            value={''}
                        />
                        <label for="floatingInputGrid">Account Name</label>
                    </div>
                </div>
                <div class="col-md">
                    <div class="form-floating">
                        <select
                            class="form-select"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                        >
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label for="floatingSelectGrid">
                            Works with selects
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default AccountEditForm;
