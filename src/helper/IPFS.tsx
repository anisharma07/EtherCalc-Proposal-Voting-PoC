export const uploadToPinata = async (
  title: string,
  description: string,
  sheetKey: string
) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const body = {
    pinataContent: {
      title,
      description,
      sheetKey,
    },
  };

  // Replace with your Pinata JWT or API Key/Secret
  const PINATA_JWT = import.meta.env.VITE_PINATA_JWT; // Store your JWT in .env as VITE_PINATA_JWT

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to upload to Pinata");
  }
  return response.json();
};
