import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

type PaperProps = {
  children: ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4;
  rounded?: boolean;
  className?: string;
};

const Paper: React.FC<PaperProps> = ({
  children,
  elevation = 1,
  rounded = true,
  className = '',
}) => {
  const elevationClass = `elevation-${elevation}`;
  const roundedClass = rounded ? styles.rounded : '';

  return (
    <div className={`${styles.paper} ${styles[elevationClass]} ${roundedClass} ${className}`}>
      {children}
    </div>
  );
};

export default Paper;