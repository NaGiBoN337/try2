import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import { Platform } from 'react-native'


function IgniteApp() {

  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("try2", () => IgniteApp)
export default App