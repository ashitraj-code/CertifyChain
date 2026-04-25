import { Scanner } from '@yudiel/react-qr-scanner';
import { X, Camera } from 'lucide-react';

export default function QRScanner({ onScan, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] w-full max-w-md overflow-hidden relative shadow-2xl shadow-indigo-500/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Camera size={20} className="text-indigo-400" />
            <h3 className="text-lg font-light text-white tracking-tight">Scan Credential</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scanner Viewport */}
        <div className="relative aspect-square bg-black overflow-hidden">
          <Scanner
            onScan={(result) => {
              if (result && result.length > 0) {
                // Return the first successfully scanned string
                onScan(result[0].rawValue);
              }
            }}
            onError={(error) => {
              console.error(error?.message);
            }}
            components={{
              audio: false, 
              onOff: false,
              torch: false,
              zoom: false,
              finder: true
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-6 text-center bg-zinc-950">
          <p className="text-xs text-zinc-500 mb-1 font-bold uppercase tracking-widest">
            Automatic Detection
          </p>
          <p className="text-sm text-zinc-400 font-light">
            Align the QR code within the frame to verify automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
