import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  floorContainer: {
    backgroundColor: '#f4f4f4',
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 0,
  }
})

export default function Floor({ height = 10 }) {
  return (
    <View style={[{ height }, styles.floorContainer ]} />
  )
}