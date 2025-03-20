//aa
import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }) => {
  return (
    <MuiButton onClick={onClick} {...props}>
      {children}
    </MuiButton>
  );
};

export default React.memo(Button);