import { createContext } from "react";
import { Session } from "../models/session";

export const SessionContext = createContext<Session | undefined>(undefined)
