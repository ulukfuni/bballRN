import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import Ball from './components/Ball'
import Floor from './components/Floor'
import Net from './components/Net'
import Score from './components/Score'
import Hoop from './components/Hoop'

import Vector from './utils/Vector';

// physical variables
const gravity = 0.6; // gravity
const radius = 48; // ball radius
const rotationFactor = 10; // ball rotation factor

// components sizes and positions
const FLOOR_HEIGHT = 48;
const FLOOR_Y = 11;
const HOOP_Y = Dimensions.get('window').height - 227;
const NET_HEIGHT = 6;
const NET_WIDTH = 83;
const NET_Y = Dimensions.get('window').height - 216;
const NET_X = (Dimensions.get('window').width / 2) - (NET_WIDTH / 2);
const NET_LEFT_BORDER_X = NET_X + NET_HEIGHT / 2;
const NET_LEFT_BORDER_Y = NET_Y;
const NET_RIGHT_BORDER_X = NET_X + NET_WIDTH - NET_HEIGHT / 2;
const NET_RIGHT_BORDER_Y = NET_LEFT_BORDER_Y;

// ball lifecycle
const LC_WAITING = 0;
const LC_STARTING = 1;
const LC_FALLING = 2;
const LC_BOUNCING = 3;
const LC_RESTARTING = 4;
const LC_RESTARTING_FALLING = 5;

export default function App() {
  this.interval = null

  const [ x, setX ] = useState((Dimensions.get('window').width / 2 )- radius)
  const [ y, setY ] = useState(FLOOR_Y)
  const [ vx, setVX ] = useState(0)
  const [ vy, setVY ] = useState(0)
  const [ rotate, setRotate ] = useState(0)
  const [ scale, setScale ] = useState(1)
  const [ lifecycle, setLifecycle ] = useState(LC_WAITING)
  const [ scored, setScored ] = useState(null)
  const [ score, setScore ] = useState(0)

  useEffect(() => {
    // this.interval = setInterval(this.update.bind(this), 1000 / 60);
    return () => {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }
  }, [])

  const onStart = (angle) => {
    if (lifecycle === LC_WAITING) {
      setVX(angle * 0.2)
      setVY(-16) // bounce?
      setLifecycle(LC_STARTING)
    }
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const circlesColliding = (circle1, circle2) => {
    const dx = circle1.x - circle2.x
    const dy = circle1.y - circle2.y
    const distance = Math.sqrt((dx*dx) + (dy*dy))
    if (distance < (circle1.radius + circle2.radius)) {
      return true
    }
    return false
  }

  const updateCollisionVelocity = (nextState, ball, netBorder) => {
    const xDistance = (netBorder.x - ball.x);
    const yDistance = (netBorder.y - ball.y);
    let normalVector = new Vector(xDistance, yDistance);
    normalVector = normalVector.normalise();

    const tangentVector = new Vector((normalVector.getY() * -1), normalVector.getX());

    // create ball scalar normal direction.
    const ballScalarNormal = normalVector.dot(ball.velocity);
    const netScalarNormal = normalVector.dot(netBorder.velocity);

    // create scalar velocity in the tagential direction.
    const ballScalarTangential = tangentVector.dot(ball.velocity);

    const ballScalarNormalAfter = (ballScalarNormal * (ball.mass - netBorder.mass) +
     2 * netBorder.mass * netScalarNormal) / (ball.mass + netBorder.mass);

    const ballScalarNormalAfterVector = normalVector.multiply(ballScalarNormalAfter);
    const ballScalarNormalVector = (tangentVector.multiply(ballScalarTangential));

    const nextVelocity = ballScalarNormalVector.add(ballScalarNormalAfterVector);

    if (ball.y < NET_Y + NET_HEIGHT / 2) {
      nextState.vx = nextVelocity.x;
    } else {
      nextState.vx = -nextVelocity.x;
    }

    nextState.vy = nextVelocity.y;
    nextState.x = this.state.x + nextState.vx;
    nextState.y = this.state.y - nextState.vy;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
