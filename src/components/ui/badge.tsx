import { HTMLAttributes } from 'react';
import clsx from 'classnames';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border border-zinc-700/70 bg-zinc-800/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-300',
        className,
      )}
      {...props}
    />
  );
}
