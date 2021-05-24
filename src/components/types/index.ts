import { PropsWithChildren, ReactElement } from "react";

export * from "./networkStatus";

export interface IUseReactCharge {
  onStart: () => Promise<any>;
  Loading: () => ReactElement;
  Error: () => ReactElement;
  Success?: () => ReactElement;
}

export interface IUseReactChargeReturn {
  status: string;
  Renderer: (props: PropsWithChildren<{}>) => ReactElement | null;
}
