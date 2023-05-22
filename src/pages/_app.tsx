/* eslint-disable react/jsx-props-no-spreading */
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import store from '@/store';
import { checkAuthAction } from '@/store/api-actions';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({ subsets: ['latin'] });

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;

const cache = createCache({
  key: 'css',
  prepend: true,
});

store.dispatch(checkAuthAction());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <GoogleOAuthProvider clientId={clientId}>
          <div className={montserrat.className}>
            <Component {...pageProps} />
            <ToastContainer />
          </div>
        </GoogleOAuthProvider>
      </CacheProvider>
    </Provider>
  );
}
