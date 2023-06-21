import { useEffect, useState } from 'react';
import CardSala from "../CardSala/Index.component"
import './style.css';

const url = "http://localhost:4000";

export default function ListaSala() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setDados(data))
      .catch(error => console.error('Ocorreu um erro:', error));
  }, []);

  return (
    <section className='lista-salas' style={{
      display: 'flex', flexFlow: "wrap row", justifyContent: 'center'
      }}>
      {dados.map(dado => {
        const { id, users, admin } = dado;

        return (
          <CardSala id={id} users={users} admin={admin}/>
        );
      })}
    </section>
  );
}
