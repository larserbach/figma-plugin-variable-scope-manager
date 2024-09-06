import { EventHandler } from '@create-figma-plugin/utilities'

export interface ResizeWindowHandler extends EventHandler {
  name: 'RESIZE_WINDOW'
  handler: (windowSize: { width: number; height: number }) => void
}

export interface VariableItem {
  id: string;
  name: string;
  scopes: VariableScope[];
  resolvedType: VariableResolvedDataType
}

export type SegmentedControlKey = 'Numbers' | 'Colors' | 'Strings';

