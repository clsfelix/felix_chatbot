import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMessage from "../../interfaces/IMessage";
import IChatState from "../../interfaces/IChatState";
import { answersAlternatives } from "../../constants/Answers";
import { brazilianStates } from "../../constants/BrazilianStates";





const initialState:IChatState = {
    messages:[],
    queue:[], 
    answers:{},
    currentAnswer:'name',
    savedAnswers:{},
    blockPrompt:true, 
    finished:false
};

const chatSlice = createSlice({
    name:'chat', 
    initialState,
    reducers: {
        initChat:(state) => {
            state.messages = initialState.messages;
            state.queue = initialState.queue;
            state.answers = initialState.answers;
            state.currentAnswer = initialState.currentAnswer;
            state.savedAnswers = initialState.savedAnswers;
        },
        addQuestion: (state, action:PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },
        addAnswer:(state, action:PayloadAction<{message:IMessage, currentAnswer:string}>) => {
            if(action.payload.currentAnswer === 'state') {
                state.answers[action.payload.currentAnswer] = action.payload.message.text;
                const message:IMessage = {
                    type:'answer',
                    text:brazilianStates[action.payload.message.text]
                }
                state.messages.push(message);
            } else {
                state.answers[action.payload.currentAnswer] = action.payload.message.text;
                state.messages.push(action.payload.message);
            }
        },
        addToQueu: (state, action:PayloadAction<any>) => {
            state.queue.push(action.payload);
        },
        shiftToQueue:(state) => {
            state.queue.shift();
        }, 
        nextAnswer: (state) => {
            switch (state.currentAnswer) {
                case answersAlternatives.name:
                    state.currentAnswer = answersAlternatives.state;
                    break;
                case answersAlternatives.state:
                    state.currentAnswer = answersAlternatives.city;
                    break;
                case answersAlternatives.city:
                    state.currentAnswer = answersAlternatives.birthday;
                    break;
                case answersAlternatives.birthday:
                    state.currentAnswer = answersAlternatives.email;
                    break;
                case answersAlternatives.email:
                    state.currentAnswer = answersAlternatives.rate;
                    break;
            }
        },
        setSavedAnswers: (state, action:PayloadAction<any>) => {
            state.savedAnswers = action.payload;
        },
        insertLoad: (state) => {
            state.messages.push({text:"", type:'loading'});
        },
        removeLoad: (state) => {
            state.messages.pop();
        },
        blockPrompt: (state) => {
            state.blockPrompt = true;
        },
        unblockPrompt: (state) => {
            state.blockPrompt = false
        },
        finishChat: (state) => {
            state.finished = true;
        }
    }
})

export const {
    addQuestion, 
    addAnswer,
    initChat, 
    addToQueu,
    shiftToQueue,
    nextAnswer,
    setSavedAnswers,
    insertLoad,
    removeLoad,
    blockPrompt,
    unblockPrompt,
    finishChat
} = chatSlice.actions;
export default chatSlice.reducer;