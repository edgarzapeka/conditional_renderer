import { PropsWithChildren } from "react";
import { IUseReactCharge, NetworkStatus } from "./types";

export const reactChargeRenderer = ({
  networkStatus,
  Loading,
  Error,
  Success,
}: { networkStatus: NetworkStatus } & Pick<
  IUseReactCharge,
  "Loading" | "Error" | "Success"
>) => {
  console.log("rendering errorRenderer");
  return ({ children }: PropsWithChildren<{}>) => {
    if (children && Success) {
      console.warn(
        "You provided `shildren` & `Success` compoents at the same time. Only `Success` will be rendered. Please remove children since they are ignored"
      );
    }
    console.log("RendererHoc:: rendering");
    if (networkStatus === NetworkStatus.Idle) return null;
    if (networkStatus === NetworkStatus.Fetching) return <Loading />;
    if (networkStatus === NetworkStatus.Failed) return <Error />;
    console.log("RendererHoc:: rendering children");
    return <>{Success ? <Success /> : children}</>;
  };
};
