import React from 'react';
import Header from "./header/Header";
import Footer from "./footer/Footer";

function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className={"bg-surface container mx-auto px-5 md:px-10 flex flex-col gap-10"}>
            <Header />
                {children}
            <Footer />
        </main>
    );
}

export default Layout;