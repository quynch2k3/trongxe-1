import React from 'react';
import { Plus, Search, Filter, Edit, Trash2, LockOpen } from 'lucide-react';

const Volunteers: React.FC = () => {
  const volunteers = [
    { id: 1, name: 'Nguyễn Văn An', phone: '0987654321', email: 'an.nguyen@email.com', role: 'Trưởng nhóm', status: 'active' },
    { id: 2, name: 'Trần Thị Bình', phone: '0123456789', email: 'binh.tran@email.com', role: 'Tình nguyện viên', status: 'active' },
    { id: 3, name: 'Lê Minh Cường', phone: '0912345678', email: 'cuong.le@email.com', role: 'Tình nguyện viên', status: 'locked' },
    { id: 4, name: 'Phạm Thu Duyên', phone: '0909090909', email: 'duyen.pham@email.com', role: 'Tình nguyện viên', status: 'active' },
    { id: 5, name: 'Vũ Tiến Em', phone: '0369852147', email: 'em.vu@email.com', role: 'Tình nguyện viên', status: 'active' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý Tài khoản Tình nguyện viên</h1>
          <p className="text-slate-500 mt-1">Thêm mới, chỉnh sửa và quản lý quyền của các tình nguyện viên.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm shadow-sm transition-colors">
          <Plus size={18} />
          Thêm Tình nguyện viên
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-slate-400 bg-slate-50 rounded-l-lg border-y border-l border-slate-200">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên, SĐT, hoặc email" 
              className="w-full h-10 pl-12 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100">
              <Filter size={16} />
              Trạng thái
            </button>
             <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100">
              Vai trò
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Họ và Tên</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Số điện thoại</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {volunteers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{v.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{v.phone}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{v.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{v.role}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold leading-5 ${
                      v.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {v.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <Edit size={18} />
                      </button>
                      {v.status === 'locked' ? (
                         <button className="text-slate-400 hover:text-green-600 transition-colors">
                         <LockOpen size={18} />
                       </button>
                      ) : (
                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
           <p className="text-sm text-slate-500">Hiển thị <span className="font-semibold text-slate-900">1-5</span> trên <span className="font-semibold text-slate-900">25</span> kết quả</p>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;