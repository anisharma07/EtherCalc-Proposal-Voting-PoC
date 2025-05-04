import { useEffect, useState } from "react";
import {
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonDatetime,
} from "@ionic/react";
import { add, refresh } from "ionicons/icons";
import { useAccount, useWriteContract } from "wagmi";
import { convertToUTCTimestamp } from "../helper/dateFormat";
import { proposalFactoryAddress } from "../abi/contracts";
import { proposalFactoryABI } from "../abi/proposalFactory/abi";
import { useMyBalance } from "../hooks/useMyBalance";
const ProposalForm = () => {
  const { writeContractAsync, isPending } = useWriteContract();

  const { address: currentUser } = useAccount();
  const { balance } = useMyBalance({ userAddress: currentUser });
  const [tokens, setTokens] = useState<number>(0);

  useEffect(() => {
    if (balance) {
      setTokens(Number(balance) / 10 ** 18);
    }
  }, [balance]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sheetKey, setSheetKey] = useState("");

  const handleCreateProposal = async () => {
    const utcTimestamp = convertToUTCTimestamp(startDate);
    const utcEndTimestamp = convertToUTCTimestamp(endDate);

    try {
      if (tokens < 1) {
        throw new Error("You need at least 1 token to create a proposal.");
      }
      if (title == "" || description == "") {
        throw new Error("Title and description are required.");
      }

      if (sheetKey === "") {
        throw new Error("Sheet key cannot be empty.");
      }

      if (utcTimestamp * 1000 - Date.now() < 0) {
        throw new Error("Start date must be in the future.");
      }

      if (utcEndTimestamp < utcTimestamp) {
        throw new Error("End time cannot be before the start time.");
      }
      const obj = {
        startTime: BigInt(utcTimestamp),
        endTime: BigInt(utcEndTimestamp),
        name: title,
        description,
        sheetKey,
      };
      await writeContractAsync({
        address: proposalFactoryAddress,
        abi: proposalFactoryABI,
        functionName: "createProposal",
        args: [obj],
      });
      setTitle("");
      setDescription("");
      setSheetKey("");
      setStartDate("");
      setEndDate("");
      setIsModalOpen(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      alert("Error: " + errorMsg);
    }
  };

  const loadRandomSheet = () => {
    console.log("Loading random sheet...");
    const randomSheetId = Math.random().toString(36).substring(2, 10);
    const key = "ethercalc-proposal-" + randomSheetId;
    setSheetKey(key);
  };

  return (
    <>
      <IonButton
        style={{ padding: "8px 16px", width: "auto" }}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {!isModalOpen && <IonIcon slot="start" icon={add} />}
        {isModalOpen ? "Cancel" : "Create Proposal"}
      </IonButton>
      {isModalOpen && (
        <div style={{ padding: "20px" }}>
          <h3>Create New Proposal</h3>
          <IonInput
            placeholder="Proposal Title"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
          <IonTextarea
            placeholder="Proposal Description"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <h3>Start Date: </h3>

            <IonDatetime
              presentation="date-time"
              value={startDate}
              onIonChange={(e) => {
                const selectedDate = e.detail.value as string;
                setStartDate(selectedDate);
              }}
              style={{ marginTop: "10px" }}
            />
            <h3>End Date: </h3>

            <IonDatetime
              presentation="date-time"
              value={endDate}
              onIonChange={(e) => {
                const selectedDate = e.detail.value as string;
                setEndDate(selectedDate);
              }}
              style={{ marginTop: "10px" }}
            />
          </div>
          <IonButton
            expand="block"
            color="primary"
            onClick={() => loadRandomSheet()}
            style={{ marginTop: "10px" }}
          >
            <IonIcon slot="start" icon={refresh} />
            Generate Sheet
          </IonButton>
          {sheetKey && (
            <div style={{ marginTop: "20px" }}>
              <h4>Proposal Data Sheet</h4>
              <iframe
                src={`https://ethercalc.net/${sheetKey}`}
                title="EtherCalc Sheet"
                style={{
                  width: "100%",
                  height: "600px",
                  border: "1px solid #ccc",
                }}
              ></iframe>
            </div>
          )}
          {isPending ? (
            <IonButton expand="block">Creating Proposal...</IonButton>
          ) : (
            <IonButton expand="block" onClick={handleCreateProposal}>
              Create Proposal
            </IonButton>
          )}
          <IonButton
            expand="block"
            color="light"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </IonButton>
        </div>
      )}
    </>
  );
};

export default ProposalForm;
