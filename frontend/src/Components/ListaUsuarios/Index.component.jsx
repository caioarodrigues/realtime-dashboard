import React from "react";
import "./style.css";

export default function ListaUsuarios(props){
    const { usernames } = props;
    
    return (
        <>
            <p>
                {usernames.map(({ username }, index, array) => {
                    const resposta = index < array.length - 1 ? `${username}, ` : username;

                    if(index > 1)
                        return;
                    if(index === 1){
                        return (
                            <span>
                                {`${username}, ...`}
                            </span>
                        );
                    }
                    return (
                        <span className="nome-jogador">
                            {resposta}
                        </span>
                    );
                })}
            </p>
        </>
    )
}