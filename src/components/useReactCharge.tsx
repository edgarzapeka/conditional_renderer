import { useCallback, useEffect, useState } from "react";
import { useResolverContext } from "./context";
import { reactChargeRenderer } from "./ReactChargeRenderer";
import { IUseReactCharge, IUseReactChargeReturn, NetworkStatus } from "./types";

export const useReactCharge = ({
  onStart,
  Loading,
  Error,
  Success,
}: IUseReactCharge): IUseReactChargeReturn => {
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

  const Renderer = reactChargeRenderer({
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
