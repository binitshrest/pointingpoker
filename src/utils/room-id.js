if (!location.hash.split("#")[1]) {
  location.hash = "default-room";
}

const roomId = location.hash.split("#")[1];

export { roomId };
