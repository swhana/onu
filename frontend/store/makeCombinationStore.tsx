import { create } from 'zustand';

type combListState = {
  combList: Array<number>;

  addSelected: (id: number) => void;
  removeSelected: (id: number) => void;
  resetCombList: () => void;
};

export const makeCombinationStore = create<combListState>((set) => ({
  combList: [],

  addSelected: (id: number): void =>
    set((state: combListState): { combList: Array<number> } => ({
      combList: [...state.combList, id],
    })),

  removeSelected: (id: number): void =>
    set((state: combListState): { combList: Array<number> } => ({
      combList: state.combList.filter(
        (combitem: number) => combitem !== id,
      ),
    })),
  resetCombList: (): void =>
    set(() => ({
      combList: [],
    })),
}));
