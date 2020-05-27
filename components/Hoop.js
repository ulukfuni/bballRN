import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  hoopContainer: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - (179 / 2),
    width: 179,
    height: 112,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#b7b7b7',
    borderRadius: 4,
  },
  hoopContained: {
    width: 70,
    height: 54,
    marginTop: 38,
    borderWidth: 5,
    borderColor: '#b7b7b7',
  },
});

export default function Hoop({ y = 0 }) {
  return (
    <View style={[ styles.hoopContainer, { bottom: y }]}>
      <View styles={styles.hoopContained} />
    </View>
  )
}