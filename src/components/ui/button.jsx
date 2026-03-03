import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 apple-3d-button',
	{
		variants: {
			variant: {
				default: 'bg-gradient-to-r from-[var(--color-vibrant-orange)] to-[var(--color-accent-orange)] text-white hover:opacity-90 shadow-md dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md',
				outline:
          'border border-2 border-[var(--color-vibrant-orange)] text-[var(--color-vibrant-orange)] bg-transparent hover:bg-orange-50 shadow-sm',
				secondary:
          'bg-[var(--color-vibrant-grey)] text-white hover:bg-opacity-90 shadow-sm',
				ghost: 'hover:bg-accent hover:text-accent-foreground shadow-none border-0 dark:hover:bg-gray-800 dark:text-white',
				link: 'text-primary underline-offset-4 hover:underline shadow-none border-0 dark:text-white',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };