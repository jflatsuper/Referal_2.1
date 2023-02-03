import React from 'react'
import ReactDOM from "react-dom/client";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
const WithdrawalScreen=()=>{
    
    const config = {
        public_key: 'FLWPUBK_TEST-c6065db888e7db229f9657428483b4bc-X',
        tx_ref: Date.now(),
        amount: 100,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'user@gmail.com',
           phone_number: '070********',
          name: 'john doe',
        },
        customizations: {
          title: 'my Payment Title',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
      const handleFlutterPayment = useFlutterwave(config);
    return (
        <div className="App">
        <h1>Hello Test user</h1>
   
         <button
           onClick={() => {
             handleFlutterPayment({
               callback: (response) => {
                  console.log(response);
                   closePaymentModal() // this will close the modal programmatically
               },
               onClose: () => {},
             });
           }}
         >
           Payment with React hooks
         </button>
       </div>
    )
}
export default WithdrawalScreen
if (document.getElementById("withdrawal")) {
    const Index = ReactDOM.createRoot(document.getElementById("withdrawal"));

    Index.render(
        <React.StrictMode>
            <WithdrawalScreen />
        </React.StrictMode>
    );
}


  



  