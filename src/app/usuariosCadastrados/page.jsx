"use client"
import { useEffect, useState } from "react";
import { Menu } from "../../../components/menu";
import { api } from "../services/api";
import styles from "./page.module.css";
import { ToastContainer, toast } from 'react-toastify';
import Modal from "react-modal"
import { Button } from "../../../components/button";

Modal.setAppElement('#yourAppElement');

export default function Products() {
    const [users, setUsers] = useState([]);
    const [cpf, setCpf] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await api.get('/users');
                setUsers(res.data);
            }catch{
                toast.error("Ocorreu um erro ao trazer dados dos produtos!", {
                    position: "top-left"
                })
            }
        };
        fetch();
    }, []);
    function openModal() {
            pegaUsuarioPorCpf();
            setIsOpen(true);
        }

    function closeModal() {
        setIsOpen(false);
    }
     async function pegaUsuarioPorCpf(e) {
        e.preventDefault();
        const res = await api.post('/usuario-por-cpf', {cpf: cpf})
        console.log(res)
        if(res.status == 200){
        toast.success("Usuario encontrado com sucesso!", {
            position: "top-center"
        });
        if(res.status == 204){
        toast.warning("Ocorreu um erro ao editar!", {
            position: "top-center"
        })
        }
    } 

     

    const [formData, setFormData] = useState({
        identidade: '',
        nome: '',
        email: '',
    });
   
  } 
    return(
        <div id="yourAppElement">
            <Menu />

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={{color: "#000"}}
                contentLabel="Example Modal"
            >
                <div style={{color: "#000"}}>
                    <button onClick={closeModal}>close</button>
                    <div>Editar dados</div>
                    <form className={styles.formLogin}>
                        <input 
                            type="text" 
                            placeholder="Nome do usuario" 
                            className={styles.inputLogin} 
                            value={nome}
                            name="nome" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                        />
                        <input 
                            type="email" 
                            placeholder="Email do usuario" 
                            className={styles.inputLogin} 
                            name="email" 
                            value={email}
                            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                        />
                        <input 
                            type="text" 
                            placeholder="Digite a identidade" 
                            className={styles.inputLogin} 
                            value={identidade}
                            name="identidade" 
                            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
                        />
                         <Button titulo="editar usuario" type='submit' class={styles.buttonSub} />
                    </form>
                </div>

      </Modal>

            <h1 className={styles.titulo}>Usuarios</h1>
            <div style={{margin: '20px'}}>
                <table className={styles.tableProducts}>
                    <thead>
                        <tr>    
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th>Identidade</th>
                            <th>Editar</th>
                            <th>Deletar</th>
                         </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return(
                                    <tr key={user.id}>
                                        <td style={{color: '#fff'}}>{user.nome}</td>
                                        <td style={{color: '#fff'}}>{user.email}</td>
                                        <td style={{color: '#fff'}}>{user.cpf}</td>
                                        <td style={{color: '#fff'}}>{user.identidade}</td>
                                        <td>
                                            <button onClick={openModal}>Editar</button>
                                        </td>
                                        <td>deletar</td>
                                    </tr>
                                );
                            })
                        }
                        
                    </tbody>

                </table>
            </div>
        </div>
    );
};