import IMessage from "./IMessage";

export default interface IChatService {
    messages:IMessage[];
    addQuestion(question:string, time?:number):Promise<void>;
    addAnswer(answer:string):void;
    getMessages():IMessage[];
    saveRegister():Promise<void>
}