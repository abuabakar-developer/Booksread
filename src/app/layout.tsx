"use client";
import React, { ReactNode, useEffect } from 'react';
import Navbar from '@/components/navbar';
import './globals.css';
import 'aos/dist/aos.css'; // Import AOS styles
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../app/redux/store';
import FreeDelivery from '@/components/freeDelievery';
import AOS from 'aos'; // Import AOS

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000, // Duration of animation
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animation should happen only once
    });

    // Force light mode by removing 'dark' class if it exists
    document.documentElement.classList.remove('dark');
  }, []);

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

