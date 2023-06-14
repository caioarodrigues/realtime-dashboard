import "./style.css";

export default function Botao(props){
    const { nome } = props;

    return (
        <button className="botao">
            {nome}
        </button>
    )
}