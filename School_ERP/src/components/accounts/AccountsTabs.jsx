import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Book, ArrowDownToLine, ArrowUpFromLine, 
  Calendar, FileText, Tags, Wallet
} from 'lucide-react';

const AccountsTabs = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/accounts/dashboard', icon: LayoutDashboard },
    { name: 'Guide', path: '/accounts/guide', icon: Book },
    { name: 'Income', path: '/accounts/income', icon: ArrowDownToLine },
    { name: 'Expense', path: '/accounts/expense', icon: ArrowUpFromLine },
    { name: 'Day Book', path: '/accounts/day-book', icon: Calendar },
    { name: 'Chart of Accounts', path: '/accounts/chart-of-accounts', icon: FileText },
    { name: 'Income Heads', path: '/accounts/income-heads', icon: Tags },
    { name: 'Expense Heads', path: '/accounts/expense-heads', icon: Tags },
    { name: 'Bank Accounts', path: '/accounts/bank-accounts', icon: Wallet }
  ];

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto text-xs font-semibold text-gray-600 hide-scroll">
      <style dangerouslySetInnerHTML={{__html: `.hide-scroll::-webkit-scrollbar { display: none; }`}} />
      
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
        const Icon = tab.icon;
        
        return (
          <Link
            key={tab.name}
            to={tab.path}
            className={`pb-2 px-1 whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              isActive 
                ? 'text-gray-900 border-b-[3px] border-gray-900 font-bold' 
                : 'hover:text-blue-600'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} /> {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default AccountsTabs;
