import { createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PlayerState {
    name: string;
    score: number;
}

export interface CreationState {
    ['player-1']: PlayerState;
    ['player-2']: PlayerState;
}

const initialState: CreationState = {
    'player-1': {
        name: 'A',
        score: 0,
    },
    'player-2': {
        name: 'B',
        score: 0,
    }
}


const CreationSlice = createSlice({
    name: 'creation',
    initialState,
    reducers: {
        incrementScore: (state, action: PayloadAction<'player-1' | 'player-2'>) => {
            state[action.payload].score += 1;
        },
        SetName: (state, action: PayloadAction<{ player: 'player-1' | 'player-2'; name: string }>) => {
            state[action.payload.player].name = action.payload.name;
        },
        resetState: () => initialState, 
    }
})

export const { incrementScore , SetName , resetState } = CreationSlice.actions;
export default CreationSlice.reducer;