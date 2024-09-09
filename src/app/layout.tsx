
//layout.ts 
"use client";
import React, { ReactNode } from 'react';
import Navbar from '@/components/navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../app/redux/store';
import FreeDelivery from '@/components/freeDelievery';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider>
              <FreeDelivery />
              <Navbar />
              {children}
              <Footer />
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}


