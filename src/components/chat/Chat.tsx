import ChatBody from '../chatBody/ChatBody'
import Header from '../header/Header'
import Prompt from '../prompt/Prompt'
import './chat.scss'
import { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from 'react-redux';
import { ChatContext } from '../../context/ChatContext';
import IChatContext from '../../interfaces/IChatContext';
import FinishScreen from '../finishScreen/FinishScreen';


export default function Chat() {
    const context: IChatContext = {
        dispatch: useDispatch<AppDispatch>(),
        chatState: useSelector((state: RootState) => state.chat)
    }

    const { finished } = useSelector((state: RootState) => state.chat);



    if (finished) {
        return (
            <>
                <div className="body">
                    <FinishScreen />
                </div>                
            </>
        )
    } else {
        return (
            <>
                <div className="body">
                    <ChatContext.Provider value={context}>
                        <Header />
                        <ChatBody />
                        <Prompt />
                    </ChatContext.Provider>

                </div>
            </>
        )
    }
}