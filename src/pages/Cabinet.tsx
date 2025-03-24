import {Cabinet, Game, Player} from "../models";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URL} from "../config";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";

function CabinetPage() {
    let {cabinetId} = useParams();

    let [cabinet, setCabinet] = useState({} as Cabinet);
    let [game, setGame] = useState({} as Game);
    let [players, setPlayers] = useState([{} as Player]);

    useEffect(() => {
        let fetchCabinet = async () => {
            await fetch(`${API_URL}/cabinets/${cabinetId}`)
                .then(res => res.json())
                .then(setCabinet)
                .catch(err => console.log(err));
        };
        fetchCabinet();
    }, [cabinetId]);

    useEffect(() => {
        let fetchGame = async () => {
            await fetch(`${API_URL}/cabinets/${cabinetId}/info`)
                .then(res => res.json())
                .then(setGame)
                .catch(err => console.log(err));
        };
        fetchGame();
    }, [cabinetId]);

    useEffect(() => {
        let fetchPlayers = async () => {
            await fetch(`${API_URL}/cabinets/${cabinetId}/players`)
                .then(res => res.json())
                .then(setPlayers)
                .catch(err => console.log(err));
        };
        fetchPlayers();
    }, [cabinetId]);

    let navigate = useNavigate();

    return (
        <div className={"flex h-screen items-center justify-center"}>
            <div className={"flex flex-col justify-center items-start gap-y-2"}>
                <div className={"flex flex-row items-center justify-center gap-x-2"}>
                    <Button onPress={() => navigate(-1)}>Back</Button>
                    <div className={"flex flex-col"}>
                        <h1 className={"index text-xl"}>{cabinet.name}</h1>
                        <p>{game.name}</p>
                        <p>{game.description}</p>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableColumn>Position</TableColumn>
                        <TableColumn>Player</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No players in queue."}>
                        {players.map((player: any, idx: number) => (
                            <TableRow>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{player.name}</TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CabinetPage;