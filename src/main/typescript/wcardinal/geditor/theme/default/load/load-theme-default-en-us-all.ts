/*
 * Copyright (C) 2019 Toshiba Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { DThemes } from "@wcardinal/wcardinal-ui";
import { EThemeDefaultEditor } from "../editor/e-theme-default-editor";
import { EThemeDefaultEditorPane } from "../editor/e-theme-default-editor-pane";
import { EThemeDefaultEditorPaneContent } from "../editor/e-theme-default-editor-pane-content";
import { EThemeDefaultEditorLayout } from "../editor/e-theme-default-editor-layout";
import { EThemeDefaultEnUsEditorTree } from "../editor/e-theme-default-en-us-editor-tree";
import { EThemeDefaultEnUsEditorText } from "../editor/e-theme-default-en-us-editor-text";
import { EThemeDefaultEnUsEditorSnap } from "../editor/e-theme-default-en-us-editor-snap";
import { EThemeDefaultEnUsEditorShape } from "../editor/e-theme-default-en-us-editor-shape";
import { EThemeDefaultEnUsEditorSearch } from "../editor/e-theme-default-en-us-editor-search";
import { EThemeDefaultEnUsEditorData } from "../editor/e-theme-default-en-us-editor-data";
import { EThemeDefaultEnUsEditorDataMapping } from "../editor/e-theme-default-en-us-editor-data-mapping";
import { EThemeDefaultEnUsEditorCoordinate } from "../editor/e-theme-default-en-us-editor-coordinate";
import { EThemeDefaultEnUsEditorCanvas } from "../editor/e-theme-default-en-us-editor-canvas";
import { EThemeDefaultEnUsEditorCanvasLegacy } from "../editor/e-theme-default-en-us-editor-canvas-legacy";
import { EThemeDefaultEnUsEditorAction } from "../editor/e-theme-default-en-us-editor-action";
import { EThemeDefaultEnUsEditorValidation } from "../editor/e-theme-default-en-us-editor-validation";
import { EThemeDefaultEnUsEditorLayer } from "../editor/e-theme-default-en-us-editor-layer";
import { FThemeDefaultEnUsGraphicEditor } from "../f-theme-default-en-us-graphic-editor";
import { FThemeDefaultEnUsGraphicTester } from "../f-theme-default-en-us-graphic-tester";
import { FThemeDefaultEnUsGraphicViewer } from "../f-theme-default-en-us-graphic-viewer";
import { EThemeDefaultEnUsDialogCanvas } from "../editor/e-theme-default-en-us-dialog-canvas";
import { EThemeDefaultButtonCheck } from "../editor/e-theme-default-button-check";
import { EThemeDefaultEnUsButtonLock } from "../editor/e-theme-default-en-us-button-lock";
import { EThemeDefaultButtonAmbient } from "../editor/e-theme-default-button-ambient";
import { EThemeDefaultEnUsDialogDataValue } from "../editor/e-theme-default-en-us-dialog-data-value";
import { EThemeDefaultEnUsDialogDataMappingValue } from "../editor/e-theme-default-en-us-dialog-data-mapping-value";
import { FThemeDefaultEnUsShapeType } from "../f-theme-default-en-us-shape-type";
import { EThemeDefaultEnUsDialogLayer } from "../editor/e-theme-default-en-us-dialog-layer";
import { EThemeDefaultEnUsDialogSnap } from "../editor/e-theme-default-en-us-dialog-snap";
import { EThemeDefaultEnUsShapeActionValue } from "../editor/e-theme-default-en-us-shape-action-value";
import { EThemeDefaultEnUsDialogAction } from "../editor/e-theme-default-en-us-dialog-action";
import { EThemeDefaultEditorButtonLayout } from "../editor/e-theme-default-editor-button-layout";
import { EThemeDefaultButtonToolLayout } from "../editor/e-theme-default-button-tool-layout";
import { EThemeDefaultEnUsShapeButton } from "../extension/button/e-theme-default-en-us-shape-button";
import { EThemeDefaultEnUsShapeButtonLayer } from "../extension/button-layer/e-theme-default-en-us-shape-button-layer";
import { ESubthemeDefaultEnUsEditorShapeButton } from "../extension/button/e-subtheme-default-en-us-editor-shape-button";
import { ESubthemeDefaultEnUsEditorShapeButtonLayer } from "../extension/button-layer/e-subtheme-default-en-us-editor-shape-button-layer";
import { EThemeDefaultEnUsShapeChartLine } from "../extension/chart-line/e-theme-default-en-us-shape-chart-line";
import { ESubthemeDefaultEnUsEditorShapeChartLine } from "../extension/chart-line/e-subtheme-default-en-us-editor-shape-chart-line";
import { EThemeDefaultEnUsShapeEmbeddedAcceptorEdge } from "../extension/embedded-acceptor-edge/e-theme-default-en-us-shape-embedded-acceptor-edge";
import { ESubthemeDefaultEnUsEditorShapeEmbeddedAcceptorEdge } from "../extension/embedded-acceptor-edge/e-subtheme-default-en-us-editor-shape-embedded-acceptor-edge";
import { EThemeDefaultEnUsShapeInput } from "../extension/input/e-theme-default-en-us-shape-input";
import { EThemeDefaultEnUsShapeTable } from "../extension/table/e-theme-default-en-us-shape-table";
import { ESubthemeDefaultEnUsEditorShapeTable } from "../extension/table/e-subtheme-default-en-us-editor-shape-table";
import { EThemeDefaultEnUsDialogShapeTableColumn } from "../extension/table/e-theme-default-en-us-dialog-shape-table-column";
import { EThemeDefaultEnUsDialogShapeButtonLayerValue } from "../extension/button-layer/e-theme-default-en-us-dialog-shape-button-layer-value";

export const loadThemeDefaultEnUsAll = (): void => {
	DThemes.setClass("FShapeType", FThemeDefaultEnUsShapeType);
	DThemes.setClass("EShapeActionValue", EThemeDefaultEnUsShapeActionValue);

	DThemes.setClass("EButtonEditor", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonEditorLock", EThemeDefaultEnUsButtonLock);
	DThemes.setClass("EButtonEditorCheck", EThemeDefaultButtonCheck);
	DThemes.setClass("EButtonToolLayout", EThemeDefaultButtonToolLayout);
	DThemes.setClass("EButtonToolFileGraphic", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonToolFile", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonToolShape", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonView", EThemeDefaultButtonAmbient);

	DThemes.setClass("EDialogAction", EThemeDefaultEnUsDialogAction);
	DThemes.setClass("EDialogCanvas", EThemeDefaultEnUsDialogCanvas);
	DThemes.setClass("EDialogDataMappingValue", EThemeDefaultEnUsDialogDataMappingValue);
	DThemes.setClass("EDialogDataValue", EThemeDefaultEnUsDialogDataValue);
	DThemes.setClass("EDialogLayer", EThemeDefaultEnUsDialogLayer);
	DThemes.setClass("EDialogSnap", EThemeDefaultEnUsDialogSnap);

	DThemes.setClass("EEditorButtonLayout", EThemeDefaultEditorButtonLayout);
	DThemes.setClass("EEditorAction", EThemeDefaultEnUsEditorAction);
	DThemes.setClass("EEditorCanvasLegacy", EThemeDefaultEnUsEditorCanvasLegacy);
	DThemes.setClass("EEditorCanvas", EThemeDefaultEnUsEditorCanvas);
	DThemes.setClass("EEditorCoordinate", EThemeDefaultEnUsEditorCoordinate);
	DThemes.setClass("EEditorDataMapping", EThemeDefaultEnUsEditorDataMapping);
	DThemes.setClass("EEditorData", EThemeDefaultEnUsEditorData);
	DThemes.setClass("EEditorLayer", EThemeDefaultEnUsEditorLayer);
	DThemes.setClass("EEditorLayout", EThemeDefaultEditorLayout);
	DThemes.setClass("EEditorPaneContent", EThemeDefaultEditorPaneContent);
	DThemes.setClass("EEditorPane", EThemeDefaultEditorPane);
	DThemes.setClass("EEditorSearch", EThemeDefaultEnUsEditorSearch);
	DThemes.setClass("EEditorShape", EThemeDefaultEnUsEditorShape);
	DThemes.setClass("EEditorSnap", EThemeDefaultEnUsEditorSnap);
	DThemes.setClass("EEditorText", EThemeDefaultEnUsEditorText);
	DThemes.setClass("EEditorTree", EThemeDefaultEnUsEditorTree);
	DThemes.setClass("EEditorValidation", EThemeDefaultEnUsEditorValidation);
	DThemes.setClass("EEditor", EThemeDefaultEditor);

	DThemes.setClass("FGraphicEditor", FThemeDefaultEnUsGraphicEditor);
	DThemes.setClass("FGraphicTester", FThemeDefaultEnUsGraphicTester);
	DThemes.setClass("FGraphicViewer", FThemeDefaultEnUsGraphicViewer);

	DThemes.setClass("EShapeButton", EThemeDefaultEnUsShapeButton);
	DThemes.setClass("EEditorShapeButton", ESubthemeDefaultEnUsEditorShapeButton);
	DThemes.setClass("EShapeButtonLayer", EThemeDefaultEnUsShapeButtonLayer);
	DThemes.setClass("EDialogShapeButtonLayerValue", EThemeDefaultEnUsDialogShapeButtonLayerValue);
	DThemes.setClass("EEditorShapeButtonLayer", ESubthemeDefaultEnUsEditorShapeButtonLayer);
	DThemes.setClass("EShapeChartLine", EThemeDefaultEnUsShapeChartLine);
	DThemes.setClass("EEditorShapeChartLine", ESubthemeDefaultEnUsEditorShapeChartLine);
	DThemes.setClass("EShapeEmbeddedAcceptorEdge", EThemeDefaultEnUsShapeEmbeddedAcceptorEdge);
	DThemes.setClass(
		"EEditorShapeEmbeddedAcceptorEdge",
		ESubthemeDefaultEnUsEditorShapeEmbeddedAcceptorEdge
	);
	DThemes.setClass("EShapeInput", EThemeDefaultEnUsShapeInput);
	DThemes.setClass("EShapeTable", EThemeDefaultEnUsShapeTable);
	DThemes.setClass("EDialogShapeTableColumn", EThemeDefaultEnUsDialogShapeTableColumn);
	DThemes.setClass("EEditorShapeTable", ESubthemeDefaultEnUsEditorShapeTable);
};
