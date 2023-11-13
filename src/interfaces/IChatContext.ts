import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import IChatState from "./IChatState";

export default interface IChatContext {
    dispatch:ThunkDispatch<{
        chat: IChatState;
    }, undefined, AnyAction> & Dispatch<AnyAction>
    chatState:IChatState
}