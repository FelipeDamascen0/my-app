import Image from "next/image";
import styles from "./menu.module.css";

export function Menu(props){
    return(
        <menu className={styles.menu}>
          <Image src='/logo.png' width={100} height={40} alt="logo" />
          <a href="/usuariosCadastrados">Usuarios</a>
          <a href="/deletarUsuario">Deletar Usuario</a>
          <a href="/editarUsuario">Editar Usuario</a>
          <a href="/registrarUsuario">Criar Usuario</a>
        </menu>
    );
};