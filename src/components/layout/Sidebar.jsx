import React, { useState } from 'react';
import { 
  LayoutGrid, Stethoscope, Target, 
  ClipboardList, MessageSquare, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { cn } from '../../services/utils';

const menuItems = [
  { id: 'COCKPIT', label: 'Panel', icon: LayoutGrid },
  { id: 'INTAKE', label: 'Diagnóstico', icon: Stethoscope },
  { id: 'PLAYBOOK', label: 'Estrategia', icon: Target },
  { id: 'IMPLEMENTATION', label: 'Tareas', icon: ClipboardList },
  { id: 'SCRIPTS', label: 'Scripts', icon: MessageSquare },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-screen sticky top-0 bg-[#12131A] border-r border-white/10 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#E625FF] shadow-[0_0_10px_#E625FF]" />
            <span className="font-bold text-xl tracking-tighter text-white">RiBuzz</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/5 rounded-lg text-on-surface-variant"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-[#E625FF]/10 text-[#E625FF] border-l-4 border-[#E625FF]" 
                : "text-gray-400 hover:text-[#0FEFFD] hover:bg-white/5"
            )}
          >
            <item.icon size={22} className={cn(
              activeTab === item.id && "drop-shadow-[0_0_8px_#E625FF]"
            )} />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}