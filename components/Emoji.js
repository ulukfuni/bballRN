import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native"

const styles = StyleSheet.create({
  emojiContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const happy = ['👋', '👌', '👍', '👏', '👐'];
const sad = ['😢', '😓', '😒', '😳', '😭'];
const INITIAL_Y = 5;


export default function Emoji({ y = 0, scored = null }) {
  const [ relativeY, setRelativeY ] = useState(new Animated.Value(INITIAL_Y))
  const [ fadeAnim, setFadeAnim ] = useState(new Animated.Value(0))
  const [ emoji, setEmoji ] = useState('')
  return (<View />)
}