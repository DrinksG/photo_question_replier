
export interface ResponseInterface {
    id: string;
    items: ResponseItemInterface[];
}

export interface ResponseItemInterface {
    id: string;
    text: string;
}