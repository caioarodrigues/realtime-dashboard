import React from "react";
import Botao from "../Botao/Index.component";
import './style.css'

export default function Header(){
    return (
        <header style={{ display: "flex", justifyContent: "space-between",
            backgroundColor: "orangered"}}>
            <section className="titulo" style={{
                marginInlineStart: "2rem"}}>
                <h2>
                    Gerenciador de partidas online
                </h2>
                <p style={{ backgroundColor: "aliceblue", 
                    width: "fit-content", padding: "0.25rem", 
                    borderRadius: "0.25rem"}}>
                    Entre em uma partida ou crie uma nova!
                </p>
            </section>

            <section className="botao-nova-partida" style={{
                marginInlineEnd: "2rem", display: "flex", 
                alignItems: "center"}}>
                <Botao>
                    Nova partida
                </Botao>
            </section>
        </header>
    )
}