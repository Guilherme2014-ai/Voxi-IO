export default (username: string) => {
  const slugfiedUsername = username
    .replace(" ", "-")
    .replace("_", "-")
    .replace("@", "-")
    .replace(".", "-")
    .toLowerCase();

  return slugfiedUsername;
};
