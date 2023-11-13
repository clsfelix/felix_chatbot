import Message from "../message/Message"
import "./chatBody.scss";
import { createRef, useEffect } from "react";
import initChatService from "../../services/initChatService";


export default function ChatBody() {

    useEffect(() => {
        initChatService();
    }, [])

    const grow = createRef<HTMLDivElement>();
    const chatBody = createRef<HTMLDivElement>();


    useEffect(() => {
        {

            function onSizeGrow() {
                grow.current?.scrollTo({ top: (grow.current?.offsetHeight??0 + 10000), behavior: 'smooth' });
            }
            if (grow.current) {
                new ResizeObserver(onSizeGrow).observe(grow.current);
                window.addEventListener('chat', () => {
                    onSizeGrow();
                })
            }

        }
    }, [chatBody])


    return (
        <>
            <div className="chatBody" ref={chatBody}>
                <div className="growing" ref={grow}>
                    <Message />
                </div>
            </div>
        </>
    )
}