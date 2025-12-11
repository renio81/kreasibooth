import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Image as ImageIcon, MessageSquare, Download } from 'lucide-react';
import { generateDesignConcept, generateBoothImage } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [textResult, setTextResult] = useState<string | null>(null);
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');

  const handleTextConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoadingText(true);
    setTextResult(null); // Clear previous result
    setActiveTab('text');
    const aiResponse = await generateDesignConcept(prompt);
    setTextResult(aiResponse);
    setLoadingText(false);
  };

  const handleImageGeneration = async () => {
    if (!prompt.trim()) return;

    setLoadingImage(true);
    setImageResult(null); // Clear previous result
    setActiveTab('image');
    const imageBase64 = await generateBoothImage(prompt);
    setImageResult(imageBase64);
    setLoadingImage(false);
  };

  const handleDownload = () => {
    if (!imageResult) return;
    const link = document.createElement('a');
    link.href = imageResult;
    link.download = `kreasibooth-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-consultant" className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white relative overflow-hidden scroll-mt-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8 border border-white/20 backdrop-blur-sm shadow-lg">
          <Sparkles className="text-yellow-400 animate-pulse" size={20} />
          <span className="text-indigo-100 font-medium tracking-wide">AI Design Assistant 2.0</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
          Wujudkan Imajinasi Bisnismu
        </h2>
        <p className="text-indigo-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Bingung mau desain booth seperti apa? Ceritakan ide Anda, dan biarkan AI kami memberikan konsep tertulis atau membuatkan visual desainnya secara instan.
        </p>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl max-w-3xl mx-auto">
            <div className="flex flex-col gap-4">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Contoh: Saya ingin booth container warna kuning cerah untuk jualan ayam geprek, ada neon box ayam api di atasnya, nuansa industrial modern..."
                    className="w-full h-32 p-4 rounded-xl bg-slate-900/50 border border-indigo-400/30 text-white placeholder-indigo-300/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-slate-900/80 transition-all resize-none text-lg"
                />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <button
                        onClick={handleTextConsultation}
                        disabled={loadingText || loadingImage || !prompt}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-xl font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-indigo-300"
                    >
                        {loadingText ? <Loader2 className="animate-spin" size={20} /> : <MessageSquare size={20} />}
                        Konsultasi Konsep
                    </button>
                    <button
                        onClick={handleImageGeneration}
                        disabled={loadingText || loadingImage || !prompt}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white py-3 px-6 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loadingImage ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                        Buat Gambar Desain
                    </button>
                </div>
            </div>
        </div>

        {/* Results Area */}
        {(textResult || imageResult) && (
          <div className="mt-12 animate-fade-in">
             <div className="flex justify-center gap-4 mb-6">
                 {textResult && (
                     <button 
                        onClick={() => setActiveTab('text')}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'text' ? 'bg-white text-indigo-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
                     >
                        Hasil Konsep
                     </button>
                 )}
                 {imageResult && (
                     <button 
                        onClick={() => setActiveTab('image')}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'image' ? 'bg-white text-indigo-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
                     >
                        Hasil Visual
                     </button>
                 )}
             </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
                {activeTab === 'text' && textResult && (
                    <div className="p-8 text-left animate-fade-in">
                         <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                            <Sparkles size={24} /> Analisa Konsep
                        </h3>
                        <div 
                            className="prose prose-invert max-w-none text-indigo-50 space-y-4"
                            dangerouslySetInnerHTML={{ __html: textResult }}
                        />
                    </div>
                )}

                {activeTab === 'image' && imageResult && (
                    <div className="p-4 md:p-8 animate-fade-in">
                         <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center justify-center gap-2">
                            <ImageIcon size={24} /> Desain Visual AI
                        </h3>
                        <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/50">
                            <img 
                                src={imageResult} 
                                alt="AI Generated Booth Design" 
                                className="w-full h-auto object-cover max-h-[600px] mx-auto"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button 
                                  onClick={handleDownload}
                                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-orange-500 hover:text-white shadow-xl"
                                >
                                  <Download size={20} />
                                  Download Gambar
                                </button>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-indigo-300">
                            *Gambar ini dihasilkan oleh AI sebagai referensi visual awal.
                        </p>
                    </div>
                )}

                <div className="bg-white/5 p-6 border-t border-white/10 text-center">
                    <p className="text-indigo-200 mb-4 font-medium">Tertarik mewujudkan desain ini?</p>
                    <a 
                        href="#order" 
                        onClick={scrollToOrder}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Lanjut ke Pemesanan <Send size={18} />
                    </a>
                </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIConsultant;