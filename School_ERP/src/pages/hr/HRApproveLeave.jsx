import React, { useState, useEffect } from 'react';
import HRTabs from '../../components/hr/HRTabs';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, CheckCheck, X, Check
} from 'lucide-react';
import { leaveService } from '../../api/leaveService';

export default function HRApproveLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await leaveService.getLeaveApplications();
      setLeaves(res.data || []);
    } catch (err) {
      console.error(err);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if(!window.confirm("Approve this leave request?")) return;
    try {
      await leaveService.approveLeave(id, { status: 'Approved' });
      alert("Leave Approved");
      fetchLeaves();
    } catch(err) {
      alert("Error approving leave");
    }
  };

  const handleReject = async (id) => {
    if(!window.confirm("Reject this leave request?")) return;
    try {
      await leaveService.rejectLeave(id, { status: 'Rejected' });
      alert("Leave Rejected");
      fetchLeaves();
    } catch(err) {
      alert("Error rejecting leave");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      <div className="bg-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Human Resource</h1>
          <p className="text-[11px] text-slate-500 mt-1">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
        </div>
      </div>

      <HRTabs />

      <div className="p-6 max-w-[1400px] mx-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Pending Leave Requests</h2>
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-8 text-center text-slate-500">
            Loading leave requests...
          </div>
        ) : leaves.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm py-24 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-[#5F52FF]/10 rounded-none flex items-center justify-center mb-4">
              <CheckCheck className="w-6 h-6 text-[#5F52FF]" />
            </div>
            <p className="text-[13px] font-bold text-slate-700">There are no pending leave requests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaves.map((leave) => (
              <div key={leave._id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800">{leave.staffId?.firstName || 'Unknown Staff'}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                    {leave.status}
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-4">
                  <strong>Type:</strong> {leave.leaveType?.name || 'Leave'} <br/>
                  <strong>From:</strong> {new Date(leave.startDate).toLocaleDateString()} <br/>
                  <strong>To:</strong> {new Date(leave.endDate).toLocaleDateString()}
                </div>
                <p className="text-xs text-slate-500 italic mb-4">"{leave.reason}"</p>
                
                {leave.status === 'Pending' && (
                  <div className="flex gap-2 border-t pt-3">
                    <button onClick={() => handleApprove(leave._id)} className="flex-1 bg-green-500 text-white font-bold text-[12px] py-1.5 rounded hover:bg-green-600 flex justify-center items-center gap-1">
                      <Check className="w-4 h-4"/> Approve
                    </button>
                    <button onClick={() => handleReject(leave._id)} className="flex-1 bg-red-500 text-white font-bold text-[12px] py-1.5 rounded hover:bg-red-600 flex justify-center items-center gap-1">
                      <X className="w-4 h-4"/> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
