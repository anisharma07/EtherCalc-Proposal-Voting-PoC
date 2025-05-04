# 🧾 EtherCalc-Proposal-Voting-PoC

Welcome to the **EtherCalc + Web3 Voting PoC**!  
This project demonstrates how collaborative spreadsheets (EtherCalc) and on-chain voting can work together for decentralized decision-making, grant tracking, and more.

---

## 🚀 Quick Start

### 1. ⚡️ Clone & Install

```bash
git clone <your-repo-url>
cd EtherCalc-Proposal-Voting-PoC
npm install
```

### 2. 🛠️ Environment Setup

- Copy `.env` from the repo or create your own:
  - Add your Infura, Pinata, and WalletConnect keys.
  - Example:
    ```
    VITE_CLOUD_CONNECT_PROJECT_ID=...
    ```

### 3. 🧑‍💻 Run the App

```bash
ionic serve
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Project Structure

- **Ionic + React** frontend (`src/`)
- **Smart Contracts** (see [`src/contracts.ts`](src/contracts.ts)):
  - `ProposalFactory`: Deploys new voting proposals.
  - `Proposal`: Each proposal is a contract with voting logic.
  - `MediToken`: (from ZKMedical-Billing) for token-gated features.

---

## 🔗 Web3 Integration

- **Wallet Connection**: [RainbowKit](https://rainbowkit.com/) + [Wagmi](https://wagmi.sh/)
- **Contract Read/Write**: Wagmi hooks for proposals, voting, and token balance.
- **Off-chain Signing**: Supported via WalletConnect.

---

## 📊 EtherCalc Integration

- Each proposal links to a unique EtherCalc sheet (iframe embed).
- Sheet key is generated and stored on-chain with the proposal.
- **Use Cases**:
  - Collaborative grant scoring
  - Distributed data entry
  - Real-time updates visible to all voters

---

## 🗳️ Voting Flow

1. **Create Proposal**:

   - Fill title, description, and generate a new EtherCalc sheet.
   - Set voting start/end times.
   - Proposal is deployed on-chain with sheet key.

2. **Collaborate**:

   - Anyone can edit the EtherCalc sheet (unless frozen).

3. **Vote**:

   - Connect wallet, vote for/against.
   - Votes are recorded on-chain.

4. **Freeze Sheet**:
   - Proposal owner can freeze the sheet (lock further edits) once voting starts.

---

## 🧩 How This PoC Was Built

- **Approach**:

  - Started from the ZKMedical-Billing modules for token and contract patterns.
  - Built a new frontend with Ionic + React for mobile/web UX.
  - Used EtherCalc for collaborative, off-chain data.
  - Linked EtherCalc sheet keys to proposals on-chain for traceability.

- **Web3 Tools/Libraries**:

  - [Wagmi](https://wagmi.sh/) for contract interaction
  - [RainbowKit](https://rainbowkit.com/) for wallet UI
  - [Viem](https://viem.sh/) for EVM utilities
  - [Pinata](https://pinata.cloud/) for optional IPFS storage

- **EtherCalc**:

  - Used as a collaborative spreadsheet for each proposal.
  - Sheet key is stored in the proposal contract.
  - Embedded via iframe for real-time collaboration.

- **Relevant Experience**:
  - Prior work with token-gated dApps, DAO tooling, and on-chain voting.
  - Experience integrating off-chain collaborative tools (like Google Sheets, EtherCalc) with smart contracts.

---

## 🖼️ Screenshots & Demo

> _Please see the attached screenshots and demo videos in the project submission or [add your own here]._  
> (You can use tools like [Screenity](https://chrome.google.com/webstore/detail/screenity-screen-recorder/...) or [Loom](https://loom.com/) for recording.)

---

## 📚 References

- [ZKMedical-Billing Modules](https://github.com/seetadev/ZKMedical-Billing)
- [EtherCalc](https://ethercalc.net/)
- [RainbowKit](https://rainbowkit.com/)
- [Wagmi](https://wagmi.sh/)

---

Thank You! 🚀
