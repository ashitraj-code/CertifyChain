import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Award, Calendar, Hash, ArrowRight } from 'lucide-react';
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

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/success');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12 animate-fade-in relative">
      <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight mb-2">Issue Credential</h1>
        <p className="text-zinc-500 font-light">Mint a cryptographic proof of achievement to the ledger.</p>
      </div>

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
                  label="Date of Issuance"
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange('date')}
                  icon={Calendar}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-900 border-b border-indigo-100 pb-2">Artifact Upload</h2>
              <div className="border border-dashed border-indigo-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-indigo-50/30 hover:bg-indigo-50/80 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-white border border-indigo-100 shadow-sm shadow-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-light text-indigo-600">+</span>
                </div>
                <p className="text-sm font-bold text-indigo-900 mb-1">Select file to upload</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-widest">PDF, PNG up to 5MB</p>
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
                      <option>Polygon POS</option>
                      <option>Ethereum Mainnet</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-zinc-800">
                  <Button type="submit" variant="primary" size="lg" className="w-full" icon={ArrowRight}>
                    Commit to Chain
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
