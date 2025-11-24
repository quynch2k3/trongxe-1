
import React, { useState } from 'react';
import { Camera, Search, Loader2 } from 'lucide-react';
import { checkInVehicle, findActiveSession, checkOutVehicle } from '../services/parkingService';
import { VehicleType } from '../types';

const CheckInOut: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'in' | 'out'>('in');
  const [isLoading, setIsLoading] = useState(false);

  // Check In State
  const [inPlate, setInPlate] = useState('');
  const [inType, setInType] = useState<VehicleType>('Xe máy');

  // Check Out State
  const [searchPlate, setSearchPlate] = useState('');
  const [foundSession, setFoundSession] = useState<any>(null);

  const handleCheckIn = async () => {
    if (!inPlate) return alert("Vui lòng nhập biển số xe");
    
    setIsLoading(true);
    try {
      await checkInVehicle(inPlate, inType);
      alert("Check-in thành công!");
      setInPlate(''); // Reset form
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchPlate) return;
    setIsLoading(true);
    try {
      const session = await findActiveSession(searchPlate);
      if (session) {
        setFoundSession(session);
      } else {
        alert("Không tìm thấy xe đang gửi với biển số này.");
        setFoundSession(null);
      }
    } catch (error) {
      alert("Lỗi tìm kiếm");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!foundSession) return;
    setIsLoading(true);
    try {
      await checkOutVehicle(foundSession.id, foundSession.currentFee);
      alert("Check-out thành công!");
      setFoundSession(null);
      setSearchPlate('');
    } catch (error) {
      alert("Lỗi khi check-out");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '...';
    // Handle both Firestore timestamp (if reverted later) and JS Date string
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('vi-VN');
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản Lý Xe Ra/Vào</h1>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex p-1 bg-slate-200 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('in')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'in' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
          }`}
        >
          Xe Vào
        </button>
        <button
          onClick={() => setActiveTab('out')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'out' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
          }`}
        >
          Xe Ra
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Check In Panel */}
        <div className={`bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex flex-col ${activeTab === 'out' ? 'hidden md:flex' : 'flex'}`}>
          <h2 className="text-xl font-bold text-secondary mb-6">Xe Vào Bãi</h2>
          
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-base font-medium text-slate-700">Biển số xe</label>
              <div className="flex rounded-lg overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                <input 
                  type="text" 
                  value={inPlate}
                  onChange={(e) => setInPlate(e.target.value.toUpperCase())}
                  placeholder="Ví dụ: 29-B1 12345"
                  className="flex-1 h-14 px-4 outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                />
                <button className="px-4 bg-white border-l border-slate-300 hover:bg-slate-50 text-accent transition-colors">
                  <Camera size={24} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-slate-700">Loại xe</label>
              <div className="relative">
                <select 
                  value={inType}
                  onChange={(e) => setInType(e.target.value as VehicleType)}
                  className="w-full h-14 px-4 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-slate-900 appearance-none"
                >
                  <option value="Xe máy">Xe máy</option>
                  <option value="Ô tô">Ô tô</option>
                  <option value="Xe đạp">Xe đạp</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-slate-700">Thời gian vào (Hiện tại)</label>
              <div className="h-14 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <span className="text-lg font-bold text-slate-800">
                  {new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})} - {new Date().toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-auto">
            <button 
              onClick={handleCheckIn}
              disabled={isLoading}
              className="w-full md:w-auto h-14 px-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg transition-colors text-base shadow-sm flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Xác nhận Xe Vào"}
            </button>
          </div>
        </div>

        {/* Check Out Panel */}
        <div className={`bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex flex-col ${activeTab === 'in' ? 'hidden md:flex' : 'flex'}`}>
          <h2 className="text-xl font-bold text-secondary mb-6">Xe Ra Khỏi Bãi</h2>
          
          <div className="space-y-6 flex-1">
             <div className="space-y-2">
              <label className="text-base font-medium text-slate-700">Tìm kiếm biển số xe</label>
              <div className="flex rounded-lg overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                <input 
                  type="text" 
                  value={searchPlate}
                  onChange={(e) => setSearchPlate(e.target.value.toUpperCase())}
                  placeholder="Nhập biển số"
                  className="flex-1 h-14 px-4 outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                />
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="px-5 bg-secondary text-white hover:bg-secondary/90 transition-colors"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Search size={24} />}
                </button>
              </div>
            </div>

            {foundSession && (
              <div className="pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Thông tin xe</h3>
                <div className="bg-slate-50 rounded-lg p-5 grid grid-cols-2 gap-y-4 gap-x-4 border border-slate-200">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-sm text-slate-500 mb-1">Biển số</p>
                    <p className="text-lg font-bold text-slate-900">{foundSession.plateNumber}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-sm text-slate-500 mb-1">Loại xe</p>
                    <p className="text-lg font-bold text-slate-900">{foundSession.vehicleType}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-slate-500 mb-1">Thời gian vào</p>
                    <p className="text-lg font-bold text-slate-900">{formatDate(foundSession.entryTime)}</p>
                  </div>
                  <div className="col-span-2 bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm text-green-700 mb-1">Phí gửi xe tạm tính</p>
                    <p className="text-2xl font-black text-green-800">
                      {foundSession.currentFee?.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-8 mt-auto">
            <button 
              onClick={handleCheckOut}
              disabled={!foundSession || isLoading}
              className={`w-full md:w-auto h-14 px-8 font-bold rounded-lg transition-colors text-base shadow-sm flex items-center justify-center gap-2 ${
                !foundSession 
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
                  : 'bg-accent hover:bg-accent/90 text-white'
              }`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Xác nhận Xe Ra & Thu Tiền"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckInOut;
