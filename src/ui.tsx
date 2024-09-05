/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, SegmentedControl, Text, useWindowResize, Checkbox, Textbox, Button} from '@create-figma-plugin/ui'
import { emit, on, once } from '@create-figma-plugin/utilities'
import {h} from 'preact'

import { ResizeWindowHandler, VariableItem} from './types'
import { useCallback, useState } from 'preact/hooks';
import styles from './styles.css'
import {customIcon} from './customIcons'


let timer: ReturnType<typeof setTimeout>;
const waitTime: number = 200;

const search = function (resolvedType: VariableResolvedDataType, searchString: string) {
  console.log('Plugin - search:' + searchString);
  emit('getFilteredList', resolvedType, searchString)
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

  // # # # # # # # # # # # #  
  // State Vars
  // # # # # # # # # # # # # 

  const [variableList, setVariableList] = useState<VariableItem[]>(props.variableList)
  const [searchBoxValue, setSearchBoxValue] = useState<string>('')
  const [variableTypeFilter, setVariableTypeFilter] = useState<VariableResolvedDataType>('COLOR')
  const [typeControl, setTypeControl] = useState<string>('Color')
  // scope checkboxes Float
  const [allFloats, setAllFloats] = useState<boolean>(true)
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
  // scope checkboxes Color
  const [allColors, setAllColors] = useState<boolean>(true)
  const [allFills, setAllFills] = useState<boolean>(true)
  const [frameFill, setFrameFill] = useState<boolean>(true)
  const [shapeFill, setShapeFill] = useState<boolean>(true)
  const [textFill, setTextFill] = useState<boolean>(true)
  const [strokeColor, setStrokeColor] = useState<boolean>(true)
  const [effectColor, setEffectColor] = useState<boolean>(true)
  // scope checkboxes String
  const [allStrings, setAllStrings] = useState<boolean>(true)
  const [textContentString, setTextConentString] = useState<boolean>(true)
  const [fontFamilyString, setFontFamilyString] = useState<boolean>(true)
  const [fontWeightOrStyleString, setFontWeightOrStyleString] = useState<boolean>(true)
  

  const FloatScopes = (function():VariableScope[]{
    
    if(allFloats == true) return ['ALL_SCOPES']
    
    const someScopes: VariableScope[] = []

    if (cornerRadius) someScopes.push('CORNER_RADIUS');
    if (gap) someScopes.push('GAP');
    if (widthAndHeight) someScopes.push('WIDTH_HEIGHT');
    if (textContent) someScopes.push('TEXT_CONTENT');
    if (stroke) someScopes.push('STROKE_FLOAT');
    if (layerOpacity) someScopes.push('OPACITY');
    if (effects) someScopes.push('EFFECT_FLOAT');
    if (fontWeight) someScopes.push('FONT_WEIGHT');
    if (fontSize) someScopes.push('FONT_SIZE');
    if (lineHeight) someScopes.push('LINE_HEIGHT');
    if (letterSpacing) someScopes.push('LETTER_SPACING');
    if (paragraphSpacing) someScopes.push('PARAGRAPH_SPACING');
    if (paragraphIndent) someScopes.push('PARAGRAPH_INDENT');


    return someScopes
  })();

  const ColorScopes = (function():VariableScope[]{
    
    if(allColors == true) return ['ALL_SCOPES']
    
    const someScopes: VariableScope[] = []

    if (allFills) someScopes.push('ALL_FILLS');
    if (frameFill && !allFills) someScopes.push('FRAME_FILL');
    if (shapeFill && !allFills) someScopes.push('SHAPE_FILL');
    if (textFill && !allFills) someScopes.push('TEXT_FILL');
    if (strokeColor) someScopes.push('STROKE_COLOR');
    if (effectColor) someScopes.push('EFFECT_COLOR');
    return someScopes
  })();

  const StringScopes = (function():VariableScope[]{
    
    if(allStrings == true) return ['ALL_SCOPES']
    
    const someScopes: VariableScope[] = []

    if (textContentString) someScopes.push('TEXT_CONTENT');
    if (fontFamilyString) someScopes.push('FONT_FAMILY');
    if (fontWeightOrStyleString) someScopes.push('FONT_STYLE');
    
    return someScopes
  })();


  // # # # # # # # # # # # # 
  // Events from MAIN
  // # # # # # # # # # # # # 
  
  once('showFilteredList', function(variableList: VariableItem[]){
    console.log('Plugin: on(showFilteredList)')
    // console.log(variableList)
    setVariableList(variableList)
  })
  
  // # # # # # # # # # # # # 
  // UI Event Handlers
  // # # # # # # # # # # # # 


  function handleTextBoxInput (event: any) {
    const newValue = event.currentTarget.value as string;
    setSearchBoxValue(newValue);

    clearTimeout(timer)

    timer = setTimeout(() => {
      search(variableTypeFilter, newValue)
    }, waitTime)
  }

  function handleSubmit (event: any) {
    console.log('Plugin: handleSubmit')
    console.log(FloatScopes)
    emit('applyScopes', searchBoxValue, variableTypeFilter, (() => {
      if(variableTypeFilter == 'FLOAT') {return FloatScopes}
      else if (variableTypeFilter == 'STRING') {return  StringScopes}
      else if (variableTypeFilter == 'COLOR') {return  ColorScopes}
    })())
  }

  // float checbox handlers
  const handleAllScopesClick = useCallback(function (event: any){
    console.log(' all')
    const newValue = event.currentTarget.checked as boolean
    setAllFloats(newValue)
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
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleWidthAndHeightClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setWidthAndHeight(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleGapClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setGap(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleTextContentClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setTextContent(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleStrokeClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setStroke(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleLayerOpacityClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setLayerOpacity(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleEffectsClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setEffects(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleFontWeightClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setFontWeight(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleFontSizeClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setFontSize(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleLineHeightClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setLineHeight(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleLetterSpacingClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setLetterSpacing(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleParagraphSpacingClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setParagraphSpacing(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  const handleParagraphIndendClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setParagraphIndend(newValue)
    if (newValue == false) setAllFloats(newValue)
  }, []);
  // color checkbox handlers
  const handleAllColorsClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setAllColors(newValue)
    setAllFills(newValue)
    setFrameFill(newValue)
    setShapeFill(newValue)
    setTextFill(newValue)
    setStrokeColor(newValue)
    setEffectColor(newValue)
  }, []);

  const handleAllFillsClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setAllFills(newValue)
    setFrameFill(newValue)
    setShapeFill(newValue)
    setTextFill(newValue)
    if (newValue == false) setAllColors(newValue)
  }, []);

  const handleFrameFillClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setFrameFill(newValue)
    if (newValue == false) setAllFills(newValue)
    if (newValue == false) setAllColors(newValue)
  }, []);

  const handleShapeFillClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setShapeFill(newValue)
    if (newValue == false) setAllFills(newValue)
    if (newValue == false) setAllColors(newValue)
  }, []);

  const handleTextFillClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setTextFill(newValue)
    if (newValue == false) setAllFills(newValue)
    if (newValue == false) setAllColors(newValue)
  }, []);

  const handleStrokeColorClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setStrokeColor(newValue)
    if (newValue == false) setAllColors(newValue)
  }, []);

  const handleEffectColorClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setEffectColor(newValue)
    if (newValue == false) setAllColors(newValue)
  }, []);

  // string checkbox handlers
  const handleAllStringsClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setAllStrings(newValue)
    setTextConentString(newValue)
    setFontFamilyString(newValue)
    setFontWeightOrStyleString(newValue)
  }, []);

  const handleTextContentStringClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setTextConentString(newValue)
    if (newValue == false) setAllStrings(newValue)
  }, []);

  const handleFontFamilyStringClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setFontFamilyString(newValue)
    if (newValue == false) setAllStrings(newValue)
  }, []);

  const handleFontWeightOrStyleStringClick = useCallback(function (event: any){
    const newValue = event.currentTarget.checked as boolean
    setFontWeightOrStyleString(newValue)
    if (newValue == false) setAllStrings(newValue)
  }, []);

  // # # # # # # # # # # # # 
  // Components
  // # # # # # # # # # # # # 


  function VariableItem({variableItem}:{variableItem: VariableItem}) {
    // console.log(variableItem)
    // console.log(variableItem.name)

    const scopeDictionary: {[key in VariableScope]?: string} = {
      'ALL_FILLS': 'All fills',
      'ALL_SCOPES': 'All scopes',
      'CORNER_RADIUS': 'Corner radius',
      'EFFECT_COLOR': 'Effect',
      'EFFECT_FLOAT': 'Effect',
      'FONT_FAMILY': 'Font family',
      'FONT_SIZE': 'Font size',
      'FONT_STYLE': 'Font weight or style',
      'FONT_WEIGHT': 'Font weight',
      'FRAME_FILL': 'Frame Fill',
      'GAP': 'Gap',
      'LETTER_SPACING': 'Letter spacing',
      'LINE_HEIGHT': 'Line height',
      'OPACITY': 'Layer Opacity',
      'PARAGRAPH_INDENT': 'Paragraph Indent',
      'PARAGRAPH_SPACING': 'Paragraph Spacing',
      'SHAPE_FILL': 'Shape Fill',
      'STROKE_FLOAT': 'Stroke',
      'STROKE_COLOR' : 'Stroke',
      'TEXT_CONTENT': 'Text content',
      'TEXT_FILL': 'Text fill',
      'WIDTH_HEIGHT' : 'Widht and height',
    }

    const humanReadableScope = variableItem.scopes.map((scope: VariableScope) => {
      return scopeDictionary[scope]
    })

    const j = humanReadableScope.length ? humanReadableScope.join(', ') : 'No scope'

    return (
      <div class={styles.variableItem}>
        <p class={styles.variableName}>{variableItem.name}</p>
        <p class={styles.variableScope}>{j}</p>
      </div>
    )
  }

  function FloatSideBar() {
    return (
      <section class={styles.sideBar}>

        <Text>{'Number scope'}</Text>
        <Checkbox onChange={handleAllScopesClick} value={allFloats}><Text>Show in all supported properties</Text></Checkbox>
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
    )
  }

  function ColorSideBar() {
    return (
      <section class={styles.sideBar}>

        <Text>{'Color scope'}</Text>
        <Checkbox onChange={handleAllColorsClick} value={allColors}><Text>Show in all supported properties</Text></Checkbox>
        <Checkbox onChange={handleAllFillsClick} value={allFills}><Text>Fill</Text></Checkbox>
        <div class={styles.checkboxIndent}>
          <Checkbox onChange={handleFrameFillClick} value={frameFill}><Text>Frame</Text></Checkbox>
          <Checkbox onChange={handleShapeFillClick} value={shapeFill}><Text>Shape</Text></Checkbox>
          <Checkbox onChange={handleTextFillClick} value={textFill}><Text>Text</Text></Checkbox>
        </div>
        <Checkbox onChange={handleStrokeColorClick} value={strokeColor}><Text>Stroke</Text></Checkbox>
        <Checkbox onChange={handleEffectColorClick} value={effectColor}><Text>Effects</Text></Checkbox>  
      </section>
    )
  }

  function StringSideBar() {
    return (
      <section class={styles.sideBar}>

        <Text>{'String scope'}</Text>
        <Checkbox onChange={handleAllStringsClick} value={allStrings}><Text>Show in all supported properties</Text></Checkbox>
        <Checkbox onChange={handleTextContentStringClick} value={textContentString}>
          <div class={styles.checkbox_label}>
            {customIcon.textContentIcon}
            <Text>Text Content</Text>
          </div>
        </Checkbox>
        <Checkbox onChange={handleFontFamilyStringClick} value={fontFamilyString}>
          <div class={styles.checkbox_label}>
            {customIcon.fontSizeIcon}
            <Text>Font family</Text>
          </div>
          </Checkbox>
        <Checkbox onChange={handleFontWeightOrStyleStringClick} value={fontWeightOrStyleString}>
          <div class={styles.checkbox_label}>
            {customIcon.fontWeightIcon}
            <Text>Font weight or style</Text>
          </div>
        </Checkbox>  
      </section>
    )
  }
  
  // # # # # # # # # # # # # 
  // UI
  // # # # # # # # # # # # # 

  const typeControlOptions = [{
    value: 'Float'
  }, {
    value:'Color'
  },
  {
    value: 'String'
  }]

  function handleTypeControlChange(event: any) {
    const newValue = event.currentTarget.value as string;
    setTypeControl(newValue)
    setVariableTypeFilter(newValue.toUpperCase() as VariableResolvedDataType)
    emit('getFilteredList', newValue.toUpperCase(), searchBoxValue)
  }

  return( 
    <div class={styles.mainContainer}>

      <section class={styles.contentSection}>
        <div class={styles.searchBoxWrapper}>
          {customIcon.searchIcon}
          <Textbox value={searchBoxValue} onInput={handleTextBoxInput} placeholder='Find variables…'></Textbox>
          <SegmentedControl onChange={handleTypeControlChange} options={typeControlOptions} value={typeControl} />
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
      {variableTypeFilter === 'FLOAT' ? (
        <FloatSideBar />
        ) : variableTypeFilter === 'COLOR' ? (
        <ColorSideBar />
        ) : variableTypeFilter === 'STRING' ? (
          <StringSideBar />
        ) : null}
      
    </div>
  )
}

export default render(Plugin)
