import * as meckano from "./meckano";

export async function getIsLoggedIn(): Promise<boolean> {
    try {
        const { ok } = await meckano.getStatus();
        return ok;
    } catch (err) {
        return false;
    }
}