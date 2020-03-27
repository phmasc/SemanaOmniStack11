import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'

export default function NewIncident(){
    const [Titulo, setTitulo] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
           Titulo,
           description,
           value, 
        };

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profiles');
        } catch(err){
            alert('Caso não inserido, tente novamente!');
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamento para encontrar um herói para resolver isso.
                    </p>
                    <Link className="back-link" to="/profiles">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home    
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do Caso" 
                        value={Titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais (R$)" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}