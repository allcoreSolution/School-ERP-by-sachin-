import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Gauge, BookOpen, HandCoins, FileSearch, ArrowRightLeft, Globe, 
  FileText, UserPlus, WalletCards, LayoutGrid, Percent, Hash, Receipt, Clock 
} from 'lucide-react';

const FinanceTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { name: 'Dashboard', path: '/finance/dashboard', icon: Gauge },
    { name: 'Guide', path: '/finance/guide', icon: BookOpen },
    { name: 'Collect Fees', path: '/finance/collect', icon: HandCoins },
    { name: 'Search Due Fees', path: '/finance/search-due-fees', icon: FileSearch },
    { name: 'All Transactions', path: '/finance/transactions', icon: ArrowRightLeft },
    { name: 'Online Transactions', path: '/finance/online-transactions', icon: Globe },
    { name: 'Fee Challans', path: '/finance/challans', icon: FileText },
    { name: 'Assign Fees', path: '/finance/assign', icon: UserPlus },
    { name: 'Fees Carry Forward', path: '/finance/carry-forward', icon: WalletCards },
    { name: 'Fee Groups', path: '/finance/groups', icon: LayoutGrid },
    { name: 'Fees Discount', path: '/finance/discount', icon: Percent },
    { name: 'Fee Types', path: '/finance/types', icon: Hash },
    { name: 'Generate Due Slip', path: '/finance/generate-slip', icon: Receipt },
    { name: 'Due Slip History', path: '/finance/slip-history', icon: Clock }
  ];

  return (
    <div className="flex gap-4 border-b border-gray-200 overflow-x-auto pb-0.5 text-[13px] font-semibold text-[#5c6e81] mb-6 hide-scroll print:hidden">
      <style dangerouslySetInnerHTML={{__html: `.hide-scroll::-webkit-scrollbar { display: none; }`}} />
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        // Check exact match or starts with for nested routes, basic logic
        const isActive = currentPath === tab.path || (currentPath.startsWith(tab.path + '/') && tab.path !== '/finance/dashboard');
        
        if (isActive) {
          return (
            <div key={index} className="text-[#15202b] border-b-[3px] border-[#15202b] pb-2 px-1 whitespace-nowrap flex items-center gap-1.5 cursor-default">
               <Icon className="w-4 h-4" /> {tab.name}
            </div>
          );
        }
        
        return (
          <Link key={index} to={tab.path} className="pb-2 px-1 whitespace-nowrap flex items-center gap-1.5 hover:text-blue-600 transition-colors">
             <Icon className="w-4 h-4" /> {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default FinanceTabs;
