/**
 * Utility functions for consistent UI formatting across the application.
 */

// Formats an integer token ID to CRT-XXXX (e.g., 1 -> CRT-0001)
export const formatTokenId = (id) => {
  if (id === null || id === undefined || String(id) === 'N/A') return 'N/A';
  
  // Try parsing to make sure it's numeric, otherwise just return as-is
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return id;

  return `CRT-${String(numId).padStart(4, '0')}`;
};

// Parses a user input string (e.g., "CRT-0001" or "1") back to the raw integer token ID ("1")
export const parseTokenId = (input) => {
  if (!input) return '';
  const cleanInput = String(input).trim().toUpperCase();
  
  // If it starts with CRT-, pluck the number and ParseInt to remove leading zeros.
  if (cleanInput.startsWith('CRT-')) {
    const rawNumber = cleanInput.replace('CRT-', '');
    const parsed = parseInt(rawNumber, 10);
    return isNaN(parsed) ? input : String(parsed);
  }
  
  return String(input).trim();
};

// Truncates long hashes cleanly
export const truncateHash = (hash, startChars = 8, endChars = 6) => {
  if (!hash || hash === 'N/A') return 'N/A';
  if (hash.length <= startChars + endChars) return hash;
  return `${hash.substring(0, startChars)}...${hash.substring(hash.length - endChars)}`;
};

// Generates an IPFS Gateway URL
export const getIpfsUrl = (ipfsHash) => {
  if (!ipfsHash || ipfsHash === 'N/A') return '#';
  const gateway = import.meta.env.VITE_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';
  return `${gateway}${ipfsHash}`;
};

// Generates a Blockchain Explorer Transaction URL
export const getPolygonscanUrl = (txHash) => {
  if (!txHash || txHash === 'N/A') return '#';
  const explorer = import.meta.env.VITE_BLOCK_EXPLORER_URL || 'https://amoy.polygonscan.com/tx/';
  return `${explorer}${txHash}`;
};
