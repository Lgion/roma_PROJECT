import dynamic from "next/dynamic";
import ExpandCollapse from "./components/ExpandCollapse";
import { Button } from "./components/shadcn/ui/button";
import MultistepForm from "./components/shadcn/MultistepForm";
import ClientHome from "./components/ClientHome";

export default function Home() {
    return (
        <main>
            <ExpandCollapse />
            <ClientHome />
        </main>
    );
}
