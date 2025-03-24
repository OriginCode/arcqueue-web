import {Route, Routes, useNavigate, useHref} from "react-router-dom";
import {Button, Form, HeroUIProvider, Input} from "@heroui/react";
import {useState} from "react";

import ArcadePage from "./pages/Arcade";
import CabinetPage from "./pages/Cabinet";


function Index() {
    let [arcadeId, setArcadeId] = useState("");
    let navigate = useNavigate();
    return (
        <Form onSubmit={() => {
            navigate(`/arcades/${arcadeId}/`);
        }} className={"index flex flex-col h-screen items-center justify-center"}>
            <h1 className={"text-xl"}>ARCADE QUEUE</h1>
            <div className={"flex flex-row gap-x-2"}>
                <Input label={"Enter Arcade ID"} onValueChange={setArcadeId} />
                <Button type={"submit"} className={"h-auto"}>Go</Button>
            </div>
        </Form>
    );
}

function App() {
    const navigate = useNavigate();

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref}>
            <Routes>
                <Route index element={<Index />} />
                <Route path={"arcades/:arcadeId/"} element={<ArcadePage />} />
                <Route path={"cabinets/:cabinetId/"} element={<CabinetPage />} />
            </Routes>
        </HeroUIProvider>
    );
}

export default App;