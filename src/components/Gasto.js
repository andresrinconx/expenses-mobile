import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import globalStyles from '../styles'
import {formatearCantidad, formatearFecha} from '../helpers/index'

// aqui pueden haber constantes y variables que se van a usar dentro de la funcion
const diccionarioIconos = {
  ahorro: require('../img/icono_ahorro.png'), // require importa un archivo en si, es el archivo como tal con la ruta
  comida: require('../img/icono_comida.png'),
  casa: require('../img/icono_casa.png'),
  gastos: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
};

const Gasto = ({gasto, setModal, setGasto}) => {
  const {nombre, cantidad, categoria, fecha} = gasto;

  function handleAcciones() {
      setModal(true)
      setGasto(gasto)
  };

  return (
    <Pressable
      onLongPress={handleAcciones}
    >
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          <View style={styles.contenedorImagen}>

            <Image
              source={diccionarioIconos[categoria]}
              style={styles.imagen}
            />

            <View style={styles.contenedorTexto}>
              <Text style={styles.categoria}>{categoria}</Text>
              <Text style={styles.nombre}>{nombre}</Text>
              <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
            </View>

          </View>
          
          <Text style={styles.cantidad}>{formatearCantidad(cantidad)}</Text>

        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 50,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contenedorImagen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  contenedorTexto: {
    flex: 1,
  },
  categoria: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 22,
    color: '#64748b',
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 20,
    fontWeight: '700',
  },
  fecha: {
    fontWeight: '700',
    color: '#db2777',
  },
})

export default Gasto