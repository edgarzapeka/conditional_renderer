import { PropsWithChildren, ReactElement } from "react";

interface IProps {
  renderError: ReactElement;
}

export const NetworkResolver = ({ children }: PropsWithChildren<IProps>) => {
  return <>{children}</>;
};
