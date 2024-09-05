import { on, emit, showUI } from '@create-figma-plugin/utilities'

import { ResizeWindowHandler, VariableItem } from './types'

export default async function () {
  console.log("- - - - main ts - - - - -")

  const testVars = await figma.variables.getLocalVariablesAsync('STRING');
  testVars.forEach(variable => {
    console.log(`${variable.name} -> ${variable.scopes}`)
  })

  on<ResizeWindowHandler>(
    'RESIZE_WINDOW',
    function (windowSize: { width: number; height: number }) {
      const { width, height } = windowSize
      figma.ui.resize(width, height)
    }
  )

  on('getFilteredList', async function (resolvedType: VariableResolvedDataType,searchString: string) {
    console.log('Main - on(getFilteredList)')
    const filteredList = await getListForUI(resolvedType, searchString)
    emit('showFilteredList', filteredList)
  })

  on('applyScopes', async function (searchString: string, resolvedType: VariableResolvedDataType, scopes: VariableScope[]) {
    console.log('Main - on(applyScopes)')
    console.log(scopes)
    await changeScope(searchString, resolvedType, scopes)
    const filteredList = await getListForUI(resolvedType, searchString)
    emit('showFilteredList', filteredList)
  })

  const options = {
    height: 400,
    width: 600
  }

  const data = {
    greeting: "hello world",
    variableList: await getListForUI('COLOR'), // type needs to be in sync with Plugins stateVar 'variableTypeFilter'
  }

  showUI(options, data)


  // # # # # # # # # # # # # # # #



  async function changeScope(searchString: string, resolvedType: VariableResolvedDataType, scopes: VariableScope[] ) {
    console.log(`Main - changeScope`)
    console.log(`searchString : ${searchString}`)
    console.log(`resolvedType : ${resolvedType}`)
    console.log(`scopes : ${scopes}`)
    const localVariables = await figma.variables.getLocalVariablesAsync(resolvedType);
    localVariables.forEach(variable => {
      if (variable.name.toLowerCase().includes(searchString.toLowerCase())){
        variable.scopes = scopes
      }
    }); 
  }
  
  async function getListForUI(resolvedType: VariableResolvedDataType, searchString?:string): Promise<VariableItem[]> {
    console.log('Main - getListForUI')
    const localVariables = await figma.variables.getLocalVariablesAsync(resolvedType);
    let variableList : VariableItem[] = []

    if (searchString != undefined && searchString.length) {
      const filteredList: Variable[] = localVariables.filter((variable) => {
        return variable.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
      })
      variableList = filteredList.map(variable => {
        const {id, name, scopes, resolvedType} = variable
        return {id, name, scopes, resolvedType}
      })
    }

    else if(searchString == undefined || !searchString.length){
      variableList = localVariables.map(variable => {
        const {id, name, scopes, resolvedType} = variable
        return {id, name, scopes, resolvedType}
    })}
    
    // console.log(variableList)
    // console.log('variableList')

    return variableList
  }

}
