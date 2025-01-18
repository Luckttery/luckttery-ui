import React, { forwardRef } from 'react';
import styles from './styles.module.scss';

type InputFieldProps = {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  helperText,
  error,
  fullWidth = false,
  size = 'md',
  startIcon,
  endIcon,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const inputClasses = [
    styles.input,
    styles[size],
    fullWidth ? styles.fullWidth : '',
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    startIcon ? styles.hasStartIcon : '',
    endIcon ? styles.hasEndIcon : '',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.wrapper,
    fullWidth ? styles.fullWidth : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {startIcon && (
          <div className={styles.startIcon}>
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {endIcon && (
          <div className={styles.endIcon}>
            {endIcon}
          </div>
        )}
      </div>
      {(helperText || error) && (
        <p className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;