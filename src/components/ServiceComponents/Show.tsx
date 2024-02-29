import React, { Children, useEffect, useState, ReactNode } from "react";

type ShowProps = {
  children: ReactNode;
};

type ShowWhenProps = {
  isTrue: boolean | undefined;
  children: ReactNode;
};

export const Show: React.FC<ShowProps> & {
  When: React.FC<ShowWhenProps>;
  Else: React.FC<ShowProps>;
} = (props) => {
  const [showComponent, setShowComponent] = useState<ReactNode | null>(null);

  useEffect(() => {
    let when: ReactNode | null = null;
    let otherwise: ReactNode | null = null;

    Children.forEach(props.children, (child) => {
      if (React.isValidElement(child) && child.props.isTrue === true) {
        when = child;
      } else if (!when && React.isValidElement(child)) {
        otherwise = child;
      }
    });

    setShowComponent(when || otherwise);
  }, [props.children]);

  return <>{showComponent}</>;
};

export const ShowWhen: React.FC<ShowWhenProps> = ({ isTrue, children }) =>
  isTrue ? <>{children}</> : null;

export const ShowElse: React.FC<ShowProps> = ({ children }) => <>{children}</>;

Show.When = ShowWhen;
Show.Else = ShowElse;
