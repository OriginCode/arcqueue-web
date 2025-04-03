type Status = "success" | "error";

type APIResponse<T> = {
    status: Status,
    error?: string,
    content?: T,
}

type Arcade = {
    id: string,
    name: string,
    description?: string,
    create_date: Date,
}

type Game = {
    name: string,
    description: string,
}

type Cabinet = {
    id: string,
    game_name: string,
    name: string,
    assoc_arcade: string,
}

type Player = {
    position: number,
    name: string,
    assoc_cabinet: string,
}

export type {APIResponse, Arcade, Game, Cabinet, Player};