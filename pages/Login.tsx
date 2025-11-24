import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const logoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBABJCC1DrGAokFZD_XxwIiyTooGXw8enzHPyTF_dV_Ua9xmZi_LF4h-wERqFu1NMW-ZErEC0Ph55cYSo8Dt_kCPee_VbH4KhPVXwr2y4B1qLbf_OHXzD55iQC0G8T9ARUH0fN59LbH4eo4XhA8GltyR1mcjUIiBmRZSf-M_P1BJ1sjHSUUC2iUQ3FXagyYX0fIVXNBbzDLRFduV61CGJUSyzszBaNNXzbl6lIJ1PveKJ27dfaz_T47YM0vAQTBwFTLJQZY_G_5TCZ5";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 space-y-8 border border-slate-100">
        
        {/* Header */}
        <div className="flex flex-col items-center space-y-4">
          <img src={logoUrl} alt="Logo Đoàn Thanh Niên" className="h-20 w-20 object-contain" />
          <div className="text-center">
            <h1 className="text-slate-900 text-2xl font-bold leading-tight">Hệ thống Quản lý Bãi gửi xe</h1>
            <p className="text-slate-500 text-base mt-1">Đoàn Thanh Niên Phường Ba Đình</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-medium">Tên đăng nhập hoặc Email</label>
            <input 
              type="text" 
              placeholder="Nhập tên đăng nhập của bạn" 
              className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 text-slate-900"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-medium">Mật khẩu</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Nhập mật khẩu của bạn" 
                className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 text-slate-900"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
              <span className="text-sm text-slate-700">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">Quên mật khẩu?</a>
          </div>

          <button 
            type="submit" 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors shadow-sm text-base"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          Chưa có tài khoản? <a href="#" className="font-semibold text-primary hover:text-primary/80">Đăng ký ngay</a>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-xs text-slate-400">
        Phát triển bởi Nhóm Tình nguyện viên Công nghệ
      </footer>
    </div>
  );
};

export default Login;