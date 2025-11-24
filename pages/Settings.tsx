import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cài đặt Hệ thống</h1>
        <p className="text-slate-500 mt-2">Quản lý và tùy chỉnh các thông số của hệ thống bãi gửi xe.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-8 mb-8">
        <button className="pb-3 border-b-[3px] border-primary text-primary font-bold text-sm px-1">
          Cài đặt chung
        </button>
        <button className="pb-3 border-b-[3px] border-transparent text-slate-500 hover:text-primary font-bold text-sm px-1 transition-colors">
          Bảng giá
        </button>
        <button className="pb-3 border-b-[3px] border-transparent text-slate-500 hover:text-primary font-bold text-sm px-1 transition-colors">
          Tài khoản
        </button>
      </div>

      <div className="space-y-8">
        {/* General Info */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Thông tin chung</h2>
            <p className="text-sm text-slate-500 mt-1">Cập nhật thông tin liên hệ và chi tiết của bãi xe.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-900">Tên bãi gửi xe</label>
              <input type="text" defaultValue="Bãi xe Thanh Niên Ba Đình" className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Số điện thoại</label>
              <input type="text" defaultValue="0987 654 321" className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Email hỗ trợ</label>
              <input type="text" defaultValue="hotro@doanphuongbadinh.vn" className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-900">Địa chỉ</label>
              <input type="text" defaultValue="Số 1, đường Thanh Niên, phường Ba Đình, Hà Nội" className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900" />
            </div>
          </div>
        </div>

        {/* System Options */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Tùy chọn hệ thống</h2>
            <p className="text-sm text-slate-500 mt-1">Cấu hình các thiết lập chung cho toàn bộ hệ thống.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Múi giờ</label>
              <select className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 bg-white">
                <option>(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
              </select>
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Đơn vị tiền tệ</label>
              <select className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 bg-white">
                <option>VNĐ</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button className="h-11 px-6 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
            Hủy
          </button>
          <button className="h-11 px-6 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;