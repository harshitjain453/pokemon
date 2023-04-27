 import '@/styles/globals.css'
 import Head from 'next/head';
 import 'bootstrap/dist/css/bootstrap.min.css';
//  import 'bootstrap/dist/css/bootstrap.css';
//  import 'bootstrap/dist/js/bootstrap.js';
// import 'bootstrap/dist/js/bootstrap.bundle.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App({ Component, pageProps }) {
  
  
  return (
  <>
 
  <Component {...pageProps} /> 
  </>
  );
}
