/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import type { AppProps } from 'next/app';
import store from '@/store';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </Provider>
  );
}
