import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBheNEHtRZRzC2yMBDktQ_vwKniwJAe-TIkxs957Kq5WxnFvUw4uTqMV23HkVkklibZOMkJJiHLm1Ylktk433RVlC81IargCY1Q3SEivuMx6bzgYxfqH72PhAMCO4_r6wnCGoMCGekrnMdF9h3rJVo7wsFWVh-y3lk2KBQL5nmJ3_6ZKP4KyHhIU-DFaj5QOUdGdJM5azYqI2c5Nyyi2fK09FVTU6b3R7KSJPWS76f-tWHgFGmr-OPJk_KO7oMxKKgwGeLEH6LxInpU";

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/': return 'Bảng Điều Khiển';
      case '/check-in-out': return 'Quản Lý Xe Ra/Vào';
      case '/history': return 'Lịch sử & Thống kê Gửi xe';
      case '/volunteers': return 'Quản lý Tình nguyện viên';
      case '/settings': return 'Cài đặt Hệ thống';
      default: return 'Đoàn Thanh Niên Phường Ba Đình';
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateString = currentTime.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-sm px-4 md:px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-800">{getPageTitle(location.pathname)}</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <p className="text-sm font-semibold text-slate-800">{timeString}</p>
          <p className="text-xs text-slate-500 capitalize">{dateString}</p>
        </div>
        
        <div 
          className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-slate-100" 
          style={{ backgroundImage: `url(${avatarUrl})` }}
        />
      </div>
    </header>
  );
};

export default Header;