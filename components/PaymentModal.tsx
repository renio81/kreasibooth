import React, { useState, useEffect } from 'react';
import { X, QrCode, CreditCard, Smartphone, CheckCircle2, Loader2, Copy, ShieldCheck } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  itemName: string;
  customerName: string;
  onSuccess: (transactionId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, itemName, customerName, onSuccess }) => {
  const [step, setStep] = useState<'method' | 'process' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('method');
      setSelectedMethod(null);
      setIsLoading(false);
      setTransactionId(`TRX-${Math.floor(Math.random() * 10000000)}`);
    }
  }, [isOpen]);

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep('process');
  };

  const handlePaymentConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        onSuccess(transactionId);
      }, 2000);
    }, 2000);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-green-600" size={20} />
            <h3 className="font-bold text-slate-800">Pembayaran Aman</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          
          <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Tagihan</p>
            <p className="text-2xl font-bold text-blue-700">{formatRupiah(amount)}</p>
            <div className="mt-2 text-sm text-slate-600 flex justify-between">
               <span>Item:</span>
               <span className="font-medium truncate max-w-[150px]">{itemName}</span>
            </div>
          </div>

          {step === 'method' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-800">Pilih Metode Pembayaran</p>
              
              <button 
                onClick={() => handleMethodSelect('qris')}
                className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg border shadow-sm text-slate-800 group-hover:text-orange-500">
                    <QrCode size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800">QRIS (Instant)</p>
                    <p className="text-xs text-slate-500">Gopay, OVO, Dana, ShopeePay</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => handleMethodSelect('bank_transfer')}
                className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg border shadow-sm text-slate-800 group-hover:text-blue-500">
                    <CreditCard size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800">Transfer Bank</p>
                    <p className="text-xs text-slate-500">BCA, Mandiri, BNI, BRI</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {step === 'process' && (
            <div className="text-center space-y-6">
              {selectedMethod === 'qris' && (
                <div className="bg-white p-4 border rounded-xl shadow-inner inline-block">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KreasiBoothPayment" alt="QRIS" className="mx-auto" />
                </div>
              )}

              {selectedMethod === 'bank_transfer' && (
                <div className="bg-slate-100 p-6 rounded-xl">
                   <p className="text-sm text-slate-500 mb-2">Nomor Virtual Account (BCA)</p>
                   <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-slate-200">
                      <span className="font-mono text-xl font-bold tracking-widest text-slate-800">8801 2938 4712</span>
                      <Copy size={16} className="text-slate-400 cursor-pointer hover:text-blue-500" />
                   </div>
                </div>
              )}
              
              <div className="space-y-2">
                 <p className="text-sm text-slate-600">Selesaikan pembayaran sebelum:</p>
                 <p className="font-bold text-orange-600 animate-pulse">23:59:59</p>
              </div>

              <button 
                onClick={handlePaymentConfirm}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" /> Memproses...
                    </>
                ) : (
                    "Saya Sudah Bayar"
                )}
              </button>
              
              <button onClick={() => setStep('method')} className="text-sm text-slate-500 hover:text-slate-800 hover:underline">
                Ganti Metode
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-600 animate-bounce" />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">Pembayaran Berhasil!</h3>
               <p className="text-slate-500 mb-8">Terima kasih, {customerName}. Pesanan Anda sedang diproses.</p>
               <p className="text-xs text-slate-400">Mengalihkan ke WhatsApp...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaymentModal;