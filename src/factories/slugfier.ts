export default (username: string) => {
  const slugfiedUsername = username.replace(" ", "-").toLowerCase();
  return slugfiedUsername;
};
