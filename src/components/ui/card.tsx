import { HTMLAttributes } from 'react';
import clsx from 'classnames';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/40 shadow-card',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('px-5 py-4 border-b border-zinc-800/80', className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx('text-sm font-semibold text-zinc-100', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('px-5 py-4 space-y-3 text-sm text-zinc-300', className)} {...props} />;
}
