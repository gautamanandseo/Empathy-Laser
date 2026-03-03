import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const ButtonCustomizationContext = createContext();

export const useButtonCustomization = () => {
  return useContext(ButtonCustomizationContext);
};

export const ButtonCustomizationProvider = ({ children }) => {
  const [buttons, setButtons] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchButtons = async () => {
    try {
      const { data, error } = await supabase
        .from('button_customization')
        .select('*');
      
      if (error) throw error;

      const buttonMap = {};
      data.forEach(btn => {
        buttonMap[btn.button_name] = btn;
      });
      setButtons(buttonMap);
    } catch (error) {
      console.error('Error fetching button customization:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchButtons();

    const channel = supabase
      .channel('public:button_customization')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'button_customization' }, (payload) => {
        console.log('Button customization updated:', payload);
        fetchButtons();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getButtonConfig = (buttonName) => {
    return buttons[buttonName] || {
      button_text: 'Click Here',
      button_link: '/',
      button_color: '#ef4444',
      button_style: 'solid'
    };
  };

  return (
    <ButtonCustomizationContext.Provider value={{ buttons, loading, getButtonConfig }}>
      {children}
    </ButtonCustomizationContext.Provider>
  );
};