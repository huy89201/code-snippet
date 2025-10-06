'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import moment from 'moment';
import 'moment/locale/vi';

const DEFAULT_LANGUE = localStorage.getItem('lang');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(DEFAULT_LANGUE ?? 'en');
    moment.locale('en');
  }, []);
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

export default AuthProvider;
