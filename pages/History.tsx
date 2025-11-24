
import React, { useEffect, useState } from 'react';
import { Search, CalendarDays, Download, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getHistory } from '../services/parkingService';

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistory();
        setHistoryData(data);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = historyData.reduce((acc, curr) => acc + (curr.fee || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-3xl font-bold text-slate-900">Lịch sử & Thống kê Gửi xe</h1>
        <p className="text-slate-500">Xem lại tất cả các lượt gửi xe đã hoàn thành.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <span className="text-slate-500 font-medium">Lượt xe hoàn thành</span>
          <span className="text-3xl font-bold text-slate-900">{historyData.length}</span>
          <span className="text-green-600 text-sm font-medium">Dữ liệu mới nhất</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <span className="text-slate-500 font-medium">Tổng doanh thu (Tạm tính)</span>
          <span className="text-3xl font-bold text-slate-900">{totalRevenue.toLocaleString()} VNĐ</span>
          <span className="text-green-600 text-sm font-medium">Dữ liệu mới nhất</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-slate-400 bg-slate-50 rounded-l-lg border-y border-l border-slate-200">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Tìm theo biển số xe..." 
              className="w-full h-10 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 flex-1 md:flex-none whitespace-nowrap">
              <CalendarDays size={16} />
              Lọc theo thời gian
            </button>
            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 flex-1 md:flex-none whitespace-nowrap">
              <Download size={16} />
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 flex justify-center text-slate-500">
              <Loader2 className="animate-spin mr-2" /> Đang tải dữ liệu...
            </div>
          ) : historyData.length === 0 ? (
            <div className="p-10 text-center text-slate-500">Chưa có dữ liệu lịch sử.</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">STT</th>
                  <th className="px-6 py-4 font-semibold">Biển số xe</th>
                  <th className="px-6 py-4 font-semibold">Thời gian vào</th>
                  <th className="px-6 py-4 font-semibold">Thời gian ra</th>
                  <th className="px-6 py-4 font-semibold">Tổng thời gian</th>
                  <th className="px-6 py-4 font-semibold text-right">Phí gửi xe (VNĐ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyData.map((row, index) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.plateNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{row.formattedEntry}</td>
                    <td className="px-6 py-4 text-slate-600">{row.formattedExit}</td>
                    <td className="px-6 py-4 text-slate-600">{row.duration}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      {row.fee?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Hiển thị <span className="font-semibold text-slate-900">
              {historyData.length > 0 ? 1 : 0}-{historyData.length}
            </span> kết quả
          </p>
          <div className="flex gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-300 text-slate-400 cursor-not-allowed bg-slate-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default History;
