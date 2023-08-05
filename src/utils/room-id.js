const roomId = location.hash.split("#")[1];

if (!roomId) {
  location.hash = "default";
}

export { roomId };
