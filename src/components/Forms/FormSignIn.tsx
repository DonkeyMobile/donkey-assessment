import React, {useState} from 'react';
import TextField from "../shared/TextField/TextField";
import Title from "../shared/Title/Title";
import {Size} from "../../commonEnums";
import {useNavigate} from "react-router-dom";

function FormSignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const correctEmail: string = "donkey@assessment.nl";
    const correctPassword: string = "donkey-assessment";

    const navigate = useNavigate();

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Vul alle velden in.');
            return;
        }

        setError('');

        if (email === correctEmail && password === correctPassword) {
            localStorage.setItem("authToken", correctEmail)
            console.log('Form submitted:', { email, password });
            navigate("/")
        } else {
            setError('Helaas dat is onjuist. Probeer opnieuw😞');
        }


    };

    return (
        <form onSubmit={handleForm} className={"flex flex-col gap-5"}>
            <section className="flex flex-col gap-1 w-fit m-auto">
                <Title text={"Welkom terug😎"} className={"w-fit m-auto"}/>
                <p>Welkom terug, vul je inloggegevens in</p>
            </section>
            <TextField
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                icon={{name: "MdOutlineEmail", size: Size.MD }}
                placeholder="E-mail"
            />
            <TextField
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                icon={{name: "MdLockOutline", size: Size.MD }}
                placeholder="Wachtwoord"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="p-3 w-full bg-primary hover:scale-105 rounded text-surface">
                Inloggen
            </button>
        </form>
    );
}

export default FormSignIn;
