import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline';
  children: React.ReactNode;
}

export function Badge({ variant = 'primary', className, children, ...props }: BadgeProps) {
  // 🐴 ponytail: simple variants
  const variants = {
    primary: 'bg-primary text-on-primary',
    secondary: 'bg-secondary text-on-secondary',
    accent: 'bg-accent text-secondary',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-border text-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
