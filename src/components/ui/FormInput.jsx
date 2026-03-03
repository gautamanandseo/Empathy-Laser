import React from 'react';
import { cn } from '@/lib/utils';

const FormInput = React.forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className,
  textarea = false,
  ...props 
}, ref) => {
  const InputComponent = textarea ? 'textarea' : 'input';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
          {label}
        </label>
      )}
      <InputComponent
        ref={ref}
        type={type}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white placeholder:text-gray-400 shadow-sm',
          textarea && 'min-h-[120px] resize-y',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;