import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, History, BarChart3, Users, Settings, LogOut, QrCode } from 'lucide-react';

const Sidebar: React.FC = () => {
  const logoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDaDmCwH4lSx9GIYq0sDDsj1AOq6P9pv94J-G0A3ySnVm02NBcmTWIgLNpVUe_0om_ZQOkXe0BHiEAgRyb80r0TqSdCrZWDtHT1a63xilYjCjNyEbOBiyCPxKihu2wNvcEMgLCC0VEkLnnkekeVr3GPXTWW2bzk9ALwwhXODWCKdA5QhvwKMATVvACTflI9JkEN9hZ-JzBBRP1kqM9IMN8ithIFMxRxqSqeNhO0teqP3YK2YYIC9WMBwYrFIRB58kPOIsznALI7BeAO";

  const navItems = [
    { label: 'Bảng điều khiển', icon: <LayoutDashboard size={20} />, path: '/' },
    { label: 'Check-in/Check-out', icon: <QrCode size={20} />, path: '/check-in-out' },
    { label: 'Lịch sử gửi xe', icon: <History size={20} />, path: '/history' },
    { label: 'Báo cáo', icon: <BarChart3 size={20} />, path: '/reports' }, // Placeholder for reports
    { label: 'Tình nguyện viên', icon: <Users size={20} />, path: '/volunteers' },
  ];

  const bottomItems = [
    { label: 'Cài đặt', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="p-6 flex flex-col h-full">
        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div 
            className="w-10 h-10 rounded-full bg-cover bg-center shrink-0" 
            style={{ backgroundImage: `url(${logoUrl})` }}
          />
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-slate-900 text-sm font-bold truncate">Đoàn Thanh Niên</h1>
            <p className="text-slate-500 text-xs truncate">Phường Ba Đình</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col gap-1">
          {bottomItems.map((item) => (
             <NavLink
             key={item.path}
             to={item.path}
             className={({ isActive }) => `
               flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
               ${isActive 
                 ? 'bg-primary/10 text-primary' 
                 : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
             `}
           >
             {item.icon}
             {item.label}
           </NavLink>
          ))}
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 w-full text-left transition-colors">
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;