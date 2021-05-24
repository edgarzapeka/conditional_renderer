import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
  memo,
  useMemo,
  useCallback,
} from "react";
import { NetworkStatus } from "./networkStatus";
import { useResolverContext } from "./resolverContext";

interface IUseErrorResolverReturnType {
  status: string;
  Renderer: (props: PropsWithChildren<{}>) => ReactElement | null;
}

interface IUseErrorResolverProps {
  onStart: () => Promise<any>;
  Loading: () => ReactElement;
  Error: () => ReactElement;
  Success?: () => ReactElement;
}

const errorRenderer = ({
  networkStatus,
  Loading,
  Error,
  Success,
}: { networkStatus: NetworkStatus } & Pick<
  IUseErrorResolverProps,
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

export const useErrorResolver = ({
  onStart,
  Loading,
  Error,
  Success,
}: IUseErrorResolverProps): IUseErrorResolverReturnType => {
  console.log("rendering useErrorResolver");
  const { setData } = useResolverContext();
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(
    NetworkStatus.Idle
  );

  const fetchOnStart = useCallback(async () => {
    if (networkStatus === NetworkStatus.Idle) {
      try {
        setNetworkStatus(NetworkStatus.Fetching);
        const data = await onStart();
        console.log(data);
        setData(data);
        setNetworkStatus(NetworkStatus.Success);
      } catch (error) {
        setNetworkStatus(NetworkStatus.Failed);
        console.log(error);
      }
    }
  }, [networkStatus, onStart, setData]);

  useEffect(() => {
    fetchOnStart();
  }, [fetchOnStart]);

  const Renderer = errorRenderer({
    networkStatus,
    Loading,
    Error,
    Success,
  });

  return {
    status: networkStatus,
    Renderer,
  };
};
