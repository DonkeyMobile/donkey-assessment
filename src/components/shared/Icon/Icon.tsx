import * as MaterialDesign from "react-icons/md";
import * as FontAwesome from "react-icons/fa";
import {Size} from "../../../commonEnums";

export interface IconProps {
    name: string;
    size?: Size,
    className?: string
}

function Icon({name, size = Size.MD, className = ""}: IconProps) {
    const DynamicIcon = MaterialDesign[name as keyof typeof MaterialDesign] || FontAwesome[name as keyof typeof FontAwesome];

    function fontSize(): number {
        let sizeInPx: number;

        // based on tailwind font size
        switch (size) {
            case Size.SM:
                sizeInPx = 16;
                break;
            case Size.MD:
                sizeInPx = 24;
                break;
            case Size.LG:
                sizeInPx = 32;
                break;
            default:
                sizeInPx = 24;
        }

        return sizeInPx;
    }


    return <DynamicIcon size={fontSize()}/>;
}

export default Icon;