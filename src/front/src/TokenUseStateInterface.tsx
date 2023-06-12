import { Dispatch, SetStateAction } from "react";

export interface TokenUseStateInterface {
    setLogged:Dispatch<SetStateAction<boolean>>;
}