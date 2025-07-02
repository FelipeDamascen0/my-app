"use client"
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, setAuthToken } from "../../services/api";
import { Button } from "../../components/button"


export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function login(e) {
    e.preventDefault();
    const res = await api.post('/login', { username: email, password: password});

    if(res.status == 200) router.push("/register");
  } 


  return (
    <div>
      <div className={styles.page}>
        <form className={styles.formLogin}>
          <h1>Teste CEBRASPE</h1>
          <h1>{count}</h1>
          <input type="email" placeholder="email" className={styles.inputLogin} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="digite sua senha!" className={styles.inputLogin} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={login}>add</button>
          <Button titulo="componente" />
        </form>
      </div>
    </div>
  );
}
