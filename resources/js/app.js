/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import "./bootstrap";

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import "./components/App";
import "./components/User/TransactionScreen";
import "./components/User/SettingsScreen";
import "./components/User/AdvertisementScreen";
import "./components/User/WithdrawalScreen";
import "./components/User/AffiliateScreen";
import "./components/User/ELearning";

import "./components/Admin/Home";
import "./components/Admin/TransactionScreen";
import "./components/Admin/VendCodeScreen";
import "./components/Admin/WithdrawalRequestScreen";
import "./components/Admin/UsersControlScreen";
import "./components/Admin/NotificationScreen";
import "./components/Admin/AdvertManagementScreen";
import axios from "axios";
import swal from "sweetalert";
const item = axios.interceptors.response.use(
    undefined,
    function (error) {
        if (error.response.status === 444) {
            return swal({
                title: error?.response?.data?.status,
                text: error?.response?.data?.message,
                icon: "error",
            });
        } else {
            return;
        }
    }
);
export default item;
