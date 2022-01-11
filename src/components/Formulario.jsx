import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import Error from './Error';
import ListadoPacientes from './ListadoPacientes';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if( Object.keys(paciente).length > 0 ){

            const { nombre, propietario, email, fecha, sintomas, error } = paciente;
            
            setNombre(nombre)
            setPropietario(propietario)
            setEmail(email)
            setFecha(fecha)
            setSintomas(sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validación de formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log('Hay al menos un campo vacío')
            setError(true)
            return;
        } 

        setError(false)
        
        //construccion del objeto
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        //Editando el registro de pacientes
        if(paciente.id){
            console.log(objetoPaciente)
            console.log(paciente)

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
            
            setPacientes(pacientesActualizados)
            setPaciente({})

        } else{
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

        //Reiniciar formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return ( 
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h1 className="font-black text-3xl text-center">Seguimiento pacientes</h1>
            <p className="text-lg mt-5 text-center mb-10">
                Añade pacientes y {' '}
                <span className="text-indigo-600 font-bold text-lg">administralos</span>
            </p>

            <form
                onSubmit = {handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-5">
                
                {error && <Error mensaje={'Todos los campos son obligatorios'} /> }

                <div className="mb-5">
                    <label
                        htmlFor="mascota"
                        className="block text-gray-700 uppercase font-bold">Nombre mascota
                    </label>
                    <input id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre de la mascota"
                    value = {nombre}
                    onChange = { (e) => setNombre(e.target.value) }
                    />
                    
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold">Nombre propietario
                    </label>
                    <input id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre del propietario"
                    value = {propietario}
                    onChange = { (e) => setPropietario(e.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold">Email
                    </label>
                    <input id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" placeholder="Email contacto"
                    value = {email}
                    onChange = { (e) => setEmail(e.target.value) }
                    />
                </div>
                
                <div className="mb-5">
                    <label
                        htmlFor="alta"
                        className="block text-gray-700 uppercase font-bold">Alta
                    </label>
                    <input id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" placeholder="Fecha de alta"
                    value = {fecha}
                    onChange = { (e) => setFecha(e.target.value) }
                    />                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold">Síntomas
                    </label>
                    <textarea 
                        id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los síntomas"
                        value = {sintomas}
                        onChange = { (e) => setSintomas(e.target.value) }
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white rounded-md 
                    uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={paciente.id ? 'Guardar cambios' : 'Agregar paciente'}
                />

            </form>

        </div>
     );
}
 
export default Formulario;