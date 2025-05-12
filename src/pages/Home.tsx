import React from "react";
import { IonPage, IonContent } from "@ionic/react";

import "./Home.css";
import { useAllProposals } from "../hooks/proposalFactory";
import ProposalForm from "../components/ProposalForm";
import ProposalInfo from "../components/ProposalInfo";

const Home: React.FC = () => {
  const {
    data: proposalsAddresses,
    isLoading,
    error,
  } = useAllProposals() as {
    data: `0x${string}`[];
    isLoading: boolean;
    error: Error | null;
  };

  return (
    <IonPage style={{ marginTop: "50px" }}>
      <IonContent className="ion-padding">
        <h2>🧾 Welcome to the EtherCalc Voting</h2>
        <ProposalForm />

        <h3 style={{ marginTop: "2rem" }}>All Proposals</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {proposalsAddresses &&
          [...proposalsAddresses].reverse().map((p, index) => {
            return (
              <ProposalInfo key={index} proposalAddress={p} index={index} />
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default Home;
