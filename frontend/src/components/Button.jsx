import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  type = 'button',
  fullWidth = false,
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '500',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      color: 'white',
      border: 'none',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      hover: {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
    secondary: {
      background: 'white',
      color: '#374151',
      border: '1px solid #e5e7eb',
      hover: {
        background: '#f9fafb',
        borderColor: '#d1d5db',
      },
    },
    outline: {
      background: 'transparent',
      color: '#059669',
      border: '1px solid #059669',
      hover: {
        background: '#ecfdf5',
      },
    },
    ghost: {
      background: 'transparent',
      color: '#6b7280',
      border: 'none',
      hover: {
        background: '#f3f4f6',
        color: '#374151',
      },
    },
    danger: {
      background: 'white',
      color: '#dc2626',
      border: '1px solid #fecaca',
      hover: {
        background: '#fef2f2',
        borderColor: '#fca5a5',
      },
    },
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: '13px', height: '32px' },
    md: { padding: '8px 16px', fontSize: '14px', height: '40px' },
    lg: { padding: '10px 20px', fontSize: '16px', height: '48px' },
  };

  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  const buttonStyle = {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
    ...(typeof variantStyles.hover === 'object' && {
      transition: 'all 0.2s ease',
    }),
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (!disabled && !loading && variantStyles.hover) {
          Object.assign(e.currentTarget.style, variantStyles.hover);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading && variantStyles.hover) {
          Object.assign(e.currentTarget.style, {
            background: variantStyles.background,
            color: variantStyles.color,
            border: variantStyles.border,
            transform: 'none',
            boxShadow: variantStyles.boxShadow || 'none',
          });
        }
      }}
    >
      {loading && (
        <div className="animate-spin-slow" style={{ width: sizeStyles.fontSize, height: sizeStyles.fontSize }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon size={sizeStyles.fontSize === '13px' ? 14 : 16} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !loading && <Icon size={sizeStyles.fontSize === '13px' ? 14 : 16} />}
    </button>
  );
};

export default Button;