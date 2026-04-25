import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Award, Calendar, Hash, ArrowRight, Upload, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import API_BASE from '../config/api';

export default function IssueCertificate() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    date: '',
    walletAddress: '',
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be under 5MB');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.studentName || !formData.course || !formData.walletAddress) {
      setError('Please fill in all required fields');
      return;
    }

    if (!selectedFile) {
      setError('Please upload a certificate file');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      setError('Invalid wallet address format');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('studentName', formData.studentName);
      data.append('course', formData.course);
      data.append('walletAddress', formData.walletAddress);
      data.append('file', selectedFile);

      const response = await fetch(`${API_BASE}/certificate/mint`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Minting failed');
      }

      // Navigate to success page with certificate data
      navigate('/success', { state: { certificate: result.data } });
    } catch (err) {
      setError(err.message || 'Failed to issue certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12 animate-fade-in relative">
      <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight mb-2">Issue Credential</h1>
        <p className="text-zinc-500 font-light">Mint a cryptographic proof of achievement to the ledger.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 animate-fade-in">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-900 border-b border-indigo-100 pb-2">Document Details</h2>
              <div className="grid gap-6">
                <FormInput
                  label="Recipient Full Name"
                  id="studentName"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.studentName}
                  onChange={handleChange('studentName')}
                  icon={User}
                  required
                />
                <FormInput
                  label="Credential Name"
                  id="course"
                  placeholder="e.g. B.S. Computer Science"
                  value={formData.course}
                  onChange={handleChange('course')}
                  icon={Award}
                  required
                />
                <FormInput
                  label="Recipient Wallet Address"
                  id="walletAddress"
                  placeholder="0x..."
                  value={formData.walletAddress}
                  onChange={handleChange('walletAddress')}
                  icon={Hash}
                  required
                />
                <FormInput
                  label="Date of Issuance"
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange('date')}
                  icon={Calendar}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-900 border-b border-indigo-100 pb-2">Artifact Upload</h2>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-indigo-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-indigo-50/30 hover:bg-indigo-50/80 transition-colors cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-white border border-indigo-100 shadow-sm shadow-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {selectedFile ? (
                    <Upload size={20} className="text-emerald-500" />
                  ) : (
                    <span className="text-xl font-light text-indigo-600">+</span>
                  )}
                </div>
                {selectedFile ? (
                  <>
                    <p className="text-sm font-bold text-emerald-700 mb-1">{selectedFile.name}</p>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Click to change
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-indigo-900 mb-1">Select file to upload</p>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest">PDF, PNG up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* High Contrast Dark Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-950 rounded-3xl p-8 border border-zinc-800 shadow-2xl shadow-zinc-900/10 sticky top-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-8 border-b border-zinc-800 pb-2">Ledger Config</h2>
                
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 block mb-3">Hash ID</label>
                    <div className="relative">
                      <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                      <input
                        type="text"
                        placeholder="Auto-generated"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-300 focus:outline-none"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 block mb-3">Network</label>
                    <select className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-xs text-zinc-300 focus:outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                      <option>Polygon Amoy</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-zinc-800">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    icon={loading ? Loader2 : ArrowRight}
                    disabled={loading}
                  >
                    {loading ? 'Minting...' : 'Commit to Chain'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
