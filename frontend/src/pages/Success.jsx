import { useLocation } from 'react-router-dom';
import { Check, Copy, ArrowRight, ArrowUpRight, FileText, Database, Download } from 'lucide-react';
import Button from '../components/Button';
import { formatTokenId, getIpfsUrl, getPolygonscanUrl } from '../utils/formatters';
import QRCodeModule from 'react-qr-code';

const QRCode = typeof QRCodeModule === 'function' ? QRCodeModule : (QRCodeModule.QRCode || QRCodeModule.default || QRCodeModule);

export default function Success() {
  const location = useLocation();
  const certData = location.state?.certificate;

  const cert = {
    id: certData?.tokenId ?? 'N/A',
    name: certData?.studentName || 'N/A',
    course: certData?.course || 'N/A',
    txHash: certData?.transactionHash || 'N/A',
    ipfsHash: certData?.ipfsHash || 'N/A',
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
      canvas.width = img.width;
      canvas.height = img.height + 40; // Extra space for padding/text
      
      // Draw white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR Code
      ctx.drawImage(img, 0, 0);
      
      // Draw Token ID below
      ctx.fillStyle = "black";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(formatTokenId(cert.id), canvas.width / 2, canvas.height - 15);
      
      // Download
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Certificate_QR_${formatTokenId(cert.id)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-xl w-full mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-40 animate-pulse" />
            <div className="relative w-full h-full rounded-full border border-emerald-200 flex items-center justify-center bg-white shadow-sm shadow-emerald-500/20 animate-bounce-in">
              <Check size={24} strokeWidth={2} className="text-emerald-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-zinc-900 mb-4 tracking-tight">
            Successfully Minted
          </h1>
          <p className="text-emerald-600/80 font-medium">
            Certificate NFT minted • {formatTokenId(cert.id)}
          </p>
        </div>

        {/* High Contrast Dark Details Card */}
        <div className="animate-fade-in stagger-1 bg-zinc-950 rounded-3xl p-8 border border-zinc-800 shadow-2xl shadow-zinc-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Token Identifier</p>
                <p className="text-sm font-mono font-medium text-emerald-400">{formatTokenId(cert.id)}</p>
              </div>
              <button onClick={() => copyToClipboard(String(cert.id))} className="p-2 rounded text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors">
                <Copy size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Recipient</p>
                <p className="text-sm font-bold text-white">{cert.name}</p>
              </div>
              <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Credential</p>
                <p className="text-sm font-bold text-white">{cert.course}</p>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Technical Evidences</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href={getIpfsUrl(cert.ipfsHash)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition-all">
                    <FileText size={14} /> View Document
                  </a>
                  <a href={getPolygonscanUrl(cert.txHash)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition-all">
                    <Database size={14} /> View on Ledger
                  </a>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center justify-center pt-8 border-t border-zinc-800">
                <div className="bg-white p-4 rounded-xl mb-4">
                  <QRCode id="QRCode" value={formatTokenId(cert.id)} size={120} />
                </div>
                <button 
                  onClick={downloadQR}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/20 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  <Download size={14} /> Download QR Code
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-zinc-800">
              <Button variant="ghost" to="/dashboard" className="w-full sm:flex-1 text-zinc-300 hover:text-white">
                Dashboard
              </Button>
              <Button variant="primary" to="/issue" className="w-full sm:flex-1">
                Mint Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
