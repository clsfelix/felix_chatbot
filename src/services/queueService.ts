import { AnyAction } from "@reduxjs/toolkit";
import { addAnswer, addToQueu, blockPrompt, finishChat, removeLoad, shiftToQueue } from "../store/features/chatSlicer";
import store from "../store/store";
import { getQuestion, questions } from "../constants/Messages";
import IMessage from "../interfaces/IMessage";
import { answersAlternatives } from "../constants/Answers";
import IRegisterServie from "../interfaces/IRegisterService";
import registerService from "./registerService";
import IRegister from "../interfaces/IRegister";

class QueueService {


    registerService:IRegisterServie
    constructor(registerService:IRegisterServie) {
        this.registerService = registerService;
    }

    initQueue() {
        setInterval(() => {
            let { chat } = store.getState();
            let { queue } = chat;
            if (queue.length > 0) {
                store.dispatch(queue[0]);
                store.dispatch(shiftToQueue())
            }
        }, 500)

    }
    addQueue(action: AnyAction) {
        store.dispatch(addToQueu(action))
    }
    addQuestion(question: string, info?:string) {
        const event: AnyAction = { type: 'chat/addQuestion', payload: getQuestion(question, info) };
        store.dispatch(addToQueu(event))
    }
    addLoad() {
        const event: AnyAction = { type: 'chat/addQuestion', payload:{type:'loading', text:''}};
        store.dispatch(addToQueu(event))
    }
    addRate() {
        const event: AnyAction = { type: 'chat/addQuestion', payload:{type:'rating', text:''}};
        store.dispatch(addToQueu(event))
    }
    addAnswer(currentAnswer: string, answer: string) {
        store.dispatch(blockPrompt());
        const payload: {
            message: IMessage,
            currentAnswer: string
        } = {
            message: {
                type: 'answer',
                text: answer
            },
            currentAnswer
        }
        store.dispatch(addAnswer(payload));
        this.getNextQuestion(currentAnswer);
    }
    unblockPrompt() {
        const event: AnyAction = { type: 'chat/unblockPrompt', payload:undefined};
        store.dispatch(addToQueu(event))
    }

    blockPrompt() {
        const event: AnyAction = { type: 'chat/blockPrompt', payload:undefined};
        store.dispatch(addToQueu(event))
    }

    getNextQuestion(currentAnswer:string) {
        switch(currentAnswer) {
            case answersAlternatives.name:
                this.queuedName();
                break;
            case answersAlternatives.state:
                this.queuedState();
                break;
            case answersAlternatives.city:
                this.queuedCity();
                break;
            case answersAlternatives.birthday:
                this.queuedBirthDay();
                break;
            case answersAlternatives.email:
                this.queuedEmail();
                break;
        }
    }
    queuedName() {
        const {chat} = store.getState()
        const {answers} = chat;
        this.addQuestion(questions.welcome, answers.name)
        this.addQuestion(questions.whatYourState)
        this.unblockPrompt();

    }

    queuedState() {
        this.addQuestion(questions.whatYourCity);
        this.unblockPrompt();

    }

    queuedCity() {
        this.addQuestion(questions.whatYourBirthDay);
        this.unblockPrompt();

    }

    queuedBirthDay() {
        this.addQuestion(questions.whatYourEmail);
        this.unblockPrompt();

    }

    queuedEmail() {
        this.addQuestion(questions.congratulations);
        this.saveRegister();
    }


    saveRegister() {
        const {chat} = store.getState()
        const {answers} = chat;
        this.addLoad();
        this.registerService.add(answers as IRegister).then((result)=> {
            if(result) {
                store.dispatch(removeLoad());
                this.addQuestion(questions.availableUs);
                this.addRate();
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    finishChat() {
        store.dispatch(finishChat());
    }
}

const queueService = new QueueService(registerService);

export default queueService;
