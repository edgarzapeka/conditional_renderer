export const fetchUsers = async () => {
  //throw "error";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { name: "Edgar", email: "test@test.ca" },
    { name: "Austin", email: "hack@me.com" },
  ];
};
