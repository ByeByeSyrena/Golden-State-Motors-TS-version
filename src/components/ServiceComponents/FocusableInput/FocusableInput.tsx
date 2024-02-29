import React, { forwardRef, useImperativeHandle, useRef } from "react";
import type { ForwardedRef } from "react";

type Props = {
  value?: string | number;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
};

export type FocusableInputRef = {
  focus: () => void;
};

function FocusableInput(
  { id, onChange, onClick, placeholder, type, className }: Props,
  ref: ForwardedRef<FocusableInputRef>
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
      id={id}
      ref={inputRef}
      type={type}
      className={className}
    />
  );
}

const refForwarded = forwardRef<FocusableInputRef, Props>(FocusableInput);

export { refForwarded as FocusableInput };
