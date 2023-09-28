import React, { useState, useEffect } from 'react'
import { 
  View,
  StyleSheet, 
  Alert, 
  Pressable,
  Image,
  Modal,
  ScrollView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from './src/components/Header'
import NuevoPresupuesto from './src/components/NuevoPresupuesto'
import ControlPresupuesto from './src/components/ControlPresupuesto'
import FormularioGasto from './src/components/FormularioGasto'
import ListadoGastos from './src/components/ListadoGastos'
import Filtro from './src/components/Filtro'
import { formatearFecha, generarId } from './src/helpers'

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState('')
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // Obtener presupuesto del storage
  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto'); // getItem obtiene un valor, en este caso un string, ese string va a estar en la variable
        setPresupuesto(presupuestoStorage)
        setIsValidPresupuesto(true)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  }, [])

  // Agregar presupuesto al storage
  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto) // await pausa la ejecución de la función hasta que la promesa se resuelva o se rechace.
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    }
  }, [ isValidPresupuesto ])

  // Obtener gastos del storage
  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
        setGastos( gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  }, [])

  // Guardar gastos en el storage
  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos)) // guarda el arreglo como string
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  }, [gastos])

  function handleNuevoPresupuesto(presupuesto) {
    if(Number(presupuesto) > 0 || !presupuesto === '') {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert(
        'Error',
        'El Presupuesto no puede ser 0 o menor',
        [
          { text: 'OK'}
        ]
      )
    }
  };

  const handleGasto = gasto => {
    // Validar si esta vacio
    if([gasto.nombre, gasto.cantidad, gasto.categoria].includes('')) { // .values retorna un arreglo con los valores del objeto, e includes devuelve true si un elemento esta incluido en ese arreglo
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios',
        [{ text: 'OK' }]
      )

      return
    }

    if(gasto.id) { // false, null, undefined, 0, NaN o "" es un valor falso, si es lo contrario seria true
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState ); // ES SIMPLEMENTE UN TERNARIO QUE RETORNA UN VALOR U OTRO. RETORNA gasto si el valor del id de gasto es igual a alguno que este en el state y si no es igual entonces retorna el gasto que estaba en el arreglo original
      // Cuando termina las iteraciones vamos a tener un nuevo arreglo completo actualizado, entonces...
      setGastos(gastosActualizados)
    } else {
      // Nuevo gasto al state
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    
    setModal(!modal)
  }

  const eliminarGasto = (id) => {
    Alert.alert(
      'Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Si, eliminar', onPress: () => {
          const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id ); // itera en cada elemento, si devuelve true lo coloca en el nuevo arreglo y si devuelve false no
          setGastos(gastosActualizados)
          setModal(!modal)
          setGasto({})
        }}
      ]
    )
  }

  const resetearApp = () => {
    Alert.alert(
      'Deseas resetear la app?',
      'Esto eliminara el presupuesto y gastos',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Si, Eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear() // Elimina todas las claves y valores del Async Storage

            setIsValidPresupuesto(false)
            setPresupuesto('')
            setGastos([])
          } catch (error) {
            console.log(error)
          }
        }},
      ]
    )
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {isValidPresupuesto 
            ? (
              <ControlPresupuesto
                presupuesto={presupuesto}
                gastos={gastos}
                resetearApp={resetearApp}
              /> 
            ) : (
              <NuevoPresupuesto 
                handleNuevoPresupuesto={handleNuevoPresupuesto}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
              />
            )
          }
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro 
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos 
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
          <Modal 
            visible={modal}
            animationType='slide'
          >
            <FormularioGasto 
              setModal={setModal}
              modal={modal}
              handleGasto={handleGasto}
              setGasto={setGasto}
              gasto={gasto}
              eliminarGasto={eliminarGasto}
            />
          </Modal>
        )
      }

      {isValidPresupuesto && ( // cuando sea verdadera la condicion se ejecuta x codigo
        <Pressable
          style={styles.pressable}
          onPress={() => setModal(!modal)}
        >
          <Image 
            source={require('./src/img/nuevo-gasto.png')}
            style={styles.imagen}
          />
        </Pressable>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute', // se posiciona en relacion con su elemento padre
    bottom: 20,
    right: 20,
  },
  imagen: {
    width: 60,
    height: 60,
  },
})

export default App