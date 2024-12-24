import React from 'react';
import Icon, {IconProps} from "../Icon/Icon";

interface TextFieldProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: IconProps
    placeholder?: string;
}

function TextField({ type, value, onChange, icon, placeholder }: TextFieldProps) {
    return (
        <div className="flex flex-row gap-2 border rounded px-3 py-2">
            {icon && <Icon name={icon.name} size={icon.size}/>}
            <hr className={"h-auto w-1 border-secondary border-l"}/>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-full w-full outline-none"
            />
        </div>
    );
}

export default TextField;