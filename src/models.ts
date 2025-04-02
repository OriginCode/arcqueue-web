type Status = "success" | "error";

interface Response {
    status: Status;
    error?: string;
    content?: any;
}

interface Arcade {
    id: string,
    name: string,
    description?: string,
    create_date: Date,
}

interface Game {
    name: string,
    description: string,
}

interface Cabinet {
    id: string,
    game_name: string,
    name: string,
    assoc_arcade: string,
}

interface Player {
    position: number,
    name: string,
    assoc_cabinet: string,
}

export type {Response, Arcade, Game, Cabinet, Player};