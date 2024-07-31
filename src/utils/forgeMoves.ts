const negMoves = [-15, -9, -6, -3];
const moves = [16, 13, 7, 2];

export function forgeMoves(step: number, baseAction: number[] = []): number[] {
  if (step === 0) return [];

  const moveArray = step > 0 ? negMoves : moves;
  const addArray = step > 0 ? moves : negMoves;

  var action: number[] = [];
  var lState = Math.abs(step);

  moveArray.forEach((move) => {
    const mMove = Math.abs(move);
    for (let i = 0; i < Math.floor(lState / mMove); i++) {
      action.push(move);
    }
    lState = lState % mMove;
  });

  if (lState > 0) {
    const lastAction: number = addArray[addArray.length - 1];
    return forgeMoves(step + addArray[addArray.length - 1], [
      ...baseAction,
      lastAction,
    ]);
  }
  return [...baseAction, ...action];
}
