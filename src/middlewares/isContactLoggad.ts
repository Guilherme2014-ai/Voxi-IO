export const isContactLogged = () => {
  const contactUsername = localStorage.getItem("contact_username");

  return contactUsername != undefined && contactUsername != null;
};
