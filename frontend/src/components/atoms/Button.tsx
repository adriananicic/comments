import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { Icon, IconName } from './Icon';
import Spinner from './Spinner';

type ButtonType = 'normal' | 'danger';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: IconName;
  onClick?: () => void;
  buttonType: ButtonType;
  loading?: boolean;
}

const Button: FC<IButtonProps> = ({
  onClick,
  icon,
  label,
  buttonType,
  disabled,
  loading,
  ...props
}) => {
  const colors: Record<ButtonType, string> = {
    danger: 'bg-danger',
    normal: 'bg-accent',
  };
  return (
    <button
      {...props}
      onClick={onClick}
      className={classNames(
        colors[buttonType],
        disabled
          ? 'cursor-default opacity-50'
          : 'cursor-pointer hover:scale-[102%] active:scale-[98%]',
        'text-primary-weak rounded-md p-4 gap-3 flex items-center transition-all duration-200 '
      )}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && <Icon size={24} className="bg-primary-weak" icon={icon} />}
          {label && <p className="text-primary-weak body-1 ">{label}</p>}
        </>
      )}
    </button>
  );
};

export default Button;
