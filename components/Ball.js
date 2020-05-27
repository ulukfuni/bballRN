import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

const styles = StyleSheet.create({
  ballContainer: {
    position: 'absolute',
    backgroundColor: 'transparent'
  }
})

export default function Ball({ onStart = () => {}, x = 0, y = 0, radius = 48, rotate = 0, scale = 1 }) {
  let xIn = null
  let yIn = null
  let xOut = null
  let yOut = null
  let initialPageY = null
  let initialPageX = null

  const handleOnPressIn = (e) => {
    xIn = e.nativeEvent.locationX
    yIn = e.nativeEvent.locationY
    initialPageY = e.nativeEvent.pageY
    initalPageX = e.nativeEvent.pageX
  }
  
  const handleOnPressOut = (e) =>  {
    if (xIn !== null) {
      const dx = e.nativeEvent.pageX - initialPageX
      const dy = e.nativeEvent.pageY - initialPageY
      xOut = xIn + dx
      yOut = yIn + dy
      const angle = Math.atan2(yOut - yIn, xOut - xIn) * 180 / Math.PI
      onStart(angle + 90)

      xIn = null
      yIn = null
      xOut = null
      yOut = null
      initialPageY = null
      initialPageX = null
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[ styles.ballContainer, {
        width: radius * 2,
        height: radius * 2,
        left: x,
        bottom: y
      }]}
    >
      <Image
        source={{ uri: 'https://raw.githubusercontent.com/FaridSafi/react-native-basketball/902dac849843d6beff3ee843ac527240d73da44f/assets/ball-384.png' }}
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          backgroundColor: 'transparent',
          transform: [
            { rotate: `${rotate} deg`},
            { scale }
          ]
        }}
      />
    </TouchableOpacity>
  )
}