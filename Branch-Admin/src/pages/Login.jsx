import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Zap, Globe2, Building2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@branch.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Access Granted',
        text: 'Welcome back to the Branch Admin Portal.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      onLogin();
    }, 1500);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-50 flex font-sans">
      
      {/* Left Promotional / Branding Side (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-[50%] xl:w-[55%] relative overflow-hidden bg-[#0f172a] shadow-2xl flex-col justify-between p-12">
        {/* Decorative Gradients & Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#fd7e14] opacity-[0.15] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#3b82f6] opacity-[0.1] blur-[120px] rounded-full pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3 slide-in-top">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white text-lg shadow-lg ring-4 ring-white/10">
            M
          </div>
          <span className="font-extrabold text-white text-xl tracking-wide">Multi School ERP</span>
        </div>

        {/* Large Text Content */}
        <div className="relative z-10 my-auto pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5" /> Branch Manager Portal v2.0
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.2] mb-6">
            Empowering Your <br className="hidden xl:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#fde047]">Branch Operations</span>
          </h1>
          
          <p className="text-lg text-slate-300 font-medium max-w-xl leading-relaxed mb-10">
            Gain full control over your institution's daily activities. Manage academics, finances, and communications effortlessly through our unified enterprise dashboard.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="bg-white/5 border border-white/10 rounded-[8px] p-4 backdrop-blur-md">
              <Building2 className="w-6 h-6 text-orange-400 mb-3" />
              <div className="text-white font-bold text-[15px] mb-1">Multi-Branch Setup</div>
              <div className="text-slate-400 text-[12px] leading-tight font-medium">Control data flow & analytics across linked institutions.</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[8px] p-4 backdrop-blur-md">
              <ShieldCheck className="w-6 h-6 text-orange-400 mb-3" />
              <div className="text-white font-bold text-[15px] mb-1">Enterprise Security</div>
              <div className="text-slate-400 text-[12px] leading-tight font-medium">Bank-grade encryption for all financial & user records.</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center gap-6 mt-12 text-slate-500 text-[12px] font-semibold">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Help Center</a>
        </div>
      </div>

      {/* Right Login / Form Side */}
      <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-center items-center p-6 sm:p-12 relative bg-white">
        
        <div className="w-full max-w-[420px] fade-in-up">
          {/* Mobile Only Brand Header */}
          <div className="lg:hidden flex justify-center items-center gap-2 mb-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white text-xl shadow-lg ring-4 ring-orange-50">
              M
            </div>
            <span className="font-extrabold text-slate-800 text-2xl tracking-tight">Multi School ERP</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 text-sm font-medium">Please enter your credentials to access your portal.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[8px] text-[14px] text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
                  placeholder="admin@branch.com"
                  spellCheck="false"
                />
              </div>
            </div>
            
            <div>
              <div className="mb-2">
                <label className="block text-[12px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[8px] text-[14px] text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="flex items-center mt-2 mb-8">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500/50 cursor-pointer border-slate-300 rounded-[3px]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-[13px] text-slate-600 font-medium cursor-pointer">
                Keep me signed in
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 px-4 rounded-[8px] shadow-[0_4px_14px_rgba(253,126,20,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(253,126,20,0.4)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? (
                <span className="flex items-center gap-2">Authenticating... <LogIn className="w-5 h-5 animate-pulse" /></span>
              ) : (
                <span className="flex items-center gap-2">Sign In Securely <ArrowRight className="w-5 h-5" /></span>
              )}
            </button>
            <div className="mt-5 bg-orange-50 border border-orange-200 rounded-[8px] p-3 text-center">
              <p className="text-[11px] font-bold text-orange-800 mb-1 uppercase tracking-wider">Demo Credentials</p>
              <div className="flex justify-center items-center gap-4 text-[13px] text-orange-700 font-mono font-semibold">
                <span>Email: admin@branch.com</span>
                <span>Pass: password123</span>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-400">&copy; {new Date().getFullYear()} Multi School ERP</p>
            <p className="text-[11px] font-bold text-slate-500">Developed by <span className="text-orange-500">Sachin</span> @ALLCORE SOLUTION</p>
          </div>
        </div>

      </div>

      <style jsx>{`
        .slide-in-top {
          animation: slideInTop 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
        }
        @keyframes slideInTop {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Login;
