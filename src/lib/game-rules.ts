import { type PlayerCount } from "../context/GameContext";

export const MISSION_COUNTS: Record<PlayerCount, [number, number, number, number, number]> = {
  5: [2, 3, 2, 3, 3],
  6: [2, 3, 4, 3, 4],
  7: [2, 3, 3, 4, 4],
  8: [3, 4, 4, 5, 5],
  9: [3, 4, 4, 5, 5],
  10: [3, 4, 4, 5, 5],
};

export const FAILS_REQUIRED: Record<PlayerCount, [boolean, boolean, boolean, boolean, boolean]> = {
  5: [false, false, false, false, false],
  6: [false, false, false, false, false],
  7: [false, false, false, true, false],
  8: [false, false, false, true, false],
  9: [false, false, false, true, false],
  10: [false, false, false, true, false],
};

export const ROLE_COUNTS: Record<PlayerCount, { resistance: number; spies: number }> = {
  5: { resistance: 3, spies: 2 },
  6: { resistance: 4, spies: 2 },
  7: { resistance: 4, spies: 3 },
  8: { resistance: 5, spies: 3 },
  9: { resistance: 6, spies: 3 },
  10: { resistance: 6, spies: 4 },
};
