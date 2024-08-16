import { DDiagramCanvasEditor, EShape } from "@wcardinal/wcardinal-ui";

export type EFinder = (canvas: DDiagramCanvasEditor, word: string) => Promise<EShape[]> | EShape[];
