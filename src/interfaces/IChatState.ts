import { AnyAction } from "@reduxjs/toolkit";
import IMessage from "./IMessage";

export default interface IChatState {
    messages:IMessage[];
    queue: AnyAction[];
    answers:any;
    currentAnswer: 'name'|'state'|'city'|'birthday'|'email'|'rate';
    savedAnswers:any;
    blockPrompt: boolean;
    finished:boolean
}