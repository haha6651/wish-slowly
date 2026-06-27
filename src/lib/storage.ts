import { UserState, Wish, DiaryEntry, MicroAction } from '../types';
import { INITIAL_WISHES, INITIAL_DIARIES, INITIAL_MICRO_ACTIONS } from '../data/initialData';

const STORAGE_KEYS = {
  USER_STATE: 'wish_slowly_user_state_v2',
  WISHES: 'wish_slowly_wishes_v2',
  DIARIES: 'wish_slowly_diaries_v2',
  ACTIONS: 'wish_slowly_actions_v2',
  LAST_LOGIN_DATE: 'wish_slowly_last_date_v2'
};

const DEFAULT_USER_STATE: UserState = {
  stardustCount: 65,
  actionsCompletedTotal: 14,
  wishesCompletedTotal: 1,
  diariesLoggedTotal: 4,
  soundEnabled: false,
  soundTheme: 'purr'
};

export function getStoredUserState(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_STATE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading user state', e);
  }
  return DEFAULT_USER_STATE;
}

export function saveStoredUserState(state: UserState) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify(state));
  } catch (e) {}
}

export function getStoredWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHES);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return INITIAL_WISHES;
}

export function saveStoredWishes(wishes: Wish[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(wishes));
  } catch (e) {}
}

export function getStoredDiaries(): DiaryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIARIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return INITIAL_DIARIES;
}

export function saveStoredDiaries(diaries: DiaryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.DIARIES, JSON.stringify(diaries));
  } catch (e) {}
}

export function getStoredActions(): MicroAction[] {
  try {
    const todayStr = new Date().toDateString();
    const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_LOGIN_DATE);
    
    // 如果是新的一天，重置当日行动状态
    if (lastDate !== todayStr) {
      localStorage.setItem(STORAGE_KEYS.LAST_LOGIN_DATE, todayStr);
      const resetActions = INITIAL_MICRO_ACTIONS.map(a => ({ ...a, completedToday: false }));
      saveStoredActions(resetActions);
      return resetActions;
    }

    const raw = localStorage.getItem(STORAGE_KEYS.ACTIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return INITIAL_MICRO_ACTIONS;
}

export function saveStoredActions(actions: MicroAction[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIONS, JSON.stringify(actions));
  } catch (e) {}
}
