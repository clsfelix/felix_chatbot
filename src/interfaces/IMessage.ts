export default interface IMessage {
    text:string;
    type: "question"| 'answer' | 'loading' | 'rating'
}