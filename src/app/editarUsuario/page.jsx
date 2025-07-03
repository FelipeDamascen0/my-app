"use client"
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, setAuthToken } from "../services/api";
import { Button } from "../../../components/button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { Menu } from "../../../components/menu";


export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: 0,
    identidade: '',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {     
        const res = await api.get('/user');
        setProducts(res.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  async function registrarUsuario(e) {
    e.preventDefault();
    const res = await api.post('/register-product', 
      { 
        nome: formData.name, 
        description: formData.description,
        cpf: formData.cpf,
        identidade: formData.identidade,
      });

    if(res.status == 201){
      toast.success("Produto criado com sucesso!", {
        position: "top-right"
      });
    } 
  } 


  return (
    <div>
      <Menu />
      <ToastContainer />
      <div className={styles.page}>
        <form onSubmit={registrarUsuario} className={styles.formLogin}>
          <h1>Cadastro de Usuario</h1>
          <input 
            type="text" 
            placeholder="Nome do usuario" 
            className={styles.inputLogin} 
            name="nome" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email do usuario" 
            className={styles.inputLogin} 
            name="email" 
            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
          />
          <input 
            type="text" 
            max={11}
            placeholder="Digite o preço!" 
            className={styles.inputLogin} 
            name="cpf" 
            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
          />

          <input 
            type="text" 
            placeholder="digite a imagem do produto!" 
            className={styles.inputLogin} 
            name="identidade" 
            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
          />
          <Button titulo="criar produto" type='submit' class={styles.buttonSub} />
        </form>
      </div>
    </div>
  );
}
