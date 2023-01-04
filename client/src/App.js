import './App.css';
import GooglePayButton from '@google-pay/button-react';
import Graph from './components/Graph';
import Form from './components/Form';


function App() {
  return (
  <div className="App">
    <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">Expense Tracker</h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 gap-4">
          {/* Chart */}
          <Graph/>
          {/* Form */}
          <Form/>
      </div>
    </div>
    <div>
    <GooglePayButton
        environment="TEST"
        buttonSizeMode='fill'
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1.00',
            currencyCode: 'INR',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success!', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
          console.log('Payment authorised success', paymentData)
          return { transactionState: 'SUCCESS' }
        }}
        existingPaymentMethodRequired='false'
        buttonColor='black'
        buttonType='plain'
      />
    </div>
  </div>
  );
}

export default App;
