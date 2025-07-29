import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text,
  overlay = false,
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const spinner = (
    <div className={`loading-spinner ${overlay ? 'loading-overlay' : ''}`}>
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );

  return spinner;
};

// Composant de skeleton pour un meilleur UX
export const SkeletonLoader: React.FC<{
  lines?: number;
  height?: string;
  className?: string;
}> = ({ lines = 3, height = '20px', className = '' }) => {
  return (
    <div className={`skeleton-container ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton-line"
          style={{ height, marginBottom: '8px' }}
        />
      ))}
    </div>
  );
};

// CSS pour les animations (à ajouter dans App.css)
export const loadingStyles = `
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.skeleton-container {
  padding: 1rem;
}

.skeleton-line {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;
