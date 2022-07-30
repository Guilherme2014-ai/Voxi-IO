import io from "socket.io-client";

const urls = {
  heroku: "https://voxiio.herokuapp.com",
  local: "http://localhost",
};

export const socket = io(urls.heroku);
