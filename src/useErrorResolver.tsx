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
}

const errorRenderer = ({
  networkStatus,
  Loading,
  Error,
}: { networkStatus: NetworkStatus } & Pick<
  IUseErrorResolverProps,
  "Loading" | "Error"
>) => {
  console.log("rendering errorRenderer");
  return ({ children }: PropsWithChildren<{}>) => {
    console.log("RendererHoc:: rendering");
    if (networkStatus === NetworkStatus.Idle) return null;
    if (networkStatus === NetworkStatus.Fetching) return <Loading />;
    if (networkStatus === NetworkStatus.Failed) return <Error />;
    console.log("RendererHoc:: rendering children");
    return <>{children}</>;
  };
};

export const useErrorResolver = ({
  onStart,
  Loading,
  Error,
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
  });

  return {
    status: networkStatus,
    Renderer,
  };
};
