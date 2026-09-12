import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon, type usuario } from '../context/PokemonContext';

export const RegistroUsuario: React.FC = () => {
    const {entrenadores, entrenadorActivo, seleccionarEntrenador, registrarEntrenador} = usePokemon();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDoc, setTipoDoc] = useState('CC');
    const [dni, setDni] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [datosPersonales, setDatosPersonales] = useState('');

    const eventoSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!datosPersonales){
            alert('Aceptar politica de privacidad');
            return;
        }

        const nuevoUsuario: usuario = {
            id: Date.now(),
            nombreCompleto: `${nombre} ${apellido}`,
            documento: `${tipoDoc} ${dni}`,
            fechaNacimiento,
            correo,
            datosPersonales: datosPersonales === 'true',
            fechaRegistro: new Date().toISOString(),
        };
        
        registrarEntrenador(nuevo);
        navigate('/pokemon');
    };
        return;
        
    };


