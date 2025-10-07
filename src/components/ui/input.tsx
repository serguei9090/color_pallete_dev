import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'classnames';

const baseStyles = 'flex h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:opacity-50 disabled:pointer-events-none';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    return <input ref={ref} type={type} className={clsx(baseStyles, className)} {...props} />;
  },
);

Input.displayName = 'Input';
