import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Planificador de Gastos</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
})

export default Header