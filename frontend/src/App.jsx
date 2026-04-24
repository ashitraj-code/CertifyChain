import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/Home';
import Verify from './pages/Verify';
import ResultValid from './pages/ResultValid';
import ResultInvalid from './pages/ResultInvalid';
import Dashboard from './pages/Dashboard';
import IssueCertificate from './pages/IssueCertificate';
import Success from './pages/Success';
import CertificateRegistry from './pages/CertificateRegistry';
import Revocation from './pages/Revocation';
import BlockchainExplorer from './pages/BlockchainExplorer';
import AuditLogs from './pages/AuditLogs';
import HelpCenter from './pages/HelpCenter';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/result-valid" element={<ResultValid />} />
          <Route path="/result-invalid" element={<ResultInvalid />} />
          <Route path="/issue" element={<IssueCertificate />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* Admin Pages */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registry" element={<CertificateRegistry />} />
          <Route path="/revoke" element={<Revocation />} />
          <Route path="/explorer" element={<BlockchainExplorer />} />
          <Route path="/logs" element={<AuditLogs />} />
          <Route path="/help" element={<HelpCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
