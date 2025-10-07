import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'classnames';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:opacity-60 disabled:pointer-events-none';
const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-sky-500 text-white hover:bg-sky-400 shadow-card',
  outline: 'border border-zinc-700 text-zinc-100 hover:bg-zinc-800/60',
  ghost: 'text-zinc-300 hover:bg-zinc-800/40',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
