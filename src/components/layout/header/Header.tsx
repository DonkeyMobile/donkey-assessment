import Icon from "../../shared/Icon/Icon";
import {Size} from "../../../commonEnums";

function Header() {
    function handleSignOut() {
        localStorage.removeItem("authToken");
        window.location.reload()
    }

    return (
        <nav className={"sticky top-0 flex flex-col sm:flex-row justify-between items-center gap-5 bg-surface py-5 z-50"}>
            <img src={"/logo.svg"} alt="Donkey Mobile Assesment logo"/>
            <section className={"flex flex-col sm:flex-row gap-5 items-center"}>
                <span className={"hidden sm:flex items-center justify-center bg-secondary p-2 rounded-xl"}>
                    <Icon name={"FaUser"} size={Size.LG} />
                </span>
                <section className={"flex flex-col justify-between"}>
                    <p>{localStorage.getItem("authToken")}</p>
                    <button className={"text-primary hover:underline"} onClick={handleSignOut}>Uitloggen</button>
                </section>
            </section>
        </nav>
    );
}

export default Header;