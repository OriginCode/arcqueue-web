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

export type {Arcade, Game, Cabinet, Player};