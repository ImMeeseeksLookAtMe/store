import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HbOtDHYHI59HaIb4ig9EBtFD5e0RAiRI6xj1imqZNXdm6JFWmPyHpRt3yXhmowPTrW2SotoyvZpMzwiIia3786b00z38LPqxF';
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please, make sure you use the provided credit card.');
        });
    }
    
    return (
        <StripeCheckout
            label='Pay Now'
            name='Barut BB'
            currency="EUR"
            billingAddress
            shippingAddress
            description={`Your total is ${price}€`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            />
    )
}

export default StripeCheckoutButton;
