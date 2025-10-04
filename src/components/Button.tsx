import clsx from 'clsx';
import React from 'react';

type CustomProps = {
  children: React.ReactNode;
  className?: string;
};

type Props = CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button
      className={clsx(
        'flex gap-1 align-baseline justify-center text-base text-light-text rounded-lg pt-2.5 pr-4.5 pb-2.5 pl-3 bg-primary-color font-semibold cursor-pointer',
        rest.disabled && 'bg-bg-2 cursor-not-allowed text-dark-1',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
