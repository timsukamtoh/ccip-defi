"use client";

import { useEffect, useState } from "react";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
//import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
//import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
//import { Header } from "~~/components/Header";
//import { BlockieAvatar } from "~~/components/scaffold-eth";
import { Navbar } from "~~/components/Navbar";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

//import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  // const { resolvedTheme } = useTheme();
  // const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  mounted;
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <ProgressBar />
      {/*
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
      >
        <ScaffoldEthApp>{children}</ScaffoldEthApp>
      </RainbowKitProvider>
  
      <MetaMaskUIProvider
        sdkOptions={{
          dappMetadata: {
            name: "Example React UI Dapp",
            url: window.location.href,
          },
          // Other options
        }}>
*/}
      <MetaMaskUIProvider
        sdkOptions={{
          dappMetadata: {
            name: "Example React UI Dapp",
          },
          // Other options
        }}
      >
        <ScaffoldEthApp>{children}</ScaffoldEthApp>
      </MetaMaskUIProvider>
    </WagmiConfig>
  );
};
