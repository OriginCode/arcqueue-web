import {useNavigate, useParams} from "react-router-dom";
import {API_URL} from "../config";
import {useEffect, useState} from "react";
import {Button, Listbox, ListboxItem} from "@heroui/react";
import {APIResponse, Arcade, Cabinet} from "../models";
import {unwrap_response} from "../utils";


function ArcadePage() {
    let {arcadeId} = useParams();
    let [arcade, setArcade] = useState({} as Arcade);
    let [cabinets, setCabinets] = useState([{} as Cabinet]);

    useEffect(() => {
        let fetchArcade = async () => {
            await fetch(`${API_URL}/arcades/${arcadeId}`)
                .then(res => res.json() as Promise<APIResponse<Arcade>>)
                .then(unwrap_response)
                .then(setArcade)
                .catch(err => console.error(err));
        };
        fetchArcade();
    }, [arcadeId]);

    useEffect(() => {
        let fetchCabinets = async () => {
            await fetch(`${API_URL}/arcades/${arcadeId}/cabinets`)
                .then(res => res.json() as Promise<APIResponse<Cabinet[]>>)
                .then(unwrap_response)
                .then(setCabinets)
                .catch(err => console.error(err));
        };
        fetchCabinets();
    }, [arcadeId]);

    let navigate = useNavigate();

    return (
        <div className={"flex h-screen items-center justify-center flex-wrap max-w-screen-md p-4"}>
            <div className={"flex flex-row justify-center items-start gap-x-2 flex-wrap max-w-screen-md"}>
                <div className={"flex flex-col flex-wrap"}>
                    <Button onPress={() => navigate('/')}>Back</Button>
                    <h1 className={"index text-xl"}>{arcade.name}</h1>
                    <p>{arcade.description}</p>
                </div>
                <Listbox
                    className={"w-3/4 border-small px-2 py-2 rounded-small border-default-200 dark:border-default-100 max-w-screen-md"}>
                    {cabinets.map((cabinet: Cabinet) => (
                        <ListboxItem key={cabinet.id} onPress={() => navigate(`cabinets/${cabinet.id}`)}>
                            {cabinet.name}
                        </ListboxItem>
                    ))}
                </Listbox>
            </div>
        </div>
    )
}

export default ArcadePage;