import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { formatTimestamp } from "../helper/dateFormat";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonNote,
  IonBadge,
  IonButton,
} from "@ionic/react";
// Add at the top with other imports
import { useAccount } from "wagmi";
import {
  useFreeze,
  useMiniNoVotes,
  useMiniOwnerInfo,
  useMiniProposalInfo,
  useMiniYesVotes,
} from "../hooks/getProposalDataMini";
import { proposalABI } from "../contracts";
import { useWriteContract } from "wagmi";

// ...inside your Election component...

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Proposal {
  title: string;
  description: string;
  owner: string;
  sheetKey: string;
  start: number;
  end: number;
  votesFor?: number;
  votesAgainst?: number;
  frozen?: number;
}

const Election: React.FC = () => {
  const { writeContractAsync, isPending } = useWriteContract();

  const { electionId } = useParams<{ electionId?: string }>();
  const query = useQuery();
  const queryElectionId = query.get("id");
  const proposalAddress = (electionId ||
    queryElectionId ||
    "0x34346544334325") as `0x${string}`;
  const { address: currentUser } = useAccount();
  const { proposalInfo, isLoading, error } = useMiniProposalInfo({
    proposalAddress: proposalAddress,
  });
  const { owner } = useMiniOwnerInfo({
    proposalAddress: proposalAddress,
  });
  const { yesVotes } = useMiniYesVotes({
    proposalAddress: proposalAddress,
  });
  const { noVotes } = useMiniNoVotes({
    proposalAddress: proposalAddress,
  });
  const { freeze } = useFreeze({
    proposalAddress: proposalAddress,
  });
  const [p, setP] = useState<Proposal>();

  useEffect(() => {
    if (Array.isArray(proposalInfo) && proposalInfo.length > 0) {
      const fetchData = async () => {
        const [startTime, endTime, title, description, sheetKey] =
          proposalInfo as [bigint, bigint, string, string, string];

        const proposal: Proposal = {
          owner: owner as string,
          title: title,
          description: description,
          sheetKey,
          start: Number(startTime),
          end: Number(endTime),
          votesFor: yesVotes ? Number(yesVotes) : 0,
          votesAgainst: noVotes ? Number(noVotes) : 0,
          frozen: freeze ? Number(freeze) : 0,
        };
        setP(proposal);
      };
      fetchData();
    }
  }, [proposalInfo, owner, yesVotes, noVotes, proposalAddress, freeze]);
  const handleVote = async (val: boolean) => {
    try {
      await writeContractAsync({
        address: proposalAddress,
        abi: proposalABI,
        functionName: "vote",
        args: [val],
      });

      alert("Vote submitted!");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      alert("Error: " + errorMsg);
    }
  };
  const handleVoteFreeze = async () => {
    try {
      await writeContractAsync({
        address: proposalAddress,
        abi: proposalABI,
        functionName: "freeze",
        args: [],
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      alert("Error: " + errorMsg);
    }
  };
  // useEffect(() => {
  //   console.log(p);
  //   console.log("Proposal Address: ", formatTimestamp(p?.start));
  // }, [p]);

  if (isLoading) {
    return (
      <IonCard>
        <IonCardContent>Loading...</IonCardContent>
      </IonCard>
    );
  }

  if (!p || error) {
    return (
      <IonCard>
        <IonCardContent>No data found.</IonCardContent>
      </IonCard>
    );
  }

  // UI logic
  const now = Date.now();
  const votingOver = p.end !== 0 && p.end * 1000 < now;

  return (
    <IonCard style={{ overflow: "auto", borderRadius: "12px", margin: "16px" }}>
      <IonCardHeader
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "32px 24px 16px 24px",
          borderRadius: "12px 12px 0 0",
          border: "1px solid #ccc",
        }}
      >
        <div>
          <IonCardTitle
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: 8,
              color: "#fff",
              letterSpacing: "0.5px",
            }}
          >
            {p.title}
          </IonCardTitle>
          <IonNote
            style={{
              display: "block",
              fontSize: "1rem",
              color: "#f5f5f5",
              marginBottom: 12,

              fontWeight: 400,
            }}
          >
            Owner:{" "}
            <b style={{ color: "#dddddd", fontWeight: 600 }}>
              {p?.owner.substring(0, 12) + "..."}
            </b>
          </IonNote>
          <IonNote
            style={{
              display: "block",
              fontSize: "1.1rem",
              color: "#f5f5f5",
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            Description: {p.description}
          </IonNote>
        </div>
        <div>
          <IonBadge color="primary" style={{ margin: 16, padding: 10 }}>
            Start Date: {formatTimestamp(p.start)}
          </IonBadge>
          <IonBadge color="primary" style={{ margin: 16, padding: 10 }}>
            End Date: {formatTimestamp(p.end)}
          </IonBadge>
        </div>
      </IonCardHeader>
      <IonCardContent>
        {p.start * 1000 - Date.now() <= 0 && (
          <div>
            {isPending && (
              <IonButton color="medium" style={{ margin: 16 }} disabled={true}>
                Processing...
              </IonButton>
            )}

            {!isPending && !votingOver && (
              <>
                {currentUser?.toLowerCase() === p.owner.toLowerCase() &&
                  !p?.frozen && ( // owner hasn't freezed sheet yet
                    <IonButton
                      color="warning"
                      style={{ margin: 16 }}
                      onClick={handleVoteFreeze}
                    >
                      Freeze Sheet
                    </IonButton>
                  )}
                <IonButton
                  color="success"
                  style={{ margin: 16 }}
                  onClick={() => handleVote(true)}
                >
                  Vote For
                </IonButton>
                <IonButton
                  color="danger"
                  style={{ margin: 16 }}
                  onClick={() => handleVote(false)}
                >
                  Vote Against
                </IonButton>
              </>
            )}
            <IonBadge
              color={votingOver ? "danger" : "success"}
              style={{ margin: 16, position: "absolute", right: 16 }}
            >
              {votingOver ? "Voting is over" : "Voting in progress"}
            </IonBadge>
          </div>
        )}
        <div
          style={{
            marginTop: 16,
            fontSize: "1rem",
          }}
        >
          <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>
            ✅ <b>{p.votesFor}</b> &nbsp; | &nbsp; ❌ <b>{p.votesAgainst}</b>
          </p>
        </div>
      </IonCardContent>
      <div style={{ position: "relative", width: "80%", margin: "auto" }}>
        {p?.frozen && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              background: "rgba(255,255,255,0.0)", // transparent
              cursor: "not-allowed",
            }}
          />
        )}
        <iframe
          src={`https://ethercalc.net/${p.sheetKey}`}
          title="EtherCalc Sheet"
          style={{
            width: "100%",
            minHeight: "80vh",
            border: "1px solid #ccc",
            borderRadius: "8px",
            pointerEvents: p?.frozen ? "none" : "auto", // optional extra
          }}
        ></iframe>
      </div>
    </IonCard>
  );
};

export default Election;
