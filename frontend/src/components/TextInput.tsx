import React from "react";
import styled from "styled-components/macro";

interface TextInputProps {
  className?: string;
  value?: string;
  placeholder: string;
  onChange?: (val: string) => void;
}

const StyledInput = styled.input`
  font-size: 1.25rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.5rem;
  border-radius: 14rem;
`;

const TextInput = ({
  className,
  value,
  placeholder,
  onChange,
}: TextInputProps) => {
  return (
    <StyledInput
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onChange) onChange(e.target.value);
      }}
    />
  );
};

export default TextInput;
