import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Button = forwardRef(({
    className,
    variant = 'primary',
    size = 'default',
    children,
    ...props
}, ref) => {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-primary/20',
        secondary: 'bg-dark-700 text-white hover:bg-dark-800',
        outline: 'border-2 border-white/20 text-white hover:bg-white/10',
        ghost: 'hover:bg-white/5 text-gray-300 hover:text-white',
    };

    const sizes = {
        default: 'px-6 py-3',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
        icon: 'p-2',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'rounded-md font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };
