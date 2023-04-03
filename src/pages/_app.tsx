/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
