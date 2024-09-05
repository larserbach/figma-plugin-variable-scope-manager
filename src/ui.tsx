/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, Container, Text, VerticalSpace, useWindowResize, Checkbox, Textbox, Button} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import {h} from 'preact'

import { ResizeWindowHandler, VariableItem} from './types'
import { useCallback, useState } from 'preact/hooks';
import styles from './styles.css'
import {customIcon} from './customIcons'


let timer: ReturnType<typeof setTimeout>;
const waitTime: number = 200;

const search = function (searchString: string) {
  console.log(searchString);
  emit('getFilteredList', searchString)
}


function Plugin(props: { greeting: string, variableList: VariableItem[]}) {

  console.log('PLUGIN')
  // console.log(props.variableList)
  
  function onWindowResize(windowSize: { width: number; height: number }) {
    emit<ResizeWindowHandler>('RESIZE_WINDOW', windowSize)
  }
  useWindowResize(onWindowResize, {
    maxHeight: 8000,
    maxWidth: 8000,
    minHeight: 400,
    minWidth: 600,
    resizeBehaviorOnDoubleClick: 'minimize'
  })

  // State Vars
  const [variableList, setVariableList] = useState<VariableItem[]>(props.variableList)

  on('showFilteredList', function(variableList: VariableItem[]){
    console.log('Plugin showFiltered List')
    console.log(variableList)
    setVariableList(variableList)
  })

  const [searchBoxValue, setSearchBoxValue] = useState<string>('');

  const [allScopes, setAllScopes] = useState<boolean>(true)
  const [cornerRadius, setCornerRadius] = useState<boolean>(true)
  const [gap, setGap] = useState<boolean>(true)
  const [widthAndHeight, setWidthAndHeight] = useState<boolean>(true)
  const [textContent, setTextContent] = useState<boolean>(true)
  const [stroke, setStroke] = useState<boolean>(true)
  const [layerOpacity, setLayerOpacity] = useState<boolean>(true)
  const [effects, setEffects] = useState<boolean>(true)
  const [fontWeight, setFontWeight] = useState<boolean>(true)
  const [fontSize, setFontSize] = useState<boolean>(true)
  const [lineHeight, setLineHeight] = useState<boolean>(true)
  const [letterSpacing, setLetterSpacing] = useState<boolean>(true)
  const [paragraphSpacing, setParagraphSpacing] = useState<boolean>(true)
  const [paragraphIndent, setParagraphIndend] = useState<boolean>(true)
  

  // Event Handlers 
  


  function handleTextBoxInput (event: any) {
    const newValue = event.currentTarget.value as string;
    setSearchBoxValue(newValue);

    clearTimeout(timer)

    timer = setTimeout(() => {
      search(newValue)
    }, waitTime)
  }

  function handleSubmit (event: any) {
    console.log('submit')
  }

  // checbox handlers
  const handleAllScopesClick = useCallback(function (event: any){
    console.log(' all')
    const newValue = event.currentTarget.checked as boolean
    setAllScopes(newValue)
    setCornerRadius(newValue)
    setGap(newValue)
    setWidthAndHeight(newValue)
    setTextContent(newValue)
    setStroke(newValue)
    setLayerOpacity(newValue)
    setEffects(newValue)
    setFontWeight(newValue)
    setFontSize(newValue)
    setLineHeight(newValue)
    setLetterSpacing(newValue)
    setParagraphSpacing(newValue)
    setParagraphIndend(newValue)
  }, []);

  const handleCornerRadiusClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setCornerRadius(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleWidthAndHeightClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setWidthAndHeight(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleGapClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setGap(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleTextContentClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setTextContent(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleStrokeClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setStroke(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleLayerOpacityClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setCornerRadius(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleEffectsClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setEffects(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleFontWeightClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setFontWeight(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleFontSizeClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setFontSize(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleLineHeightClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setLineHeight(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleLetterSpacingClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setLetterSpacing(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleParagraphSpacingClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setParagraphSpacing(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  const handleParagraphIndendClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setParagraphIndend(newValue)
    if (newValue == false) setAllScopes(newValue)
  }, []);

  function VariableItem({variableItem}:{variableItem: VariableItem}) {
    console.log(variableItem)
    // console.log(variableItem.name)
    return (
      <div class={styles.variableItem}>
        <p class= {styles.variableName}>{variableItem.name}</p>
      </div>
    )
  }
  
  // Render

  return( 
    <div class={styles.mainContainer}>

      <section class={styles.contentSection}>
        <div class={styles.searchBoxWrapper}>
          {customIcon.searchIcon}
          <Textbox value={searchBoxValue} onInput={handleTextBoxInput} placeholder='Find variables…'></Textbox>
        </div>
        <section class={styles.variableList}>
          {variableList.map((variable) => (
            <VariableItem variableItem={variable}></VariableItem>
          ))}
        </section>
        <div class={styles.submitWrapper}>
          <Button onClick={handleSubmit}>Apply Scopes</Button>
        </div>
      </section>
      
      <section class={styles.sideBar}>

        <Text>{'Number scope'}</Text>
        <Checkbox onChange={handleAllScopesClick} value={allScopes}><Text>Show in all supported properties</Text></Checkbox>
        <Checkbox onChange={handleCornerRadiusClick} value={cornerRadius}>
          <div class={styles.checkbox_label}>
            {customIcon.cornerRadiusIcon}
            <Text>Corner radius</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleWidthAndHeightClick} value={widthAndHeight}>
          <div class={styles.checkbox_label}>
            {customIcon.widthAndHeightIcon}
            <Text>Width and height</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleGapClick} value={gap}>
          <div class={styles.checkbox_label}>
            {customIcon.gapIcon}
            <Text>Gap</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleTextContentClick} value={textContent}>
          <div class={styles.checkbox_label}>
            {customIcon.textContentIcon}
            <Text>Text Content</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleStrokeClick} value={stroke}>
          <div class={styles.checkbox_label}>
            {customIcon.strokeIcon}
            <Text>Stroke</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleLayerOpacityClick} value={layerOpacity}>
          <div class={styles.checkbox_label}>
            {customIcon.layerOpacityIcon}
            <Text>Layer opacity</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleEffectsClick} value={effects}>
          <div class={styles.checkbox_label}>
            {customIcon.effectsIcon}
            <Text>Effects</Text>
          </div>
        </Checkbox>

        <Text>{'Typography'}</Text>
        
        <Checkbox onChange={handleFontWeightClick} value={fontWeight}>
          <div class={styles.checkbox_label}>
            {customIcon.fontWeightIcon}
            <Text>Font weight</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleFontSizeClick} value={fontSize}>
          <div class={styles.checkbox_label}>
            {customIcon.fontSizeIcon}
            <Text>Font size</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleLineHeightClick} value={lineHeight}>
          <div class={styles.checkbox_label}>
            {customIcon.lineHeightIcon}
            <Text>Line height</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleLetterSpacingClick} value={letterSpacing}>
          <div class={styles.checkbox_label}>
            {customIcon.letterSpacingIcon}
            <Text>Letter spacing</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleParagraphSpacingClick} value={paragraphSpacing}>
          <div class={styles.checkbox_label}>
            {customIcon.paragraphSpacingIcon}
            <Text>Paragraph Spacing</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleParagraphIndendClick} value={paragraphIndent}>
          <div class={styles.checkbox_label}>
            {customIcon.paragraphIndentIcon}
            <Text>ParagraphIndent</Text>
          </div>
        </Checkbox>
      </section>
    </div>
  )
}

export default render(Plugin)
