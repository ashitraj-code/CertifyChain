import { useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink, Shield, Calendar, User, Award, Hash, Copy, FileText, Database, Download } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { formatTokenId, getIpfsUrl, getPolygonscanUrl } from '../utils/formatters';
import QRCodeModule from 'react-qr-code';

const QRCode = typeof QRCodeModule === 'function' ? QRCodeModule : (QRCodeModule.QRCode || QRCodeModule.default || QRCodeModule);

export default function ResultValid() {
  const location = useLocation();
  const certData = location.state?.certificate;
  const status = location.state?.status || 'VALID';

  const cert = {
    id: certData?.tokenId ?? 'N/A',
    name: certData?.studentName || 'N/A',
    course: certData?.course || 'N/A',
    date: certData?.issuedAt ? new Date(certData.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A',
    issuer: 'Pramanit Network',
    txHash: certData?.transactionHash || 'N/A',
    ipfsHash: certData?.ipfsHash || 'N/A',
    studentAddress: certData?.studentAddress || 'N/A',
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQR = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      const padding = 32;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + 50 + padding * 2;
      
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, padding, padding);
      
      ctx.fillStyle = "#000000";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(formatTokenId(cert.id), canvas.width / 2, canvas.height - 20);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Certificate_QR_${formatTokenId(cert.id)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Back link */}
      <Button variant="ghost" to="/verify" icon={ArrowLeft} className="mb-8">
        Back to Verification
      </Button>

      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10 animate-fade-in">
          {/* Success Icon with pulse ring */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-20 h-20 bg-success rounded-full flex items-center justify-center animate-bounce-in">
              <CheckCircle2 size={36} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">
            Verified Certificate
          </h1>
          <p className="text-base text-on-surface-variant max-w-lg mx-auto">
            This document has been cryptographically validated and matches the immutable record on the Pramanit network.
          </p>
        </div>

        {/* Verification badge card */}
        <Card className="mb-6 border-success/30 bg-success/5 animate-fade-in stagger-1">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-success" />
            <div>
              <p className="text-sm font-bold text-success">Blockchain Verified — {status}</p>
              <p className="text-xs text-success/70">
                Cryptographic signature confirmed • {formatTokenId(cert.id)}
              </p>
            </div>
          </div>
        </Card>

        {/* Certificate Details */}
        <Card className="animate-fade-in stagger-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-5">
            Certificate Details
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Hash size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Token Identifier</p>
                <p className="text-sm font-bold text-on-surface font-mono">{formatTokenId(cert.id)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <User size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Recipient Name</p>
                <p className="text-sm font-bold text-on-surface">{cert.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Credential</p>
                <p className="text-sm font-bold text-on-surface">{cert.course}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Issue Date</p>
                <p className="text-sm font-bold text-on-surface">{cert.date}</p>
              </div>
            </div>

            <hr className="border-surface-container-high" />

            {/* Technical Evidence Section */}
            <div>
              <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-4">Technical Evidence</p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a 
                  href={getIpfsUrl(cert.ipfsHash)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-semibold text-on-surface"
                >
                  <FileText size={16} className="text-primary-container" /> View Document
                </a>
                <a 
                  href={getPolygonscanUrl(cert.txHash)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-semibold text-on-surface"
                >
                  <Database size={16} className="text-primary-container" /> View on Ledger
                </a>
              </div>

              {/* QR Code Segment */}
              <div className="flex flex-col items-center justify-center pt-6 border-t border-surface-container-high">
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-4">Official QR Code</p>
                <div className="bg-white p-6 rounded-2xl mb-4 border-8 border-white shadow-xl inline-block">
                  <QRCode id="QRCode" value={formatTokenId(cert.id)} size={120} bgColor="#ffffff" fgColor="#000000" />
                </div>
                <button 
                  onClick={downloadQR}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-container/10 text-primary-container hover:bg-primary-container/20 border border-primary-container/20 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  <Download size={14} /> Download QR
                </button>
              </div>
            </div>
          </div>

          {/* Remove the redundant 'View on Polygonscan' bottom button since it's now in Technical Evidence */}
        </Card>
      </div>
    </div>
  );
}
