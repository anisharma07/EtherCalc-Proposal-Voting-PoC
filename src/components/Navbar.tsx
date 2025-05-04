import React, { useEffect } from "react";
import { IonHeader, IonToolbar, IonTitle, IonCard } from "@ionic/react";
import WalletConnectButton from "./WalletConnectButton";
import { useHistory } from "react-router-dom";
import { useAccount } from "wagmi";
import { useMyBalance } from "../hooks/useMyBalance";

const Navbar: React.FC = () => {
  const { address: currentUser } = useAccount();
  const { balance } = useMyBalance({ userAddress: currentUser });
  const [tokens, setTokens] = React.useState<number>(0);

  useEffect(() => {
    if (balance) {
      setTokens(Number(balance) / 10 ** 18);
    }
  }, [balance]);
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

          <IonCard
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <IonCard
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IonTitle
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#ffffff",
                  padding: "0 7px",
                }}
              >
                {tokens}{" "}
              </IonTitle>
              <svg
                width="30"
                height="30"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  stroke="#C17000"
                  stroke-width="10"
                  fill="none"
                />
                <rect
                  x="75"
                  y="40"
                  width="50"
                  height="120"
                  rx="5"
                  fill="#C17000"
                />
                <rect
                  x="40"
                  y="75"
                  width="120"
                  height="50"
                  rx="5"
                  fill="#C17000"
                />
              </svg>
            </IonCard>
            <WalletConnectButton />
          </IonCard>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
