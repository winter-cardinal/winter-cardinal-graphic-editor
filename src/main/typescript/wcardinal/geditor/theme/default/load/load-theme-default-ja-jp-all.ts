/*
 * Copyright (C) 2019 Toshiba Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { DThemes } from "@wcardinal/wcardinal-ui";
import { EThemeDefaultEditor } from "../editor/e-theme-default-editor";
import { EThemeDefaultEditorPane } from "../editor/e-theme-default-editor-pane";
import { EThemeDefaultEditorPaneContent } from "../editor/e-theme-default-editor-pane-content";
import { EThemeDefaultEditorLayout } from "../editor/e-theme-default-editor-layout";
import { FThemeDefaultJaJpGraphicEditor } from "../f-theme-default-ja-jp-graphic-editor";
import { FThemeDefaultJaJpGraphicTester } from "../f-theme-default-ja-jp-graphic-tester";
import { FThemeDefaultJaJpGraphicViewer } from "../f-theme-default-ja-jp-graphic-viewer";
import { EThemeDefaultJaJpEditorTree } from "../editor/e-theme-default-ja-jp-editor-tree";
import { EThemeDefaultJaJpEditorText } from "../editor/e-theme-default-ja-jp-editor-text";
import { EThemeDefaultJaJpEditorSnap } from "../editor/e-theme-default-ja-jp-editor-snap";
import { EThemeDefaultJaJpEditorShape } from "../editor/e-theme-default-ja-jp-editor-shape";
import { EThemeDefaultJaJpEditorSearch } from "../editor/e-theme-default-ja-jp-editor-search";
import { EThemeDefaultJaJpEditorData } from "../editor/e-theme-default-ja-jp-editor-data";
import { EThemeDefaultJaJpEditorDataMapping } from "../editor/e-theme-default-ja-jp-editor-data-mapping";
import { EThemeDefaultJaJpEditorCoordinate } from "../editor/e-theme-default-ja-jp-editor-coordinate";
import { EThemeDefaultJaJpEditorCanvas } from "../editor/e-theme-default-ja-jp-editor-canvas";
import { EThemeDefaultJaJpEditorCanvasLegacy } from "../editor/e-theme-default-ja-jp-editor-canvas-legacy";
import { EThemeDefaultJaJpEditorAction } from "../editor/e-theme-default-ja-jp-editor-action";
import { EThemeDefaultJaJpEditorValidation } from "../editor/e-theme-default-ja-jp-editor-validation";
import { EThemeDefaultJaJpEditorLayer } from "../editor/e-theme-default-ja-jp-editor-layer";
import { EThemeDefaultJaJpDialogCanvas } from "../editor/e-theme-default-ja-jp-dialog-canvas";
import { EThemeDefaultButtonCheck } from "../editor/e-theme-default-button-check";
import { EThemeDefaultJaJpButtonLock } from "../editor/e-theme-default-ja-jp-button-lock";
import { EThemeDefaultButtonAmbient } from "../editor/e-theme-default-button-ambient";
import { EThemeDefaultJaJpDialogDataValue } from "../editor/e-theme-default-ja-jp-dialog-data-value";
import { EThemeDefaultJaJpDialogDataMappingValue } from "../editor/e-theme-default-ja-jp-dialog-data-mapping-value";
import { FThemeDefaultJaJpShapeType } from "../f-theme-default-ja-jp-shape-type";
import { EThemeDefaultJaJpDialogLayer } from "../editor/e-theme-default-ja-jp-dialog-layer";
import { EThemeDefaultJaJpDialogSnap } from "../editor/e-theme-default-ja-jp-dialog-snap";
import { EThemeDefaultJaJpShapeActionValue } from "../editor/e-theme-default-ja-jp-shape-action-value";
import { EThemeDefaultJaJpDialogAction } from "../editor/e-theme-default-ja-jp-dialog-action";
import { EThemeDefaultEditorButtonLayout } from "../editor/e-theme-default-editor-button-layout";
import { EThemeDefaultButtonToolLayout } from "../editor/e-theme-default-button-tool-layout";
import { EThemeDefaultJaJpShapeButton } from "../extension/button/e-theme-default-ja-jp-shape-button";
import { ESubthemeDefaultJaJpEditorShapeButton } from "../extension/button/e-subtheme-default-ja-jp-editor-shape-button";
import { EThemeDefaultJaJpShapeButtonLayer } from "../extension/button-layer/e-theme-default-ja-jp-shape-button-layer";
import { ESubthemeDefaultJaJpEditorShapeButtonLayer } from "../extension/button-layer/e-subtheme-default-ja-jp-editor-shape-button-layer";
import { EThemeDefaultJaJpShapeChartLine } from "../extension/chart-line/e-theme-default-ja-jp-shape-chart-line";
import { ESubthemeDefaultJaJpEditorShapeChartLine } from "../extension/chart-line/e-subtheme-default-ja-jp-editor-shape-chart-line";
import { EThemeDefaultJaJpShapeEmbeddedAcceptorEdge } from "../extension/embedded-acceptor-edge/e-theme-default-ja-jp-shape-embedded-acceptor-edge";
import { ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge } from "../extension/embedded-acceptor-edge/e-subtheme-default-ja-jp-editor-shape-embedded-acceptor-edge";
import { EThemeDefaultJaJpShapeInput } from "../extension/input/e-theme-default-ja-jp-shape-input";
import { EThemeDefaultJaJpShapeTable } from "../extension/table/e-theme-default-ja-jp-shape-table";
import { ESubthemeDefaultJaJpEditorShapeTable } from "../extension/table/e-subtheme-default-ja-jp-editor-shape-table";
import { EThemeDefaultJaJpDialogShapeTableColumn } from "../extension/table/e-theme-default-ja-jp-dialog-shape-table-column";
import { EThemeDefaultJaJpDialogShapeButtonLayerValue } from "../extension/button-layer/e-theme-default-ja-jp-dialog-shape-button-layer-value";

export const loadThemeDefaultJaJpAll = (): void => {
	DThemes.setClass("FShapeType", FThemeDefaultJaJpShapeType);
	DThemes.setClass("EShapeActionValue", EThemeDefaultJaJpShapeActionValue);

	DThemes.setClass("EButtonEditor", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonEditorLock", EThemeDefaultJaJpButtonLock);
	DThemes.setClass("EButtonEditorCheck", EThemeDefaultButtonCheck);
	DThemes.setClass("EButtonToolLayout", EThemeDefaultButtonToolLayout);
	DThemes.setClass("EButtonToolFileGraphic", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonToolFile", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonToolShape", EThemeDefaultButtonAmbient);
	DThemes.setClass("EButtonView", EThemeDefaultButtonAmbient);

	DThemes.setClass("EDialogAction", EThemeDefaultJaJpDialogAction);
	DThemes.setClass("EDialogCanvas", EThemeDefaultJaJpDialogCanvas);
	DThemes.setClass("EDialogDataMappingValue", EThemeDefaultJaJpDialogDataMappingValue);
	DThemes.setClass("EDialogDataValue", EThemeDefaultJaJpDialogDataValue);
	DThemes.setClass("EDialogLayer", EThemeDefaultJaJpDialogLayer);
	DThemes.setClass("EDialogSnap", EThemeDefaultJaJpDialogSnap);

	DThemes.setClass("EEditorButtonLayout", EThemeDefaultEditorButtonLayout);
	DThemes.setClass("EEditorAction", EThemeDefaultJaJpEditorAction);
	DThemes.setClass("EEditorCanvasLegacy", EThemeDefaultJaJpEditorCanvasLegacy);
	DThemes.setClass("EEditorCanvas", EThemeDefaultJaJpEditorCanvas);
	DThemes.setClass("EEditorCoordinate", EThemeDefaultJaJpEditorCoordinate);
	DThemes.setClass("EEditorDataMapping", EThemeDefaultJaJpEditorDataMapping);
	DThemes.setClass("EEditorData", EThemeDefaultJaJpEditorData);
	DThemes.setClass("EEditorLayer", EThemeDefaultJaJpEditorLayer);
	DThemes.setClass("EEditorLayout", EThemeDefaultEditorLayout);
	DThemes.setClass("EEditorPaneContent", EThemeDefaultEditorPaneContent);
	DThemes.setClass("EEditorPane", EThemeDefaultEditorPane);
	DThemes.setClass("EEditorSearch", EThemeDefaultJaJpEditorSearch);
	DThemes.setClass("EEditorShape", EThemeDefaultJaJpEditorShape);
	DThemes.setClass("EEditorSnap", EThemeDefaultJaJpEditorSnap);
	DThemes.setClass("EEditorText", EThemeDefaultJaJpEditorText);
	DThemes.setClass("EEditorTree", EThemeDefaultJaJpEditorTree);
	DThemes.setClass("EEditorValidation", EThemeDefaultJaJpEditorValidation);
	DThemes.setClass("EEditor", EThemeDefaultEditor);

	DThemes.setClass("FGraphicEditor", FThemeDefaultJaJpGraphicEditor);
	DThemes.setClass("FGraphicTester", FThemeDefaultJaJpGraphicTester);
	DThemes.setClass("FGraphicViewer", FThemeDefaultJaJpGraphicViewer);

	DThemes.setClass("EShapeButton", EThemeDefaultJaJpShapeButton);
	DThemes.setClass("EEditorShapeButton", ESubthemeDefaultJaJpEditorShapeButton);
	DThemes.setClass("EShapeButtonLayer", EThemeDefaultJaJpShapeButtonLayer);
	DThemes.setClass("EDialogShapeButtonLayerValue", EThemeDefaultJaJpDialogShapeButtonLayerValue);
	DThemes.setClass("EEditorShapeButtonLayer", ESubthemeDefaultJaJpEditorShapeButtonLayer);
	DThemes.setClass("EShapeChartLine", EThemeDefaultJaJpShapeChartLine);
	DThemes.setClass("EEditorShapeChartLine", ESubthemeDefaultJaJpEditorShapeChartLine);
	DThemes.setClass("EShapeEmbeddedAcceptorEdge", EThemeDefaultJaJpShapeEmbeddedAcceptorEdge);
	DThemes.setClass(
		"EEditorShapeEmbeddedAcceptorEdge",
		ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge
	);
	DThemes.setClass("EShapeInput", EThemeDefaultJaJpShapeInput);
	DThemes.setClass("EShapeTable", EThemeDefaultJaJpShapeTable);
	DThemes.setClass("EDialogShapeTableColumn", EThemeDefaultJaJpDialogShapeTableColumn);
	DThemes.setClass("EEditorShapeTable", ESubthemeDefaultJaJpEditorShapeTable);
};
