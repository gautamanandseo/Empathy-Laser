import React from 'react';
import { 
  Eye, EyeOff, GripVertical, Link as LinkIcon,
  Home, User, Settings, Phone, Mail, FileText, Image, Star, Calendar, 
  MapPin, ShoppingBag, Menu, Search, Zap, Shield, CreditCard, Instagram, Facebook, Twitter
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Create a mapping object for icons
const ICON_MAP = {
  Home, User, Settings, Phone, Mail, FileText, Image, Star, Calendar, 
  MapPin, ShoppingBag, Menu, Search, Zap, Shield, CreditCard, Instagram, Facebook, Twitter,
  Link: LinkIcon
};

const MenuPreview = ({ items }) => {
  // Simple hierarchical builder if we had depth, but currently flat reordering is main focus
  // We'll just list them as they appear in the order
  
  const IconRenderer = ({ iconName }) => {
    const Icon = (iconName && ICON_MAP[iconName]) ? ICON_MAP[iconName] : LinkIcon;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Preview Structure</span>
      </div>
      <div className="divide-y divide-gray-100">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No items visible</div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                !item.visible && "opacity-50 bg-gray-50"
              )}
            >
              <div className="text-gray-300">
                <GripVertical className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                 <IconRenderer iconName={item.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  {item.title}
                  {!item.visible && (
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded-sm">Hidden</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 truncate">{item.url}</div>
              </div>
              <div>
                {item.visible ? (
                   <Eye className="w-4 h-4 text-green-500" />
                ) : (
                   <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuPreview;