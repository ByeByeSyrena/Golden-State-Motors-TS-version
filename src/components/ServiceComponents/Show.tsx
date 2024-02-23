import React, { Children, useEffect, useState, ReactNode } from "react";

type ShowProps = {
  children: ReactNode;
};

type ShowWhenProps = {
  isTrue: boolean;
  children: ReactNode;
};

type ShowElseProps = {
  children: ReactNode;
};

const Show: React.FC<ShowProps> & {
  When: React.FC<ShowWhenProps>;
  Else: React.FC<ShowElseProps>;
} = (props) => {
  const [showComponent, setShowComponent] = useState<ReactNode | null>(null);

  useEffect(() => {
    let when: ReactNode | null = null;
    let otherwise: ReactNode | null = null;

    Children.forEach(props.children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === Show.When && child.props.isTrue === true) {
          when = child;
        } else if (child.type === Show.Else) {
          otherwise = child;
        }
      }
    });

    setShowComponent(when || otherwise);
  }, [props.children]);

  return <>{showComponent}</>;
};

const ShowWhen: React.FC<ShowWhenProps> = ({ isTrue, children }) =>
  isTrue ? <>{children}</> : null;

const ShowElse: React.FC<ShowElseProps> = ({ children }) => <>{children}</>;

Show.When = ShowWhen;
Show.Else = ShowElse;

export { Show };
