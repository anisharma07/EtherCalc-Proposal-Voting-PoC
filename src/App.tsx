// import { Redirect, Route } from "react-router-dom";
import { setupIonicReact } from "@ionic/react";
// import { IonReactRouter } from "@ionic/react-router";
// import Home from "./pages/Home";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
// import "@ionic/react/css/ionic.bundle.css";
// import "@ionic/react/css/ionic.css";

import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
setupIonicReact();

import React from "react";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // <-- Add this import
import Election from "./pages/Election";
import Navbar from "./components/Navbar";
// Use RainbowKit's getDefaultConfig for easy setup
console.log(import.meta.env.VITE_CLOUD_CONNECT_PROJECT_ID);
const config = getDefaultConfig({
  appName: "EtherCalcPoc",
  chains: [sepolia],
  projectId: import.meta.env.VITE_CLOUD_CONNECT_PROJECT_ID, // <-- Replace with your WalletConnect Project ID
});
const queryClient = new QueryClient(); // <-- Create a QueryClient instance

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    {" "}
    {/* <-- Wrap everything */}
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <Router>
          <Route exact path="/home">
            <Navbar />
            <Home />
            {/* <WalletConnectButton /> */}
          </Route>
          <Route exact path="/election/:electionId">
            <Navbar />

            <Election />
          </Route>
          <Route exact path="/election">
            <Navbar />

            <Election />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Router>
      </RainbowKitProvider>
    </WagmiProvider>
  </QueryClientProvider>
);

export default App;
