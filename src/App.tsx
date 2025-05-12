import { setupIonicReact } from "@ionic/react";
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

import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
setupIonicReact();

import React from "react";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // <-- Add this import
import Election from "./pages/Election";
import Navbar from "./components/Navbar";

console.log(import.meta.env.VITE_CLOUD_CONNECT_PROJECT_ID);
const config = getDefaultConfig({
  appName: "EtherCalcPoc",
  chains: [sepolia],
  projectId: import.meta.env.VITE_CLOUD_CONNECT_PROJECT_ID,
});
const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    {" "}
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <Navbar />
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/election">
            <Election />
          </Route>
        </Router>
      </RainbowKitProvider>
    </WagmiProvider>
  </QueryClientProvider>
);

export default App;
