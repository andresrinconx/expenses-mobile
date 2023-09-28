import {
  View, 
  ScrollView,
  Text, 
  SafeAreaView, 
  Pressable, 
  TextInput, 
  StyleSheet 
} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'

const FormularioGasto = ({
  setModal, 
  modal, 
  handleGasto, 
  setGasto,
  gasto,
  eliminarGasto
}) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')

  useEffect(() => {
    if(gasto.nombre) { // verifica si la propiedad nombre existe en el objeto gasto de forma
      setNombre(gasto.nombre)
      setCantidad(gasto.cantidad)
      setCategoria(gasto.categoria)
      setId(gasto.id)
      setFecha(gasto.fecha)
    }
  }, [gasto])

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable 
          style={[styles.btn, styles.btnCancelar]}
          onPressOut={() => {
            setModal(!modal)
            setGasto({})
          }}
        >
            <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>

        {gasto.id && (
          <Pressable 
            style={[styles.btn, styles.btnEliminar]}
            onPressOut={() => eliminarGasto(id)}
          >
              <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        )}
        
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {gasto.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>

        <View style={styles.campo}>
            <Text style={styles.label}>Nombre Gasto</Text>
            <TextInput 
                placeholder='Nombre del Gasto. ej. Comida'
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />
        </View>

        <View style={styles.campo}>
            <Text style={styles.label}>Cantidad Gasto</Text>
            <TextInput 
                placeholder='Cantidad del Gasto. ej. 100'
                keyboardType='numeric'
                style={styles.input}
                value={cantidad}
                onChangeText={setCantidad}
            />
        </View>

        <View style={styles.campo}>
            <Text style={styles.label}>Categoria Gasto</Text>

            <Picker
              style={styles.input}
              selectedValue={categoria}
              onValueChange={(valor) => { // valor es el value del item seleccionado, se pasa automatico
                setCategoria(valor)
              }}
            >
                <Picker.Item label='-- Seleccione --' value=""/>
                <Picker.Item label='Ahorro' value="ahorro"/>
                <Picker.Item label='Comida' value="comida"/>
                <Picker.Item label='Casa' value="casa"/>
                <Picker.Item label='Gastos Varios' value="gastos"/>
                <Picker.Item label='Ocio' value="ocio"/>
                <Picker.Item label='Salud' value="salud"/>
                <Picker.Item label='Suscripciones' value="suscripciones"/>
            </Picker>
        </View>

        <Pressable 
          style={styles.submitBtn}
          onPressOut={() => handleGasto({nombre, cantidad, categoria, id, fecha})}
        >
          <Text style={styles.submitBtnTexto}>{gasto.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: 'blue',
    flex: 1,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    flex: 1,
  },
  btnCancelar: {
    backgroundColor: '#db2777',
  },
  btnEliminar: {
    backgroundColor: 'red',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    color: '#64748b',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748b',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    padding: 10,
    marginTop: 20,
  },
  submitBtnTexto: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})

export default FormularioGasto