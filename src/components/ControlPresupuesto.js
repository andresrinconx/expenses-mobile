import {
  View, 
  Text, 
  StyleSheet,
  Pressable
} from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyles from '../styles'
import { formatearCantidad } from '../helpers'
import CircularProgress from 'react-native-circular-progress-indicator'

const ControlPresupuesto = ({ 
  presupuesto, 
  gastos,
  resetearApp 
}) => {
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    // retorna un solo valor como resultado final después de aplicar una función acumuladora a cada elemento
    const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0 );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = () => {
      const porcentajeProgress = ((presupuesto - totalDisponible) / presupuesto) * 100
      
      setTimeout(() => {
        setPorcentaje(porcentajeProgress)
      }, 1000);
    }

    nuevoPorcentaje()
    setGastado(totalGastado)
    setDisponible(totalDisponible)
  }, [gastos]) // cada vez que gastos cambia se ejecuta el useEffect

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1000} // lo que tarda en la animacion
          radius={150} // radio del circulo
          valueSuffix='%'
          title='Gastado'
          inActiveStrokeColor='#f5f5f5'
          inActiveStrokeWidth={20}
          activeStrokeColor='#3b82f6'
          activeStrokeWidth={20}
          titleStyle={{ fontWeight: 'bold', fontSize: 20, }}
          titleColor='#64748b'
        />
      </View>

      <View style={styles.contenedorTexto}>
        <Pressable
          style={styles.boton}
          onPressOut={() => resetearApp()}
        >
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>

        <Text style={styles.valor}>
            <Text style={styles.label}>Presupuesto: </Text>
            {formatearCantidad(presupuesto)}
        </Text>

        <Text style={styles.valor}>
            <Text style={styles.label}>Disponible: </Text>
            {formatearCantidad(disponible)}
        </Text>

        <Text style={styles.valor}>
            <Text style={styles.label}>Gastado: </Text>
            {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#db2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  imagen: {
    width: 250,
    height: 250,
  },
  contenedorTexto: {
    marginTop: 10,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3b82f6',
  },
})

export default ControlPresupuesto