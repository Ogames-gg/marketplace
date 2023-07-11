'use client'
import React, { useState} from 'react'
import styled from 'styled-components';


const Card = ({ onClick, children }) => {

    const [isActive, setIsActive] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
      setIsActive(!isActive);
      onClick();
      return false;
    };

    const StyledButton = styled.button`
  /* background-color: ${({ isActive }) => (isActive ? '#5F18D1' : '#FFFCEA')}; */
  padding: 2px;
  border: ${({ isActive }) => (isActive ? '2px solid #5F18D1' : 'none')};
  cursor: pointer;
  width: 180px;
  height: 180px;
  border-radius: 2px;

  &:hover {
    /* background-color: ${({ isActive }) => (isActive ? '#6ce738' : '#FFFCEA')}; */
    opacity: 0.80;
  }
`;

  return (
    <StyledButton isActive={isActive} onClick={handleClick}>
        { children }
    </StyledButton>
  )
}

export default Card