import { useEffect, useState } from 'react';
import CardSala from './Components/CardSala/Index.component.jsx';
import './App.css';

const url = "http://localhost:4000";

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setDados(data))
      .catch(error => console.error('Ocorreu um erro:', error));
  }, []);

  return (
    <>
      {dados.map(dado => {
        const { id, users, admin } = dado;

        return (
          <CardSala id={id} users={users} admin={admin}/>
        );
      })}
    </>
  );
}

export default App;
