import { Avatar, Button } from '@mui/material'
import './message.scss'

import avatar from './../../assets/img/gato_felix_avatar.png';
import { useContext, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import saveRateService from '../../services/saveRateService';
import queueService from '../../services/queueService';

export default function Message() {

    const chatContext = useContext(ChatContext);

    const [rate, setRate] = useState<number>(0);

    const selectRate = (rate:number) => {
        setRate(rate);
    }


    const saveRate = async() => {
        const {savedAnswers} = chatContext.chatState;
        const response = await saveRateService.handle({registerId:savedAnswers.id, rate});
        if(response) {
            queueService.finishChat();
        }
    }

    return (
        <>



            <div className="question">
                {

                    chatContext.chatState.messages.map((message, index, items) => {

                        if ((message.type === 'question' && index == 0) || (message.type == 'question' && index !== 0 && items[index - 1].type === 'answer')) {
                            return (<div className='withAvatar' key={`message-${index}`}>
                                <Avatar alt='Gato Felix' src={avatar} className='avatar' />
                                <div className="questionBody">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                            )

                        } else if (message.type === 'question' && index !== 0 && items[index - 1].type === 'question') {
                            return (
                                <div className="questionBody withoutAvatar" key={`message-${index}`}>
                                    <p>{message.text}</p>
                                </div>
                            )
                        } else if (message.type === 'answer') {

                            return (
                                <div className="answer" key={`message-${index}`}>
                                    <p>{message.text}</p>
                                </div>
                            )
                        }
                        else if (message.type == 'loading') {
                            return (
                                <div className="questionBody loading" key={`message-${index}`}>
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </div>
                            )
                        }

                        else if (message.type == 'rating') {
                            return (
                                <div className="rating" key={`message-${index}`}>
                                    <div>
                                        <span className={(rate == 1 ?"selectedRate" : "") + " material-symbols-outlined"} onClick={()=>selectRate(1)}>
                                            sentiment_sad
                                        </span>
                                        <span className={(rate == 2 ?"selectedRate" : "") + " material-symbols-outlined"}  onClick={()=>selectRate(2)}>
                                            sentiment_dissatisfied
                                        </span>
                                        <span className={(rate == 3 ?"selectedRate" : "") + " material-symbols-outlined"}  onClick={()=>selectRate(3)}>
                                            sentiment_neutral
                                        </span>
                                        <span className={(rate == 4 ?"selectedRate" : "") + " material-symbols-outlined"}  onClick={()=>selectRate(4)}>
                                            sentiment_satisfied
                                        </span>
                                        <span className={(rate == 5 ?"selectedRate" : "") + " material-symbols-outlined"}  onClick={()=>selectRate(5)}>
                                            sentiment_very_satisfied
                                        </span>
                                    </div>

                                    <Button variant='outlined' size='medium' disabled={rate==0} onClick={saveRate}>Avaliar</Button>
                                </div>
                            )
                        }
                    })
                }</div>
        </>)

}