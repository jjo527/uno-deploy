import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Generate Images</button>;
};

export default Button;
