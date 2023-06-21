import Header from "../Header/Index.component.jsx";
import ListaSala from "../ListaSala/Index.component.jsx";
import BarraHorizontal from "../BarraHorizontal/Index.component.jsx";

export default function PaginaInicial(){
  return(
    <>
      <Header/>
      <BarraHorizontal/>
      <ListaSala/>
    </>
  )
}