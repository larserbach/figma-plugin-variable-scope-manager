import { on, showUI } from '@create-figma-plugin/utilities'

import { ResizeWindowHandler, VariableItem } from './types'

export default async function () {
  console.log("- - - - main ts - - - - -")
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
    greeting: "hello world",
    variableList: await main()
  }

  showUI(options, data)


  // # # # # # # # # # # # # # # #



  // This allready works 
  async function changeScope(resolvedType: VariableResolvedDataType, filterString: string) {
    const localVariables = await figma.variables.getLocalVariablesAsync();
    localVariables.forEach(variable => {
      if (variable.resolvedType == resolvedType && variable.name.includes(filterString)){
      variable.scopes = ["CORNER_RADIUS"]}
    }); 
  }
  
  async function main() {
    const localVariables = await figma.variables.getLocalVariablesAsync();
    console.log(localVariables)

    const variableList : VariableItem[] = localVariables.map(variable => {
      const {id, name, scopes, resolvedType} = variable
      return {id, name, scopes, resolvedType}
    })

    console.log(variableList)

    return variableList
  }

  // main()
  // changeScope('FLOAT', 'corner')

}
