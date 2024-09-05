import { on, emit, showUI } from '@create-figma-plugin/utilities'

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

  on('getFilteredList', async function (searchString: string) {
    const filteredList = await getListForUI(searchString)
    emit('showFilteredList', filteredList)
  })

  const options = {
    height: 400,
    width: 600
  }

  const data = {
    greeting: "hello world",
    variableList: await getListForUI(),
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
  
  async function getListForUI(searchString?:string): Promise<VariableItem[]> {
    console.log('getList')
    const localVariables = await figma.variables.getLocalVariablesAsync();
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
    
    console.log(variableList)
    console.log('variableList')

    return variableList
  }

}
