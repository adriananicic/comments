import React from 'react';

// Copied from previous project

const icons = {
  send: '/assets/icons/send.svg',
  code: '/assets/icons/code.svg',
  dot: '/assets/icons/dot.svg',
  reply: '/assets/icons/reply.svg',
  plus: '/assets/icons/plus.svg',
};

export type IconName = keyof typeof icons;

export const Icon: React.FC<{
  icon: IconName;
  size?: string | number;
  className?: string;
}> = ({ icon, size, className }) => {
  return (
    <div
      className={'transition-all ease-in duration-200 '.concat(
        className ? className : 'bg-neutral'
      )}
      style={{
        height: size ? size : '24px',
        width: size ? size : '24px',
        WebkitMaskImage: `url('${icons[icon]}')`,
        maskImage: `url('${icons[icon]}')`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center center',
        maskRepeat: 'no-repeat',
      }}
    />
  );
};
