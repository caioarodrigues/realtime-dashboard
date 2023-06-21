import react from "react";
import Botao from "../Botao/Index.component";
import ListaUsuarios from "../ListaUsuarios/Index.component";
import "./style.css";

const url = "http://localhost:4000";

export default function CardSala(props){
    const { id, users, admin } = props;

    return(
        <>
            <article className="card">
                <header>
                    <h4>Sala #{id}</h4>
                    <div className="nome-admins">
                        <h5>Admins logados</h5>
                        {<ListaUsuarios usernames={admin}/>}
                    </div>
                    <div className="nome-usuarios">
                        <h5>Usuários logados</h5>
                        {<ListaUsuarios usernames={users}/>}
                    </div>
                </header>

                <main>
                    <p>Clique para entrar</p>
                    <div className="botao-div">
                        <Botao>
                            entrar
                        </Botao>
                    </div>
                </main>
            </article>
        </>
    )
}