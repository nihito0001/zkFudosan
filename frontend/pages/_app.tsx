import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Web3ReactProvider } from '@web3-react/core';
import {SSRProvider} from '@react-aria/ssr';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';

const POLLING_INTERVAL = 12000;

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: 'dark',
  });

  const getLibrary = (provider: ExternalProvider): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
  };

  return (
    <>
        <Web3ReactProvider getLibrary={getLibrary}>
          <NextUIProvider theme={theme}>
            <SSRProvider>
              <Component {...pageProps} />
            </SSRProvider>
          </NextUIProvider>
        </Web3ReactProvider>
    </>
  );
}
