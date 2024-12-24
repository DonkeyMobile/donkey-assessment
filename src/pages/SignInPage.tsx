import React from 'react';
import FormSignIn from "../components/Forms/FormSignIn";

function SignInPage() {
    return (
        <section className={"flex justify-between items-center h-screen"}>
            <section className={"flex flex-col justify-between items-center gap-20 w-full sm:w-1/2"}>
                <img src={"/logo.svg"} alt={"logo"} className={"w-fit"}/>
                <section className={"w-4/5 md:w-3/5 xl:w-2/5"}>
                    <FormSignIn />
                </section>
                <section className={"flex flex-col w-fit gap-1"}>
                    <p>Gemaakt door:</p>
                    <h3>Jan Barend den Ouden</h3>
                </section>
            </section>
            <section className={"hidden sm:flex items-center justify-center w-1/2 h-full bg-gradient-to-b from-primary-light to-primary"}>
                <img src="/donkey.png" alt="donkey" className={"h-full w-full object-contain"}/>
            </section>
        </section>
    );
}

export default SignInPage;