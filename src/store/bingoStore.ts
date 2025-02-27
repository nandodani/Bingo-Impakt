import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BingoAction } from '../types';

const defaultActions = [
  `&apos;Lamentável&apos; x3`,
  "A Gi mudou o alerta de sub x3",
  "Jogou-se um Sultz Like",
  "O Impakt bebeu café x6",
  `O Impakt disse &apos;A tua mãe&apos; pelo menos 2x`,
  "Os trailers duraram mais de 2 horas",
  "Atingimos o sub goal",
  "O Impakt vestiu o fato de T-Rex",
  "O Impakt não cumpriu a poll",
  "O Impakt foi tirano",
  "O Impakt foi a um simulador qualquer",
  "A Gi levou outra multa",
  "O Garcia perguntou se podia montar a Freya",
  "Coop com o Garcia",
  `O chat spammou o emote &apos;Tirano&apos;`,
  `O chat spammou o emote &apos;Parabéns&apos;`,
  "iiiiiiiiiiiiii aaaaaaaa",
  "A stream começou antes das 9h30m",
  "O dia do pai foi mencionado",
  "Falou-se de comida antes das 11h",
  "Pá ou apanhador?",
  "Crocs",
  "Meu pai estás sofrendooooo...",
  "A RTP Arena mandou os parabéns",
  "O Pai tá online?",
  `Jogou-se &apos;Drive is Hard&apos; ou algo do género`,
  "O Impakt está a usar os chinelos do SPAIder-Man",
  "10cm",
  `O Impakt disse &apos;Eu não faço anos hoje&apos;`,
  `O Impakt disse &apos;Eu não sou vosso pai&apos;`,
  `Ouviu-se &apos;Paizinho&apos;`,
  "O Impakt brincou com a Freya",
  "A Gi fez uma festa na Freya",
  "Houve um jogo desisntalado",
];

interface BingoState {
  streamerName: string;
  actions: string[];
  customActions: string[];
  card: BingoAction[];
  marked: { [id: number]: boolean };
  generateCard: () => void;
  addCustomAction: (action: string) => void;
  removeCustomAction: (index: number) => void;
  markSquare: (id: number) => void;
  setStreamerName: (name: string) => void;
  resetGame: () => void;
}

const useBingoStore = create(
  persist<BingoState>(
    (set, get) => ({
      streamerName: "Impakt",
      actions: defaultActions,
      customActions: [],
      card: [],
      marked: {},
      generateCard: () => {
        const allActions = [...get().actions, ...get().customActions];
        const shuffledActions = allActions.sort(() => Math.random() - 0.5);
        const newCard:BingoAction[] = [];
        const uniqueActions = new Set();
        for (const action of shuffledActions) {
            if (!uniqueActions.has(action)) {
              uniqueActions.add(action);
              newCard.push({id: newCard.length, action:action});
            }
            if(newCard.length === 25) break;
        }
        if(newCard.length < 25){
          const defaultActionsToAdd = defaultActions.filter((item) => !newCard.some((cardItem) => cardItem.action === item))
          for(let i = newCard.length; i < 25; i++){
              const randomIndex = Math.floor(Math.random() * defaultActionsToAdd.length);
              newCard.push({id:i, action:defaultActionsToAdd[randomIndex]})
              defaultActionsToAdd.splice(randomIndex, 1); 
          }
        }

        set({ card: newCard, marked: {} });
      },
      addCustomAction: (action) => {
        set((state) => {
          const updatedCustomActions = [...state.customActions, action];
          const updatedActions = [...state.actions, action];
          if (!state.card.some(cardItem => cardItem.action === action) && state.card.length < 25) {
            const newCard = [...state.card, { id: state.card.length, action: action }];
            return {
              customActions: updatedCustomActions,
              actions: updatedActions,
              card: newCard,
            };
          } else {
            return {
              customActions: updatedCustomActions,
              actions: updatedActions,
            };
          }
        });
      },
      removeCustomAction: (index) => {
        set((state) => {
          const updatedCustomActions = [...state.customActions];
          const removedAction = updatedCustomActions.splice(index, 1)[0];

          const updatedActions = [...state.actions].filter(item => item !== removedAction);
          
          const updatedCard = [...state.card].filter(item => item.action !== removedAction);
          
          if(updatedCard.length < 25){
             const allActions = [...updatedActions, ...updatedCustomActions];
             const shuffledActions = allActions.sort(() => Math.random() - 0.5);
             const newCard:BingoAction[] = [];
              const uniqueActions = new Set();
              for (const action of shuffledActions) {
                  if (!uniqueActions.has(action)) {
                    uniqueActions.add(action);
                    newCard.push({id: newCard.length, action:action});
                  }
                  if(newCard.length === 25) break;
              }
             if(newCard.length < 25){
                 const defaultActionsToAdd = defaultActions.filter((item) => !newCard.some((cardItem) => cardItem.action === item))
                for(let i = newCard.length; i < 25; i++){
                   const randomIndex = Math.floor(Math.random() * defaultActionsToAdd.length);
                   newCard.push({id:i, action:defaultActionsToAdd[randomIndex]})
                   defaultActionsToAdd.splice(randomIndex, 1); 
                 }
            }
            return {
               customActions: updatedCustomActions,
               actions: updatedActions,
               card:newCard,
            }
          } else {
            return {
               customActions: updatedCustomActions,
               actions: updatedActions,
               card:updatedCard,
            }
          }
        });
      },
      markSquare: (id) => {
        const currentMarked = get().marked;
        set({ marked: { ...currentMarked, [id]: !currentMarked[id] } });
      },
      setStreamerName: (name) => {
        set({ streamerName: name });
      },
      resetGame: () => {
        set({ marked: {}, card: [] });
      },
    }),
    {
      name: "bingo-storage",
    }
  )
);

export default useBingoStore;
