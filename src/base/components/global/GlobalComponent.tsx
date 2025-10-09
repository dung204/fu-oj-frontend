import { observer } from "mobx-react-lite";
import LRComponent from "@/modules/LR/LRComponent";

const GlobalComponent = observer(() => {
    return <>
        <LRComponent />
    </>
})

export default GlobalComponent;