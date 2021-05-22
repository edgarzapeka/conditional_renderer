import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IResolverContextValues {
  data: any;
  setData: (data: any) => void;
}

const _resolverContext = createContext({} as IResolverContextValues);

export const useResolverContext = () => useContext(_resolverContext);

export const ResolverProvider = (props: PropsWithChildren<{}>) => {
  const [data, setData] = useState<any>(null);
  return (
    <_resolverContext.Provider value={{ data, setData }}>
      {props.children}
    </_resolverContext.Provider>
  );
};
