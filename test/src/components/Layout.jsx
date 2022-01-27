import Link from 'next/link'
import styles from '../styles/Layout.module.css'

export default function Layout(props){
    return (
        <div>
            <div className={styles.conteudo}>
                {props.children}
            </div>
            
            <div className={styles.rodape}>
                <button><Link href="/">Voltar</Link></button>
            </div>
        </div>
    )
}