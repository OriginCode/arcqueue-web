import {Response} from "./models";

function unwrap_response(res: Response) {
    if (res.status === "error") {
        throw new Error(res.error);
    } else {
        return res.content;
    }
}

export {unwrap_response};