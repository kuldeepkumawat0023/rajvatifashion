import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, ...props }, ref) => {
    // 🐴 ponytail: direct class mapping, no complex variants builder needed
    const baseClass = 'inline-flex items-center justify-center font-semibold rounded-full transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    
    const variants = {
      primary: 'gradient-button hover:shadow-lg text-on-primary',
      secondary: 'bg-secondary text-on-secondary hover:bg-secondary/90',
      outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-on-secondary',
      ghost: 'hover:bg-muted text-foreground',
    };
    
    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-8 py-3 text-sm',
      lg: 'px-10 py-4 text-base',
    };

    const combinedClassName = cn(baseClass, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={combinedClassName} {...(props as any)}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...(props as any)}
      />
    );
  }
);
Button.displayName = 'Button';
export { Button };
