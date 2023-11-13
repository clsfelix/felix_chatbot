import { questions } from "../constants/Messages";
import { initChat } from "../store/features/chatSlicer";
import store from "../store/store";
import queueService from "./queueService";

const initChatService = function() {
    store.dispatch(initChat());
    queueService.initQueue();
    queueService.addQuestion(questions.hello);
    queueService.addQuestion(questions.whatYourName);
    queueService.unblockPrompt();
}

export default initChatService;