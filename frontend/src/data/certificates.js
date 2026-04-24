export const certificates = [
  {
    id: 'CERT-2023-001',
    name: 'Eleanor Vance',
    course: 'Master of Science in Cryptography',
    date: 'October 24, 2023',
    status: 'Active',
    txHash: '0x8fB3c9A...4d2E1aB9f',
    issuer: 'Stanford University',
    blockNumber: 18234567,
  },
  {
    id: 'CERT-2023-002',
    name: 'Marcus Chen',
    course: 'Advanced Data Science Bootcamp',
    date: 'November 15, 2023',
    status: 'Active',
    txHash: '0x3aD7e2B...8f1C4d5A2',
    issuer: 'MIT OpenCourseware',
    blockNumber: 18234890,
  },
  {
    id: 'CERT-2023-003',
    name: 'Sophia Rodriguez',
    course: 'Cloud Architecture Basis',
    date: 'September 8, 2023',
    status: 'Revoked',
    txHash: '0x7cE9f1D...2b3A5e8C1',
    issuer: 'AWS Academy',
    blockNumber: 18235123,
  },
  {
    id: 'CERT-2023-004',
    name: 'James Okoro',
    course: 'Corporate Leadership Cert',
    date: 'August 20, 2023',
    status: 'Revoked',
    txHash: '0x5bA2c8E...9d4F6a7B3',
    issuer: 'Harvard Business School',
    blockNumber: 18235456,
  },
  {
    id: 'CERT-2023-005',
    name: 'Aisha Patel',
    course: 'Blockchain Development',
    date: 'December 1, 2023',
    status: 'Active',
    txHash: '0x1fC6d3A...7e2B9c4D5',
    issuer: 'Ethereum Foundation',
    blockNumber: 18235789,
  },
  {
    id: 'CERT-2023-006',
    name: 'Lucas Müller',
    course: 'Frontend Web Dev',
    date: 'October 12, 2023',
    status: 'Revoked',
    txHash: '0x9eD4a7B...3c1F8d2E6',
    issuer: 'Codecademy Pro',
    blockNumber: 18236012,
  },
  {
    id: 'CERT-2024-007',
    name: 'Yuki Tanaka',
    course: 'AI & Machine Learning',
    date: 'January 15, 2024',
    status: 'Active',
    txHash: '0x2dB8e5C...6a9D1f3A7',
    issuer: 'Google DeepMind Academy',
    blockNumber: 18236345,
  },
  {
    id: 'CERT-2024-008',
    name: 'David Kim',
    course: 'Cybersecurity Fundamentals',
    date: 'February 28, 2024',
    status: 'Active',
    txHash: '0x4aE1c9D...8b2F5e7A3',
    issuer: 'CompTIA',
    blockNumber: 18236678,
  },
];

export const dashboardStats = {
  totalCertificates: 12450,
  activeCourses: 48,
  verificationsThisMonth: 3210,
  revocations: 23,
};

export const recentIssuances = [
  { id: 'CERT-2024-008', name: 'David Kim', course: 'Cybersecurity Fundamentals', date: '2 hours ago', status: 'Minted' },
  { id: 'CERT-2024-007', name: 'Yuki Tanaka', course: 'AI & Machine Learning', date: '5 hours ago', status: 'Minted' },
  { id: 'CERT-2023-005', name: 'Aisha Patel', course: 'Blockchain Development', date: '1 day ago', status: 'Minted' },
  { id: 'CERT-2023-001', name: 'Eleanor Vance', course: 'Master of Science in Cryptography', date: '3 days ago', status: 'Minted' },
  { id: 'CERT-2023-002', name: 'Marcus Chen', course: 'Advanced Data Science Bootcamp', date: '5 days ago', status: 'Minted' },
];

export const transactions = [
  { hash: '0x8fB3c9A...4d2E1aB9f', type: 'MINT', from: '0x4A2B...9c3D', to: '0x7E1F...2a4B', timestamp: '2024-02-28 14:32:01', block: 18236678, gas: '0.0042 ETH', status: 'Confirmed' },
  { hash: '0x3aD7e2B...8f1C4d5A2', type: 'VERIFY', from: '0x9C3D...1e5F', to: '0x4A2B...9c3D', timestamp: '2024-02-28 14:28:15', block: 18236677, gas: '0.0018 ETH', status: 'Confirmed' },
  { hash: '0x7cE9f1D...2b3A5e8C1', type: 'REVOKE', from: '0x4A2B...9c3D', to: '0x0000...0000', timestamp: '2024-02-28 13:45:30', block: 18236650, gas: '0.0035 ETH', status: 'Confirmed' },
  { hash: '0x5bA2c8E...9d4F6a7B3', type: 'MINT', from: '0x4A2B...9c3D', to: '0x2F8A...7d1C', timestamp: '2024-02-28 12:10:44', block: 18236620, gas: '0.0042 ETH', status: 'Confirmed' },
  { hash: '0x1fC6d3A...7e2B9c4D5', type: 'MINT', from: '0x4A2B...9c3D', to: '0x6B4E...3f2A', timestamp: '2024-02-27 18:55:22', block: 18236500, gas: '0.0042 ETH', status: 'Confirmed' },
  { hash: '0x9eD4a7B...3c1F8d2E6', type: 'VERIFY', from: '0x1D5C...8e4F', to: '0x4A2B...9c3D', timestamp: '2024-02-27 16:22:11', block: 18236480, gas: '0.0018 ETH', status: 'Confirmed' },
  { hash: '0x2dB8e5C...6a9D1f3A7', type: 'MINT', from: '0x4A2B...9c3D', to: '0x8C2D...5a1B', timestamp: '2024-02-27 11:05:33', block: 18236400, gas: '0.0042 ETH', status: 'Confirmed' },
  { hash: '0x4aE1c9D...8b2F5e7A3', type: 'REVOKE', from: '0x4A2B...9c3D', to: '0x0000...0000', timestamp: '2024-02-26 09:18:55', block: 18236300, gas: '0.0035 ETH', status: 'Confirmed' },
];

