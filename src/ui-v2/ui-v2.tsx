import { toggleUI } from "@/utils/ui";
import "./styles/globals.css"

export function UIV2() {
    return (
        <>
            <h1>Hello world!</h1>
            <button onClick={toggleUI}>toggle UI</button>
        </>
    );
}