
import React, { useEffect, useState } from 'react';
import { Car, Layers, CheckCircle2, MoreHorizontal, AlertTriangle, Info, ArrowUp, PlusCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { getDailyStats } from '../services/parkingService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    active: 0,
    totalToday: 0,
    available: 100
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDailyStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    
    // Poll for updates every 5 seconds since we aren't using a realtime socket anymore
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock data for the chart
  const chartData = [
    { time: '8h', value: 80 },
    { time: '9h', value: 15 },
    { time: '10h', value: 80 },
    { time: '11h', value: 100 },
    { time: '12h', value: 30 },
    { time: '13h', value: 50 },
    { time: '14h', value: 40 },
  ];

  const StatCard = ({ title, value, icon, bgClass, iconColor, subValue }: any) => (
    <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          {React.cloneElement(icon, { className: `w-6 h-6 ${iconColor}` })}
        </div>
        <span className="text-slate-500 font-medium">{title}</span>
      </div>
      <div>
        <p className="text-4xl font-bold text-slate-900">{value}</p>
        {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
      </div>
    </div>
  );

  // Calculate percentage for circular progress
  const occupancyPercentage = Math.round((stats.active / 100) * 100);
  const strokeDashoffset = 440 - (440 * occupancyPercentage) / 100;

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tổng quan bãi xe hôm nay</h1>
          <p className="text-slate-500 mt-1">Dữ liệu được cập nhật theo thời gian thực.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/check-in-out')} className="flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-bold text-slate-700 transition-colors">
            <Car size={20} />
            Check-out Xe
          </button>
          <button onClick={() => navigate('/check-in-out')} className="flex items-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-primary/90 font-bold text-white transition-colors shadow-sm">
            <PlusCircle size={20} />
            Check-in Xe Mới
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Chỗ Trống" 
          value={stats.available} 
          icon={<CheckCircle2 />} 
          bgClass="bg-green-100" 
          iconColor="text-green-600" 
        />
        <StatCard 
          title="Xe Đang Gửi" 
          value={stats.active} 
          icon={<Car />} 
          bgClass="bg-orange-100" 
          iconColor="text-orange-600" 
        />
        <StatCard 
          title="Tổng Sức Chứa" 
          value="100" 
          icon={<Layers />} 
          bgClass="bg-blue-100" 
          iconColor="text-blue-600" 
        />
        <StatCard 
          title="Lượt Gửi Trong Ngày" 
          value={stats.totalToday} 
          icon={<MoreHorizontal />} 
          bgClass="bg-purple-100" 
          iconColor="text-purple-600" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Thống Kê Lượt Gửi Xe (Hôm Nay)</h3>
              <p className="text-sm text-slate-500">Số lượt xe vào/ra trong giờ</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-sm font-semibold">
              <ArrowUp size={16} />
              +5.2%
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value === 100 ? '#137fec' : '#dbeafe'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Circular Status & Notifications */}
        <div className="flex flex-col gap-6">
          
          {/* Circular Progress (Status) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tình Trạng Bãi Xe</h3>
            <div className="relative flex items-center justify-center py-4">
              {/* Simple SVG Circular Progress */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  className="text-slate-100"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="96"
                  cy="96"
                />
                <circle
                  className="text-primary transition-all duration-1000 ease-out"
                  strokeWidth="12"
                  strokeDasharray={440}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="96"
                  cy="96"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-slate-900">{occupancyPercentage}%</span>
                <span className="text-sm text-slate-400">Đã lấp đầy</span>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-2">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-primary"></div>
                 <span className="text-sm text-slate-500 font-medium">Đã gửi ({stats.active})</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                 <span className="text-sm text-slate-500 font-medium">Còn trống ({stats.available})</span>
               </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
             <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-accent" size={24} />
                <h3 className="text-lg font-bold text-slate-900">Thông Báo Quan Trọng</h3>
             </div>
             <div className="space-y-3">
                {stats.available < 30 && (
                   <div className="bg-yellow-50 p-3 rounded-lg flex items-start gap-3 border border-yellow-100">
                     <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={18} />
                     <div>
                        <p className="font-semibold text-yellow-800 text-sm">Bãi xe sắp đầy!</p>
                        <p className="text-xs text-yellow-700 mt-1">Chỉ còn dưới 30% chỗ trống. Các tình nguyện viên chú ý điều phối xe.</p>
                        <p className="text-[10px] text-yellow-600 mt-2 font-medium">10:15 AM</p>
                     </div>
                  </div>
                )}
                <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3 border border-blue-100">
                   <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
                   <div>
                      <p className="font-semibold text-blue-800 text-sm">Lịch trực tình nguyện</p>
                      <p className="text-xs text-blue-700 mt-1">Vui lòng kiểm tra lịch trực chiều nay tại bảng tin. Đồng chí An sẽ phụ trách chính.</p>
                      <p className="text-[10px] text-blue-600 mt-2 font-medium">08:00 AM</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
