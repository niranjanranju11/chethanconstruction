import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, action }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {action && <div>{action}</div>}

        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 text-xs text-slate-600">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold border border-slate-200">
            <UserIcon className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="font-medium text-slate-900 block leading-tight">{user?.email || 'admin'}</span>
            <span className="text-[10px] text-amber-600 font-semibold uppercase">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};
