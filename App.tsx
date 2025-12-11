
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import AIConsultant from './components/AIConsultant';
import DesignServices from './components/DesignServices';
import Testimonials from './components/Testimonials';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { DataProvider } from './context/DataContext';
import { Lock, X } from 'lucide-react';

const LoginModal: React.FC<{ onClose: () => void; onLogin: () => void }> = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('Password salah!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
          <X size={20} />
        </button>
        <div className="text-center mb-6">
          <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Admin Login</h3>
          <p className="text-sm text-slate-500">Masuk untuk mengedit konten website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Masukkan Password"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Masuk Dashboard
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-4">Default pass: admin123</p>
      </div>
    </div>
  );
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Jika admin login, tampilkan Dashboard
  if (isAdmin) {
    return (
      <DataProvider>
        <AdminDashboard onLogout={() => setIsAdmin(false)} />
      </DataProvider>
    );
  }

  // Jika user biasa, tampilkan Landing Page
  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <AIConsultant />
          <DesignServices />
          <Testimonials />
          <OrderForm />
        </main>
        <Footer onAdminLogin={() => setShowLogin(true)} />
        
        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)} 
            onLogin={() => {
              setIsAdmin(true);
              setShowLogin(false);
            }} 
          />
        )}
      </div>
    </DataProvider>
  );
}

export default App;
