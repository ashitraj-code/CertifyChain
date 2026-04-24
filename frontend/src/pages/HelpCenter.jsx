import { useState } from 'react';
import { Search, Book, ChevronDown, ChevronUp, MessageCircle, ExternalLink, Shield, HelpCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { helpArticles, faqItems } from '../data/certificates';

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Help Center</h1>
        <p className="text-sm text-on-surface-variant mt-1">Search our institutional knowledge base for cryptographic verification processes, API integration, and billing support.</p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-base focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all" />
        </div>
      </Card>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {helpArticles.map((article, i) => (
          <Card key={i} hover className="group">
            <div className="w-10 h-10 bg-primary-container/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-container/15 transition-colors">
              <Book size={18} className="text-primary-container" />
            </div>
            <h3 className="text-base font-bold text-on-surface mb-2">{article.title}</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-3">{article.description}</p>
            <span className="text-[10px] uppercase tracking-widest text-outline font-semibold">{article.category}</span>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-on-surface mb-5">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <Card key={i} className="!p-0 overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-surface-container-low transition-colors">
                <span className="text-sm font-semibold text-on-surface">{faq.question}</span>
                {openFaq === i ? <ChevronUp size={16} className="text-outline" /> : <ChevronDown size={16} className="text-outline" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-on-surface-variant leading-relaxed animate-fade-in border-t border-surface-container-high pt-3">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Support CTA */}
      <Card className="bg-gradient-to-r from-primary-container/5 to-secondary/5 border-primary-container/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-container/15 rounded-xl flex items-center justify-center">
              <MessageCircle size={22} className="text-primary-container" />
            </div>
            <div>
              <p className="text-base font-bold text-on-surface">Need more help?</p>
              <p className="text-xs text-on-surface-variant">Our enterprise support team is available 24/7 for critical infrastructure issues.</p>
            </div>
          </div>
          <Button variant="primary" icon={ExternalLink}>Contact Support</Button>
        </div>
      </Card>
    </div>
  );
}
