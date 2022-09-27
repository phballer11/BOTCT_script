import { DEMON, MINIONS, OUTSIDERS, role, TOWN_FOLKS } from "./images";

export const isTownsfolk = (role: role) => TOWN_FOLKS.findIndex(r => r.alt === role.alt) !== -1

export const isOutsider = (role: role) => OUTSIDERS.findIndex(r => r.alt === role.alt) !== -1

export const isMinion = (role: role) => MINIONS.findIndex(r => r.alt === role.alt) !== -1

export const isDemon = (role: role) => role.alt === DEMON.alt;