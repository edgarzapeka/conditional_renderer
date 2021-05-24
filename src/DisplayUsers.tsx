import { useResolverContext } from "./components/context/resolverContext";

export const DisplayUsers = () => {
  const { data } = useResolverContext();
  console.log("displayUsers");
  return (
    <div>
      {data.map((u: any) => (
        <div key={u.name}>
          <p>{u.name}</p>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
};