export const auditLogs = [
  { id: 1, timestamp: '2024-02-28 14:32:01', action: 'CERTIFICATE_ISSUED', actor: 'admin@institution.edu', details: 'Issued certificate CERT-2024-008 to David Kim', severity: 'INFO', ip: '192.168.1.45' },
  { id: 2, timestamp: '2024-02-28 14:28:15', action: 'VERIFICATION_REQUEST', actor: 'public@verifier.com', details: 'Verification request for CERT-2023-002', severity: 'INFO', ip: '10.0.0.12' },
  { id: 3, timestamp: '2024-02-28 13:45:30', action: 'CERTIFICATE_REVOKED', actor: 'admin@institution.edu', details: 'Revoked certificate CERT-2023-003 – Credential Expired', severity: 'WARNING', ip: '192.168.1.45' },
  { id: 4, timestamp: '2024-02-28 12:10:44', action: 'CERTIFICATE_ISSUED', actor: 'admin@institution.edu', details: 'Issued certificate CERT-2024-007 to Yuki Tanaka', severity: 'INFO', ip: '192.168.1.45' },
  { id: 5, timestamp: '2024-02-27 18:55:22', action: 'LOGIN_SUCCESS', actor: 'admin@institution.edu', details: 'Admin login from trusted IP', severity: 'INFO', ip: '192.168.1.45' },
  { id: 6, timestamp: '2024-02-27 16:22:11', action: 'PERMISSION_CHANGED', actor: 'superadmin@institution.edu', details: 'Updated role for user registrar@institution.edu to ISSUER', severity: 'WARNING', ip: '192.168.1.10' },
  { id: 7, timestamp: '2024-02-27 11:05:33', action: 'CERTIFICATE_ISSUED', actor: 'admin@institution.edu', details: 'Issued certificate CERT-2023-005 to Aisha Patel', severity: 'INFO', ip: '192.168.1.45' },
  { id: 8, timestamp: '2024-02-26 09:18:55', action: 'CERTIFICATE_REVOKED', actor: 'admin@institution.edu', details: 'Revoked certificate CERT-2023-004 – Administrative Error', severity: 'CRITICAL', ip: '192.168.1.45' },
  { id: 9, timestamp: '2024-02-26 08:00:00', action: 'SYSTEM_BACKUP', actor: 'system@certichain.io', details: 'Automated daily backup completed successfully', severity: 'INFO', ip: '127.0.0.1' },
  { id: 10, timestamp: '2024-02-25 22:14:07', action: 'LOGIN_FAILED', actor: 'unknown@attacker.com', details: 'Failed login attempt – invalid credentials', severity: 'CRITICAL', ip: '203.0.113.42' },
];

export const revokedCertificates = [
  { id: 'CERT-2023-004', name: 'James Okoro', course: 'Corporate Leadership Cert', reason: 'Administrative Error', date: '2 hours ago' },
  { id: 'CERT-2023-003', name: 'Sophia Rodriguez', course: 'Cloud Architecture Basis', reason: 'Credential Expired', date: 'Yesterday' },
  { id: 'CERT-2023-006', name: 'Lucas Müller', course: 'Frontend Web Dev', reason: 'Academic Misconduct', date: 'Oct 12, 2023' },
];

export const helpArticles = [
  { title: 'Platform Onboarding Guide', description: 'Step-by-step instructions for setting up your institutional profile and configuring administrative roles.', category: 'Getting Started' },
  { title: 'Verifying Your First Identity', description: 'Learn how to issue and cryptographically sign your initial batch of digital certificates.', category: 'Getting Started' },
  { title: 'Understanding the Dashboard', description: 'A comprehensive overview of key metrics, pending verifications, and system health indicators.', category: 'Features' },
  { title: 'Smart Contract Audits', description: 'Review our latest third-party security audits and compliance certifications for institutional grade trust.', category: 'Security' },
  { title: 'Managing Revocation Lists', description: 'How to securely broadcast certificate revocations to the ledger and update external verifiers.', category: 'Administration' },
];

export const faqItems = [
  { question: 'What is CertiChain?', answer: 'CertiChain is a blockchain-based certificate verification platform that enables institutions to issue, verify, and manage digital credentials with cryptographic proof of authenticity.' },
  { question: 'How does blockchain verification work?', answer: 'Each certificate is hashed and stored on the blockchain as an immutable record. When verification is requested, the system compares the certificate data against the on-chain record to confirm authenticity.' },
  { question: 'Can a certificate be revoked?', answer: 'Yes, authorized administrators can revoke certificates. The revocation is permanently recorded on the blockchain, ensuring all future verification attempts will reflect the updated status.' },
  { question: 'What blockchain does CertiChain use?', answer: 'CertiChain operates on an Ethereum-compatible network, leveraging smart contracts for certificate issuance, verification, and revocation management.' },
  { question: 'Is my data secure?', answer: 'Absolutely. CertiChain uses industry-standard encryption and only stores cryptographic hashes on the blockchain. No personal data is stored on-chain.' },
];
