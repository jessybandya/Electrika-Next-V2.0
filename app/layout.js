"use client"

import './globals.css';
import FloatingButton from "@components/Floating-Button";
// import { SoftUIControllerProvider } from "@context";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import { store, persistor  } from '@auth/redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
// import "react-multi-carousel/lib/styles.css";
// import CartProvider from '@auth/store/CartProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@components/Footer';
import Header from '@components/Header';



export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
    <head>
    <link rel="shortcut icon" type="image/x-icon" href="/media/images/favicon.ico" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800&amp;display=swap" rel="stylesheet" />

    <link
    href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
    rel="stylesheet"
  />

    </head>
      <body>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Header />
      <ToastContainer />
        {children}
      <FloatingButton phoneNumber={`+254713441634`}/>
      <Footer/>
      </PersistGate>
      </Provider>
      </body>
    </html>
  )
}
