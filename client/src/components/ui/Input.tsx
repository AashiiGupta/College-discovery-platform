import { clsx } from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = ({ label, error, icon, id, className, ...props }: InputProps) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted dark:text-slate-500">
          {icon}
        </div>
      )}
      <input
        id={id}
        className={clsx(
          'input-base',
          icon ? 'pl-10' : '',
          error ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : '',
          className
        )}
        {...props}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
  </div>
);
