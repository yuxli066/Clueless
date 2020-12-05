let initPos = [2, 2];
let observers = [];
function emitChange() {
  observers.forEach((o) => o && o(initPos));
}
export function observe(o) {
  observers.push(o);
  emitChange();
  return () => {
    observers = observers.filter((t) => t !== o);
  };
}
export function movePlayer(toX, toY) {
  initPos = [toX, toY];
  console.log(`Moving to position: [${toX} ${toY}]`);
  emitChange();
}
