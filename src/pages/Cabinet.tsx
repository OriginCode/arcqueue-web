import {APIResponse, Cabinet, Game, Player} from "../models";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URL} from "../config";
import {
    Button, Form, Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import {unwrap_response} from "../utils";

function Queue(props: { cabinetId: string | undefined }) {
    let {cabinetId} = props;
    let [players, setPlayers] = useState([{} as Player]);
    let [playerName, setPlayerName] = useState("");

    useEffect(() => {
        let fetchPlayers = async () => {
            await fetch(`${API_URL}/cabinets/${cabinetId}/players`)
                .then(res => res.json() as Promise<APIResponse<Player[]>>)
                .then(unwrap_response)
                .then(setPlayers)
                .catch(err => console.error(err));
        };
        fetchPlayers();
    }, [cabinetId]);

    const handleAddPlayer = async () => {
        await fetch(`${API_URL}/cabinets/${cabinetId}/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: playerName
            })
        })
            .catch(err => console.error(err));
    }

    const handleLeavePlayer = async () => {
        await fetch(`${API_URL}/cabinets/${cabinetId}/leave`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: playerName
            })
        })
            .catch(err => console.error(err));
        // refresh the player list
        window.location.reload();
    }

    const handlePostponePlayer = async () => {
        await fetch(`${API_URL}/cabinets/${cabinetId}/postpone`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: playerName
            })
        })
            .catch(err => console.error(err));
        // refresh the player list
        window.location.reload();
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableColumn>Position</TableColumn>
                    <TableColumn>Player</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No players in queue."}>
                    {players.map((player: Player, idx: number) => (
                        <TableRow key={player.name}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{player.name}</TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
            <Form
                onSubmit={handleAddPlayer}>
                <div className={"flex gap-x-2"}>
                    <Input isRequired={true} label={"Player Name"} onValueChange={setPlayerName}/>
                    <Button type={"submit"} className={"h-auto"}>Join</Button>
                    <Button type={"button"} className={"h-auto"} onPress={handleLeavePlayer}>Leave</Button>
                    <Button type={"button"} className={"h-auto"} onPress={handlePostponePlayer}>Postpone</Button>
                </div>
            </Form>
        </>
    );
}

function CabinetPage() {
    let {arcadeId, cabinetId} = useParams();

    let [cabinet, setCabinet] = useState({} as Cabinet);
    let [game, setGame] = useState({} as Game);

    useEffect(() => {
        let fetchCabinet = async () => {
            await fetch(`${API_URL}/cabinets/${cabinetId}`)
                .then(res => res.json() as Promise<APIResponse<Cabinet>>)
                .then(unwrap_response)
                .then(setCabinet)
                .catch(err => console.error(err));
        };
        fetchCabinet();
    }, [cabinetId]);

    useEffect(() => {
        let fetchGame = async () => {
            await fetch(`${API_URL}/cabinets/${cabinetId}/info`)
                .then(res => res.json() as Promise<APIResponse<Game>>)
                .then(unwrap_response)
                .then(setGame)
                .catch(err => console.error(err));
        };
        fetchGame();
    }, [cabinetId]);

    let navigate = useNavigate();

    return (
        <div className={"flex h-screen items-center justify-center flex-wrap p-4 max-w-screen-md"}>
            <div className={"flex flex-col justify-center items-start gap-y-2 flex-wrap max-w-screen-md"}>
                <div className={"flex flex-row items-center justify-center gap-x-2 flex-wrap max-w-screen-md"}>
                    <Button onPress={() => navigate(`/arcades/${arcadeId}`)}>Back</Button>
                    <div className={"flex flex-col"}>
                        <h1 className={"index text-xl"}>{cabinet.name}</h1>
                        <p>{game.name}</p>
                        <p>{game.description}</p>
                    </div>
                </div>
                <Queue cabinetId={cabinetId}/>
            </div>
        </div>
    )
}

export default CabinetPage;