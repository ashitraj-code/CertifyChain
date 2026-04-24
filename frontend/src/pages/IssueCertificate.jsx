import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, User, Award, Calendar, Hash, FileText, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

export default function IssueCertificate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    date: '',
    certificateId: '',
  });
  const [fileName, setFileName] = useState('');

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/success');
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Issue Certificate</h1>
        <p className="text-sm md:text-base text-slate-500 mt-2">
          Mint a cryptographic proof of achievement directly to the blockchain.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Certificate Artwork Upload */}
          <Card className="rounded-3xl border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Certificate Artwork</h2>
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer group
                ${fileName 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
              onClick={() => setFileName('blockchain_fundamentals_2026.pdf')}
            >
              {fileName ? (
                <div className="flex flex-col items-center justify-center gap-3 animate-fade-in">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-emerald-200 flex items-center justify-center">
                    <FileText size={32} className="text-emerald-500" />
                  </div>
                  <span className="text-base font-bold text-slate-900">{fileName}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFileName(''); }}
                    className="mt-2 text-sm text-red-500 font-semibold hover:text-red-700 flex items-center gap-1"
                  >
                    <X size={16} /> Remove File
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} className="text-blue-500" />
                  </div>
                  <p className="text-lg font-bold text-slate-800">
                    Click to upload artwork
                  </p>
                  <p className="text-sm text-slate-500 mb-2">
                    or drag and drop it here
                  </p>
                  <span className="inline-block px-3 py-1 bg-slate-200 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-widest">
                    PDF, PNG, JPG (Max 5MB)
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Recipient Details */}
          <Card className="rounded-3xl border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recipient Details</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <FormInput
                  label="Student Name"
                  id="studentName"
                  placeholder="e.g., Eleanor Vance"
                  value={formData.studentName}
                  onChange={handleChange('studentName')}
                  icon={User}
                  required
                />
              </div>
              <FormInput
                label="Course / Credential"
                id="course"
                placeholder="e.g., Cryptography 101"
                value={formData.course}
                onChange={handleChange('course')}
                icon={Award}
                required
              />
              <FormInput
                label="Issue Date"
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange('date')}
                icon={Calendar}
                required
              />
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="rounded-3xl border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h2 className="text-xl font-bold text-white mb-6">Blockchain Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Certificate ID
                </label>
                <div className="relative">
                  <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Auto-generated"
                    value={formData.certificateId}
                    onChange={handleChange('certificateId')}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Network
                </label>
                <select className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all appearance-none cursor-pointer">
                  <option>Ethereum Mainnet</option>
                  <option>Polygon (Recommended)</option>
                  <option>Arbitrum</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Gas Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard', 'Fast', 'Instant'].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      className={`px-3 py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center
                        ${speed === 'Standard'
                          ? 'border-blue-500 bg-blue-600/20 text-blue-400 shadow-inner'
                          : 'border-slate-700 text-slate-400 hover:bg-slate-700'
                        }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Button type="submit" variant="primary" size="lg" className="w-full h-14 text-lg font-bold" icon={Award}>
            Mint to Blockchain
          </Button>
        </div>
      </form>
    </div>
  );
}
