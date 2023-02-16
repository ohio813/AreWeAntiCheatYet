import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Shell } from '../components/Shell';
import { cookieOptions } from '../src/static';
import { SettingsProvider } from '../src/static/state';
import theme from '../src/static/theme';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) => {
    const scheme = value || (colorScheme == 'dark' ? 'light' : 'dark');
    setCookie('theme', scheme, cookieOptions);
    setColorScheme(scheme);
  };

  useEffect(() => {
    toggleColorScheme((getCookie('theme') as ColorScheme) || 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = colorScheme;
  }, [colorScheme]);

  return (
    <>
      <Head>
        <title>Are We Anti-Cheat Yet?</title>
        <link rel="shortcut icon" href="/icon.webp" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme, ...theme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <SettingsProvider>
              <ModalsProvider>
                <Shell>
                  <Component {...pageProps} />
                </Shell>
              </ModalsProvider>
            </SettingsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
