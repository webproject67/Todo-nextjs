/* eslint-disable react/jsx-props-no-spreading */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}
