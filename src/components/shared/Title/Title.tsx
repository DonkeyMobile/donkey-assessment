import React from 'react';
import Icon from "../Icon/Icon";
import {Size} from "../../../commonEnums";

function Title({text, level = 1, icon, className = ""}: { text: string, level?: number, icon?: { name: string, size?: Size }, className?: string }) {
    const HeaderTag = `h${level}` as React.ElementType;
    return (
        <section className={"flex gap-5"}>
            {
                icon && <Icon name={icon.name} size={icon.size} className={"title__icon"}/>
            }
            <HeaderTag className={className}>
                {text}
            </HeaderTag>
        </section>
    );
}

export default Title;