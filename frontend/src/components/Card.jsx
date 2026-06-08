import React from 'react';

const Card = ({ 
  children, 
  title,
  subtitle,
  icon: Icon,
  actions,
  className = '',
  padding = 'md',
  variant = 'default',
}) => {
  const paddingSizes = {
    sm: '16px',
    md: '20px',
    lg: '24px',
    none: '0',
  };

  const variants = {
    default: {
      background: 'white',
      border: '1px solid #e5e7eb',
      shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    elevated: {
      background: 'white',
      border: '1px solid #f3f4f6',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    bordered: {
      background: 'white',
      border: '1px solid #e5e7eb',
      shadow: 'none',
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      shadow: 'none',
    },
  };

  const cardStyle = {
    borderRadius: '12px',
    overflow: 'hidden',
    ...variants[variant],
  };

  return (
    <div style={cardStyle} className={className}>
      {(title || subtitle || Icon || actions) && (
        <div style={{ 
          padding: paddingSizes[padding],
          borderBottom: variant !== 'ghost' ? '1px solid #f3f4f6' : 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {Icon && (
              <div style={{ 
                width: '32px', 
                height: '32px', 
                background: '#ecfdf5', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#059669',
              }}>
                <Icon size={18} />
              </div>
            )}
            <div>
              {title && <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>{title}</h3>}
              {subtitle && <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>{subtitle}</p>}
            </div>
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div style={{ padding: paddingSizes[padding] }}>
        {children}
      </div>
    </div>
  );
};

export default Card;