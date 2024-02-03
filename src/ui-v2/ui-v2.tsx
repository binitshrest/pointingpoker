import { useUI } from "@/hooks/ui";

export default function UIV2() {
    const [, setUIVersion] = useUI();

    return (
        <>
            <h1>Hello world!</h1>
            <button onClick={() => setUIVersion("v1")}>toggle UI</button>
        </>
    );
}