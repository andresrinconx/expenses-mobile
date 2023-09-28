import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
  gastos, 
  setModal, 
  filtro, 
  gastosFiltrados,
  setGasto
}) => {

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {filtro ? gastosFiltrados.map( gasto => (
        <Gasto
          key={gasto.id} // identificar de manera única cada elemento en una lista
          gasto={gasto}
          setModal={setModal}
          setGasto={setGasto}
        />
      )) : gastos.map(gasto => (
        <Gasto 
          key={gasto.id} // identificar de manera única cada elemento en una lista
          gasto={gasto}
          setModal={setModal}
          setGasto={setGasto}
        />
      ))}

      { (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && ( // Si filtro tiene un valor asignado, la doble negación lo convierte en true. Si filtro es null, undefined o un valor falso, la doble negación lo convierte en false.
        <Text style={styles.noGastos}>No Hay Gastos</Text>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 70,
  },
  titulo: {
    color: '#64748b',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  noGastos: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
})

export default ListadoGastos