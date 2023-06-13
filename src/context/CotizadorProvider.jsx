import { createContext, useState } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan:''

    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una base
            let resultado = 2000
        //Obtener diferencia de años
           const diferencia = obtenerDiferenciaYear(datos.year)
        //Por cada año hay que restarle el 3%
            resultado -= ((diferencia *3)*resultado) / 100

          
        //Europeo 30% más
        //Americano 15% más
        //Asiático 5% más
        resultado *= calcularMarca(datos.marca)
        console.log(resultado)

        //Calcular el plan
        resultado *= calcularPlan(datos.plan)
        resultado = resultado.toFixed(2)
        //Formatear dinero
        resultado = formatearDinero(resultado)

        //Añadimos un spinner de cargando
        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        },3000 );

        
    }


    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                setError,
                error,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext