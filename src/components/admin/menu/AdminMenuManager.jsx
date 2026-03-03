import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, GripVertical, Search, Link as LinkIcon, Loader2,
  Home, User, Settings, Phone, Mail, FileText, Image, Star, Calendar, 
  MapPin, ShoppingBag, Menu, Zap, Shield, CreditCard, Instagram, Facebook, Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMenuData } from '@/hooks/useMenuData';
import MenuPreview from './MenuPreview';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Create a mapping object for icons
const ICON_MAP = {
  Home, User, Settings, Phone, Mail, FileText, Image, Star, Calendar, 
  MapPin, ShoppingBag, Menu, Search, Zap, Shield, CreditCard, Instagram, Facebook, Twitter,
  Link: LinkIcon
};

const COMMON_ICONS = Object.keys(ICON_MAP).filter(key => key !== 'Link');

const AdminMenuManager = () => {
  const { menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem, reorderMenuItems } = useMenuData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: 'Link',
    visible: true,
    parent_id: 'none' // 'none' for top level
  });

  const resetForm = () => {
    setFormData({ title: '', url: '', icon: 'Link', visible: true, parent_id: 'none' });
    setEditingItem(null);
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        url: item.url,
        icon: item.icon || 'Link',
        visible: item.visible,
        parent_id: item.parent_id || 'none'
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      title: formData.title,
      url: formData.url,
      icon: formData.icon,
      visible: formData.visible,
      parent_id: formData.parent_id === 'none' ? null : formData.parent_id
    };

    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, payload);
      } else {
        await addMenuItem(payload);
      }
      setIsDialogOpen(false);
    } catch (e) {
      // Error handled in hook
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      await deleteMenuItem(id);
    }
  };

  const filteredItems = menuItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const IconRenderer = ({ iconName }) => {
      const Icon = (iconName && ICON_MAP[iconName]) ? ICON_MAP[iconName] : LinkIcon;
      return <Icon className="w-5 h-5" />;
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-[var(--color-vibrant-orange)]" /></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main List Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <Input 
               placeholder="Search menu items..." 
               className="pl-9" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-[var(--color-vibrant-orange)] hover:bg-orange-600 text-white w-full sm:w-auto">
             <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <span className="font-semibold text-gray-700">Menu Structure</span>
              <span className="text-xs text-gray-400">Drag to reorder</span>
           </div>
           
           {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No menu items found.</div>
           ) : (
             <Reorder.Group axis="y" values={menuItems} onReorder={reorderMenuItems} className="divide-y divide-gray-100">
               {menuItems.map((item) => (
                 <Reorder.Item 
                   key={item.id} 
                   value={item}
                   className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 transition-colors group"
                 >
                   <div className="cursor-move text-gray-300 hover:text-gray-600 p-1">
                      <GripVertical className="w-5 h-5" />
                   </div>
                   
                   <div className="w-10 h-10 rounded-lg bg-orange-50 text-[var(--color-vibrant-orange)] flex items-center justify-center shrink-0">
                      <IconRenderer iconName={item.icon} />
                   </div>

                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                         <h4 className="font-semibold text-gray-900">{item.title}</h4>
                         {!item.visible && <Badge variant="secondary" className="text-[10px] h-5 px-1.5">Hidden</Badge>}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{item.url}</p>
                   </div>

                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(item)}>
                         <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                         <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                   </div>
                 </Reorder.Item>
               ))}
             </Reorder.Group>
           )}
        </div>
      </div>

      {/* Preview Column */}
      <div className="lg:col-span-1 space-y-6">
         <div className="sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Live Preview</h3>
            <MenuPreview items={menuItems} />
            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-blue-700 text-sm border border-blue-100">
               <p className="flex items-start gap-2">
                  <span className="font-bold text-lg leading-none">ℹ</span>
                  Changes made here will update the main navigation structure immediately.
               </p>
            </div>
         </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]" aria-describedby="menu-dialog-description">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
            <DialogDescription id="menu-dialog-description">
               Configure the menu link details.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="title" className="text-right">Title</Label>
               <Input 
                 id="title" 
                 value={formData.title} 
                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                 className="col-span-3" 
               />
             </div>
             
             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="url" className="text-right">URL</Label>
               <Input 
                 id="url" 
                 value={formData.url} 
                 onChange={(e) => setFormData({...formData, url: e.target.value})}
                 className="col-span-3" 
                 placeholder="/example-page"
               />
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="icon" className="text-right">Icon</Label>
               <Select 
                 value={formData.icon} 
                 onValueChange={(val) => setFormData({...formData, icon: val})}
               >
                 <SelectTrigger className="col-span-3">
                   <SelectValue placeholder="Select an icon" />
                 </SelectTrigger>
                 <SelectContent>
                    {COMMON_ICONS.map(icon => (
                       <SelectItem key={icon} value={icon}>
                          <div className="flex items-center gap-2">
                             <IconRenderer iconName={icon} />
                             {icon}
                          </div>
                       </SelectItem>
                    ))}
                 </SelectContent>
               </Select>
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="visible" className="text-right">Visibility</Label>
               <div className="flex items-center gap-2 col-span-3">
                 {/* Custom Switch Implementation */}
                 <button 
                   type="button"
                   onClick={() => setFormData({...formData, visible: !formData.visible})}
                   className={cn(
                      "w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out",
                      formData.visible ? "bg-green-500" : "bg-gray-200"
                   )}
                 >
                    <div className={cn(
                       "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out",
                       formData.visible ? "translate-x-6" : "translate-x-0"
                    )} />
                 </button>
                 <span className="text-sm text-gray-500">{formData.visible ? 'Visible' : 'Hidden'}</span>
               </div>
             </div>
          </div>

          <DialogFooter>
             <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
             <Button onClick={handleSave} className="bg-[var(--color-vibrant-orange)] hover:bg-orange-600 text-white">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMenuManager;