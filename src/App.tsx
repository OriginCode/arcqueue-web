import {Route, Routes, useNavigate, useHref} from "react-router-dom";
import {Button, Form, HeroUIProvider, Input, Listbox, ListboxItem} from "@heroui/react";
import {useEffect, useState} from "react";

import ArcadePage from "./pages/Arcade";
import CabinetPage from "./pages/Cabinet";
import {APIResponse, Arcade} from "./models";
import {API_URL} from "./config";
import {unwrap_response} from "./utils";


function Index() {
    let [arcadeId, setArcadeId] = useState("");
    let [arcadeName, setArcadeName] = useState("");
    let [arcades, setArcades] = useState([{} as Arcade]);

    useEffect(() => {
        let fetchArcades = async () => {
            await fetch(`${API_URL}/arcades/search?name=${arcadeName}`)
                .then(res => res.json() as Promise<APIResponse<Arcade[]>>)
                .then(unwrap_response)
                .then(setArcades)
                .catch(err => console.error(err));
        };
        fetchArcades();
    }, [arcadeName]);

    let navigate = useNavigate();

    return (
        <div className={"flex h-screen items-center justify-center w-screen"}>
            <div className={"index flex flex-col items-center gap-y-2 w-fit"}>
                <h1 className={"text-xl"}>ARCADE QUEUE</h1>
                <Form
                    onSubmit={() => {
                        navigate(`/arcades/${arcadeId}/`);
                    }}>
                    <div className={"flex flex-auto gap-x-2"}>
                        <Input isRequired={true} label={"Enter Arcade ID"} onValueChange={setArcadeId}/>
                        <Button type={"submit"} className={"h-auto"}>Go</Button>
                    </div>
                </Form>
                <Input className={"flex max-w-sm"} label={"Search for Arcade Name"} onValueChange={setArcadeName}/>
                <Listbox
                    emptyContent={"(^-w-^)"}
                    className={"border-small px-2 py-2 rounded-small border-default-200 dark:border-default-100 w-full"}>
                    {arcades.map((arcade: Arcade) => (
                        <ListboxItem key={arcade.id} onPress={() => navigate(`/arcades/${arcade.id}`)}>
                            {arcade.name}
                        </ListboxItem>
                    ))}
                </Listbox>
            </div>
        </div>
    );
}

function App() {
    const navigate = useNavigate();

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref}>
            <Routes>
                <Route index element={<Index/>}/>
                <Route path={"/arcades/:arcadeId/"}>
                    <Route index  element={<ArcadePage/>}/>
                    <Route path={"cabinets/:cabinetId"} element={<CabinetPage/>}/>
                </Route>
            </Routes>
        </HeroUIProvider>
    );
}

export default App;