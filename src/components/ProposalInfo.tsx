import React, { useEffect, useState } from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonNote,
  IonBadge,
} from "@ionic/react";
import { useHistory } from "react-router";
import {
  useMiniNoVotes,
  useMiniOwnerInfo,
  useMiniProposalInfo,
  useMiniYesVotes,
} from "../hooks/getProposalDataMini";
interface Proposal {
  title: string;
  description: string;
  owner: string;
  status: "active" | "ended";
  votesFor: number;
  votesAgainst: number;
  start: number;
}
const ProposalInfo = ({
  proposalAddress,
  index,
}: {
  proposalAddress: `0x${string}`;
  update?: (proposalAddress: `0x${string}`, status: number) => void;
  index?: number;
}) => {
  const history = useHistory();

  const { proposalInfo, isLoading } = useMiniProposalInfo({
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
  const [p, setP] = useState<Proposal>();

  useEffect(() => {
    if (Array.isArray(proposalInfo) && proposalInfo.length > 0) {
      const fetchData = async () => {
        const [_, endTime, title, description] = proposalInfo as [
          bigint,
          bigint,
          string,
          string
        ];

        const end = Number(endTime) * 1000;
        const proposal: Proposal = {
          owner: owner as string,
          title: title,
          description: description,
          status: end == 0 || end - Date.now() > 0 ? "active" : "ended",
          votesFor: yesVotes ? Number(yesVotes) : 0,
          votesAgainst: noVotes ? Number(noVotes) : 0,
          start: Number(_),
        };
        setP(proposal);
      };
      fetchData();
    }
  }, [proposalInfo, owner, yesVotes, noVotes, proposalAddress]);

  if (isLoading) {
    return (
      <IonCard>
        <IonCardContent>Loading...</IonCardContent>
      </IonCard>
    );
  }

  if (!proposalInfo) {
    return (
      <IonCard>
        <IonCardContent>No data found.</IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard
      button
      onClick={() => history.push(`/election?id=${proposalAddress}`)}
      key={index}
      className="proposal-card"
    >
      <IonCardHeader>
        <IonCardTitle className="card-title">{p?.title}</IonCardTitle>
        <IonNote className="card-subtitle">
          Created by <strong>{p?.owner.substring(0, 7) + "..."}</strong>
        </IonNote>
      </IonCardHeader>

      <IonCardContent className="card-content">
        <p className="description">
          {p?.description?.length || 0 > 120
            ? p?.description.substring(0, 120) + "..."
            : p?.description}
        </p>

        <div className="status-votes-row">
          <div className="status">
            <IonBadge color={p?.status === "active" ? "success" : "danger"}>
              {p?.status === "active" ? "Active" : "Ended"}
            </IonBadge>
          </div>

          <div className="votes">
            ✅ {p?.votesFor} &nbsp; | &nbsp; ❌ {p?.votesAgainst}
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ProposalInfo;
