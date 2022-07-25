export default (username: string) => {
  const slugfiedUsername = username
    .replaceAll(" ", "-")
    .replaceAll("_", "-")
    .replaceAll("@", "-")
    .replaceAll(".", "-")
    .toLowerCase();

  return slugfiedUsername;
};
