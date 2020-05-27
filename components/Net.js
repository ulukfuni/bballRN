import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  netContainer: {
    position: 'absolute',
    backgroundColor: '#ff260f',
    borderRadius: 3,
  },
});

export default function Net({ y = 0, x = 0, height = 10, width = 10 }) {
  return (
    <View style={[ styles.netContainer, {
      bottom: y,
      left: x,
      height,
      width
    }]} />
  )
}