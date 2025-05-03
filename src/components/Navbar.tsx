import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import WalletConnectButton from "./WalletConnectButton";
import { useHistory } from "react-router-dom";

const Navbar: React.FC = () => {
  const history = useHistory();
  return (
    <IonHeader>
      <IonToolbar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IonTitle
            onClick={() => history.push(`/`)}
            style={{ cursor: "pointer" }}
          >
            EtherCalc Voting
          </IonTitle>
          {/* <ProposalModal /> */}
          <WalletConnectButton />
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
