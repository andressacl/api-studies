import Navegador from "../components/Navegador.jsx"

export default function Inicio(){
    return (
        <div>
            <h1> Início </h1>
            <h2> Funcionando as funcionalidades </h2>

            
            <button><Navegador destino="integracao" texto="Obter dados aleatórios"/>
            </button>

            <button><Navegador destino="jsonIterator" texto="API do OBsite"/>
            </button>
        </div>
    )}