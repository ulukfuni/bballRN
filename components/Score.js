import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'

const styles = StyleSheet.create({
  scoreContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default function Score({ y = 0, scored = null, score = 0 }) {
  return (
    <View style={[ styles.scoreContainer, { bottom: y, width: Dimensions.get('window').width }]}>
      <Text style={{
        flex: 1,
        fontSize: 130,
        fontWeight: '100',
        color: '#707070'
      }}>{score}</Text>
    </View>
  )
}