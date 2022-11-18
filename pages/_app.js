import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          background: '#d7d8df',
          p: 50,
          color: 'gray.600',
          lineHeight: 'tall',
        },
        a: {
          color: 'teal.500',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
