import Link from "next/link"
import styles from '../styles/Navegador.module.css'

export default function Navegador(props) {
    return (
        <div className={styles.navegador}>
            <Link href={props.destino}>
                {props.texto}
            </Link>
        </div>
    )
}