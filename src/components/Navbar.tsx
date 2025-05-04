import React, { useEffect } from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import WalletConnectButton from "./WalletConnectButton";
import { useHistory } from "react-router-dom";
import { useMyBalance } from "../hooks/proposalFactory";

const Navbar: React.FC = () => {
  const { data, isLoading } = useMyBalance();
  useEffect(() => {
    console.log("data", data);
  }, [data]);
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
            EtherCalc Voting {data}
          </IonTitle>
          {/* <ProposalModal /> */}
          <WalletConnectButton />
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
