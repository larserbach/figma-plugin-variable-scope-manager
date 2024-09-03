import { on, showUI } from '@create-figma-plugin/utilities'

import { ResizeWindowHandler } from './types'

export default function () {
  on<ResizeWindowHandler>(
    'RESIZE_WINDOW',
    function (windowSize: { width: number; height: number }) {
      const { width, height } = windowSize
      figma.ui.resize(width, height)
    }
  )
  const options = {
    height: 400,
    width: 600
  }

  const data = {
    greeting: "hello world"
  }

  showUI(options, data)


  // # # # # # # # # # # # # # # #

  console.log("- - - - main ts - - - - -")


  async function main() {
    const localVariables = await figma.variables.getLocalVariablesAsync();
    // console.log(localVariables)

    localVariables.forEach(variable => {
      console.log(variable.name)
      console.log(variable.resolvedType)
      console.log(`scopes: ${variable.scopes.join(" ")}`)
    }); 
  }

  main()

}
