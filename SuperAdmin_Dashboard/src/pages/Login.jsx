import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogIn, Lock, User, CheckCircle, GraduationCap, PieChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'superadmin@erp.com', password: 'admin123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const ok = login(form.email, form.password);
    if (ok) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-white flex font-sans">
      
      {/* Left Side - Branding & Aesthetics */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e282c] via-[#222d32] to-[#12181a] relative flex-col justify-between p-12 overflow-hidden items-start">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3c8dbc] rounded-none opacity-10 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#00a65a] rounded-none opacity-10 blur-[60px]"></div>

        <div className="relative z-10 w-full">
          <div className="w-14 h-14 bg-[#f39c12] rounded-none] flex items-center justify-center mb-6 shadow-lg shadow-[#f39c12]/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white text-[42px] font-bold leading-tight mb-4 tracking-tight">
            Next Generation <br/> <span className="text-[#f39c12]">Multi School ERP</span>
          </h1>
          <p className="text-[#a0aabf] text-[16px] max-w-md leading-relaxed font-light">
            Manage your network of institutions, payments, and global policies in one seamlessly integrated super portal.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-6 w-full max-w-lg">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-none] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#00a65a]" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[14px]">Enterprise Security</span>
              <span className="text-[#8aa4af] text-[12px]">Bank-grade encryption</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-none] flex items-center justify-center">
              <PieChart className="w-5 h-5 text-[#f39c12]" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[14px]">Real-time Network Analytics</span>
              <span className="text-[#8aa4af] text-[12px]">Smart reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-12 bg-white relative z-10">
        
        <div className="w-full max-w-[400px]">
          {/* Mobile Only Branding */}
          <div className="lg:hidden flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-[#f39c12] rounded-none] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-[22px] font-bold text-[#333]">
              Yug <span className="text-[#f39c12]">ERP</span>
            </h1>
          </div>

          <div className="mb-5">
            <h2 className="text-[22px] font-bold text-[#111] mb-1 tracking-tight">Super Admin Portal</h2>
            <p className="text-[#666] text-[13px]">Enter your credentials to access the control center.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-[#444] mb-1 uppercase tracking-wide">Email Address</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="superadmin@erp.com"
                  required
                  className="w-full border-2 border-gray-200 rounded-none] pl-9 pr-4 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#3c8dbc] text-[14px] transition-colors"
                />
                <User className="w-[15px] h-[15px] absolute left-3 top-[10px] text-gray-400 group-focus-within:text-[#3c8dbc] transition-colors" />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-[#444] mb-1 uppercase tracking-wide">System Password</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full border-2 border-gray-200 rounded-none] pl-9 pr-4 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#3c8dbc] text-[14px] transition-colors"
                />
                <Lock className="w-[15px] h-[15px] absolute left-3 top-[10px] text-gray-400 group-focus-within:text-[#3c8dbc] transition-colors" />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs font-semibold bg-red-50 px-3 py-2 rounded-none] border border-red-200">
                {error}
              </div>
            )}

            <div className="flex items-center pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="w-[15px] h-[15px] opacity-0 absolute z-10 cursor-pointer peer" defaultChecked />
                  <div className="w-[15px] h-[15px] border-2 border-gray-300 rounded-none] bg-white peer-checked:bg-[#3c8dbc] peer-checked:border-[#3c8dbc] transition-colors flex items-center justify-center">
                    <CheckCircle className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                </div>
                <span className="text-[13px] text-[#555] font-semibold group-hover:text-[#333]">Remember Me</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white py-2.5 rounded-none] text-[14px] font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-none animate-spin" />
              ) : (
                <LogIn className="w-[16px] h-[16px]" />
              )}
              {loading ? 'Authenticating...' : 'Sign In to Super Admin'}
            </button>

            <div className="bg-amber-50 border border-amber-200 rounded-none] p-2.5 text-center">
              <p className="text-[10px] font-bold text-amber-800 mb-0.5 uppercase tracking-wider">Demo Credentials</p>
              <div className="flex justify-center items-center gap-3 text-[12px] text-amber-700 font-mono font-semibold">
                <span>superadmin@erp.com</span>
                <span>·</span>
                <span>admin123</span>
              </div>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-[11px] text-gray-400">&copy; {new Date().getFullYear()} Multi School ERP</p>
            <p className="text-[11px] font-bold text-gray-500">Developed by <span className="text-[#f39c12]">Sachin</span> @ALLCORE SOLUTION</p>
          </div>
        </div>
      </div>
    </div>
  );
}
