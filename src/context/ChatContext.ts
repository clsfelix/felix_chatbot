import { createContext } from "react";
import IChatContext from "../interfaces/IChatContext";



export const ChatContext = createContext<IChatContext>({} as IChatContext);