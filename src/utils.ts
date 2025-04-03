import {APIResponse} from "./models";

function unwrap_response<T>(res: APIResponse<T>): T | never {
    if (res.status === "error") {
        throw new Error(res.error);
    } else {
        return res.content ?? ({} as T);
    }
}

export {unwrap_response};