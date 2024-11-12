/*
 WinterCardinal Graphic Editor v1.0.3
 Copyright (C) TOSHIBA Coorporation
 SPDX-License-Identifier: Apache-2.0

 Material Design icons by Google
 Apache license version 2.0.
*/
(function (wcardinalUi, pixi_js) {
    'use strict';

    var ESubthemeDefaultEditorShapeButton = /** @class */ (function () {
        function ESubthemeDefaultEditorShapeButton() {
            this._button = wcardinalUi.DThemes.get("EShapeButton");
        }
        ESubthemeDefaultEditorShapeButton.prototype.getLabel = function () {
            return this._button.getName();
        };
        return ESubthemeDefaultEditorShapeButton;
    }());

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */

    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
      return extendStatics(d, b);
    };

    function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var ESubthemeDefaultJaJpEditorShapeButton = /** @class */ (function (_super) {
        __extends(ESubthemeDefaultJaJpEditorShapeButton, _super);
        function ESubthemeDefaultJaJpEditorShapeButton() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ESubthemeDefaultJaJpEditorShapeButton.prototype.getCheckIsToggleLabel = function () {
            return "トグル";
        };
        ESubthemeDefaultJaJpEditorShapeButton.prototype.getCheckIsGroupedLabel = function () {
            return "グルーピング";
        };
        ESubthemeDefaultJaJpEditorShapeButton.prototype.getCheckIsActiveLabel = function () {
            return "アクティブ";
        };
        return ESubthemeDefaultJaJpEditorShapeButton;
    }(ESubthemeDefaultEditorShapeButton));

    var EThemeDefaultJaJpShapeButton = /** @class */ (function () {
        function EThemeDefaultJaJpShapeButton() {
        }
        EThemeDefaultJaJpShapeButton.prototype.getName = function () {
            return "ボタン";
        };
        EThemeDefaultJaJpShapeButton.prototype.getLabel = function () {
            return "ラベル";
        };
        return EThemeDefaultJaJpShapeButton;
    }());

    var ESubthemeDefaultEditorShapeButtonLayer = /** @class */ (function () {
        function ESubthemeDefaultEditorShapeButtonLayer() {
            this._buttonLayer = wcardinalUi.DThemes.get("EShapeButtonLayer");
        }
        ESubthemeDefaultEditorShapeButtonLayer.prototype.getLabel = function () {
            return this._buttonLayer.getName();
        };
        return ESubthemeDefaultEditorShapeButtonLayer;
    }());

    var EThemeDefaultDialogShapeButtonLayerValue = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogShapeButtonLayerValue, _super);
        function EThemeDefaultDialogShapeButtonLayerValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultDialogShapeButtonLayerValue;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var ESubthemeDefaultJaJpEditorShapeButtonLayer = /** @class */ (function (_super) {
        __extends(ESubthemeDefaultJaJpEditorShapeButtonLayer, _super);
        function ESubthemeDefaultJaJpEditorShapeButtonLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ESubthemeDefaultJaJpEditorShapeButtonLayer.prototype.getButtonNewTitle = function () {
            return "列の新規作成";
        };
        ESubthemeDefaultJaJpEditorShapeButtonLayer.prototype.getButtonDeleteTitle = function () {
            return "選択列を削除";
        };
        ESubthemeDefaultJaJpEditorShapeButtonLayer.prototype.getButtonBringForwardTitle = function () {
            return "選択列を前に移動";
        };
        ESubthemeDefaultJaJpEditorShapeButtonLayer.prototype.getButtonSendBackwardTitle = function () {
            return "選択列を後ろに移動";
        };
        ESubthemeDefaultJaJpEditorShapeButtonLayer.prototype.getInputMarginLabel = function () {
            return "マージン";
        };
        return ESubthemeDefaultJaJpEditorShapeButtonLayer;
    }(ESubthemeDefaultEditorShapeButtonLayer));

    var EThemeDefaultJaJpDialogShapeButtonLayerValue = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogShapeButtonLayerValue, _super);
        function EThemeDefaultJaJpDialogShapeButtonLayerValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpDialogShapeButtonLayerValue.prototype.getInputLabelLabel = function () {
            return "ラベル";
        };
        EThemeDefaultJaJpDialogShapeButtonLayerValue.prototype.newInputLabel = function () {
            return "ラベル";
        };
        EThemeDefaultJaJpDialogShapeButtonLayerValue.prototype.getInputWidthLabel = function () {
            return "横幅";
        };
        EThemeDefaultJaJpDialogShapeButtonLayerValue.prototype.getSelectLayerLabel = function () {
            return "レイヤー";
        };
        EThemeDefaultJaJpDialogShapeButtonLayerValue.prototype.getCheckBringToFromLabel = function () {
            return "前面に移動";
        };
        EThemeDefaultJaJpDialogShapeButtonLayerValue.prototype.getCheckIsGroupedLabel = function () {
            return "グループピング";
        };
        EThemeDefaultJaJpDialogShapeButtonLayerValue.prototype.getCheckIsActiveLabel = function () {
            return "アクティブ";
        };
        return EThemeDefaultJaJpDialogShapeButtonLayerValue;
    }(EThemeDefaultDialogShapeButtonLayerValue));

    var EThemeDefaultJaJpShapeButtonLayer = /** @class */ (function () {
        function EThemeDefaultJaJpShapeButtonLayer() {
        }
        EThemeDefaultJaJpShapeButtonLayer.prototype.getName = function () {
            return "レイヤーボタン";
        };
        EThemeDefaultJaJpShapeButtonLayer.prototype.getLabel = function () {
            return "ラベル";
        };
        return EThemeDefaultJaJpShapeButtonLayer;
    }());

    var ESubthemeDefaultEditorShapeChartLine = /** @class */ (function () {
        function ESubthemeDefaultEditorShapeChartLine() {
            this._chartLine = wcardinalUi.DThemes.get("EShapeChartLine");
        }
        ESubthemeDefaultEditorShapeChartLine.prototype.getLabel = function () {
            return this._chartLine.getName();
        };
        return ESubthemeDefaultEditorShapeChartLine;
    }());

    var ESubthemeDefaultJaJpEditorShapeChartLine = /** @class */ (function (_super) {
        __extends(ESubthemeDefaultJaJpEditorShapeChartLine, _super);
        function ESubthemeDefaultJaJpEditorShapeChartLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getCheckXAxisLabel = function () {
            return "X軸";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getCheckXAxisMajorTickLabel = function () {
            return "目盛";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getCheckXAxisMinorTickLabel = function () {
            return "補助目盛";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getCheckYAxisLabel = function () {
            return "Y軸";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getCheckYAxisMajorTickLabel = function () {
            return "目盛";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getCheckYAxisMinorTickLabel = function () {
            return "補助目盛";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getTextMajorTickCountLabel = function () {
            return "目盛数";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getTextMinorTickCountLabel = function () {
            return "補助目盛数";
        };
        ESubthemeDefaultJaJpEditorShapeChartLine.prototype.getTextPaddingLabel = function () {
            return "余白";
        };
        return ESubthemeDefaultJaJpEditorShapeChartLine;
    }(ESubthemeDefaultEditorShapeChartLine));

    var EThemeDefaultJaJpShapeChartLine = /** @class */ (function () {
        function EThemeDefaultJaJpShapeChartLine() {
        }
        EThemeDefaultJaJpShapeChartLine.prototype.getName = function () {
            return "ラインチャート";
        };
        EThemeDefaultJaJpShapeChartLine.prototype.newPlotAreaLabel = function () {
            return "タイトル";
        };
        EThemeDefaultJaJpShapeChartLine.prototype.newXAxisLabel = function () {
            return "X軸";
        };
        EThemeDefaultJaJpShapeChartLine.prototype.newYAxisLabel = function () {
            return "Y軸";
        };
        return EThemeDefaultJaJpShapeChartLine;
    }());

    var ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge = /** @class */ (function () {
        function ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge() {
            this._embeddedAcceptorEdge = wcardinalUi.DThemes.get("EShapeEmbeddedAcceptorEdge");
        }
        ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge.prototype.getLabel = function () {
            return this._embeddedAcceptorEdge.getName();
        };
        return ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge;
    }());

    var ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge = /** @class */ (function (_super) {
        __extends(ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge, _super);
        function ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge.prototype.toSelectSubtypeLabel = function (subType) {
            switch (subType) {
                case wcardinalUi.EShapeAcceptorEdgeType.HEAD:
                    return "終点";
                case wcardinalUi.EShapeAcceptorEdgeType.TAIL:
                    return "始点";
                case wcardinalUi.EShapeAcceptorEdgeType.ALL:
                    return "全て";
            }
        };
        ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge.prototype.toSelectSideLabel = function (side) {
            switch (side) {
                case wcardinalUi.EShapeAcceptorEdgeSide.LEFT:
                    return "左";
                case wcardinalUi.EShapeAcceptorEdgeSide.TOP:
                    return "上";
                case wcardinalUi.EShapeAcceptorEdgeSide.RIGHT:
                    return "右";
                case wcardinalUi.EShapeAcceptorEdgeSide.BOTTOM:
                    return "下";
            }
            return "";
        };
        ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge.prototype.getCheckIsVvisibleLabel = function () {
            return "ビューワーで表示";
        };
        return ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge;
    }(ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge));

    var EThemeDefaultJaJpShapeEmbeddedAcceptorEdge = /** @class */ (function () {
        function EThemeDefaultJaJpShapeEmbeddedAcceptorEdge() {
        }
        EThemeDefaultJaJpShapeEmbeddedAcceptorEdge.prototype.getName = function () {
            return "接続点";
        };
        return EThemeDefaultJaJpShapeEmbeddedAcceptorEdge;
    }());

    var EThemeDefaultJaJpShapeInput = /** @class */ (function () {
        function EThemeDefaultJaJpShapeInput() {
        }
        EThemeDefaultJaJpShapeInput.prototype.getName = function () {
            return "インプット";
        };
        EThemeDefaultJaJpShapeInput.prototype.getLabel = function () {
            return "テキスト";
        };
        return EThemeDefaultJaJpShapeInput;
    }());

    var ESubthemeDefaultEditorShapeTable = /** @class */ (function () {
        function ESubthemeDefaultEditorShapeTable() {
            this._table = wcardinalUi.DThemes.get("EShapeTable");
        }
        ESubthemeDefaultEditorShapeTable.prototype.getLabel = function () {
            return this._table.getName();
        };
        return ESubthemeDefaultEditorShapeTable;
    }());

    var EThemeDefaultDialogShapeTableColumn = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogShapeTableColumn, _super);
        function EThemeDefaultDialogShapeTableColumn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultDialogShapeTableColumn;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var EShapeTableIds = /** @class */ (function () {
        function EShapeTableIds() {
        }
        EShapeTableIds.ID = wcardinalUi.EShapeType.EXTENSION + 100;
        EShapeTableIds.HEADER_ID = wcardinalUi.EShapeType.EXTENSION + 101;
        EShapeTableIds.BODY_ID = wcardinalUi.EShapeType.EXTENSION + 102;
        return EShapeTableIds;
    }());

    /**
     * {@link EShape} search utility.
     */
    var UtilShapeSearch = /** @class */ (function () {
        function UtilShapeSearch() {
        }
        /**
         * Returns indices of the given shapes.
         *
         * @param shapes shapes
         * @return indices
         */
        UtilShapeSearch.toIndices = function (shapes) {
            var result = [];
            for (var i = 0, imax = shapes.length; i < imax; ++i) {
                result.push(shapes[i].index);
            }
            return result;
        };
        /**
         * Returns a depth of the given shape.
         *
         * @param shape a shape
         * @return a depth
         */
        UtilShapeSearch.toDepth = function (shape) {
            var result = 0;
            var parent = shape.parent;
            while (parent instanceof wcardinalUi.EShapeBase) {
                result += 1;
                parent = parent.parent;
            }
            return result;
        };
        /**
         * Returns a deepest shape on the path to the given shapes.
         *
         * @param shapeA a shape
         * @param shapeB a shape
         * @return a found shape
         */
        UtilShapeSearch.toSharedParent = function (shapeA, shapeB) {
            var depthA = this.toDepth(shapeA);
            var depthB = this.toDepth(shapeB);
            if (depthA < depthB) {
                var parent_1 = shapeA.parent;
                while (parent_1 instanceof wcardinalUi.EShapeBase) {
                    if (this.isParent(shapeB, parent_1)) {
                        return parent_1;
                    }
                    parent_1 = parent_1.parent;
                }
                return parent_1;
            }
            else {
                var parent_2 = shapeB.parent;
                while (parent_2 instanceof wcardinalUi.EShapeBase) {
                    if (this.isParent(shapeA, parent_2)) {
                        return parent_2;
                    }
                    parent_2 = parent_2.parent;
                }
                return parent_2;
            }
        };
        /**
         * Returns a shape on the path to the given shape whose parent is equals to the given parent.
         * If there is no such shape, returns a root shape on the path.
         *
         * @param shape a shape
         * @param parent a parent
         * @returns a found shape
         */
        UtilShapeSearch.toOfParent = function (shape, parent) {
            var shapeParent = shape.parent;
            while (shapeParent !== parent && shapeParent instanceof wcardinalUi.EShapeBase) {
                shape = shapeParent;
                shapeParent = shapeParent.parent;
            }
            return shape;
        };
        /**
         * Returns true if the given target is on the path to the given shape.
         *
         * @param shape a shape
         * @param target a check target
         * @return true if the given target is on the path to the given shape
         */
        UtilShapeSearch.isParent = function (shape, target) {
            var parent = shape.parent;
            while (parent instanceof wcardinalUi.EShapeBase) {
                if (parent === target) {
                    return true;
                }
                parent = parent.parent;
            }
            return false;
        };
        /**
         * Returns a selected shape on the path to the given shape.
         * If there are more than one selected shapes, returns a deepest selected shape.
         *
         * @param shape a shape
         * @return a found selected shape or null
         */
        UtilShapeSearch.toSelected = function (shape) {
            var target = shape;
            while (target instanceof wcardinalUi.EShapeBase) {
                if (target.selected) {
                    return target;
                }
                target = target.parent;
            }
            return null;
        };
        UtilShapeSearch.findChildById = function (shape, id, recursively) {
            var children = shape.children;
            for (var i = 0, imax = children.length; i < imax; ++i) {
                var child = children[i];
                if (child.id === id) {
                    return child;
                }
                if (recursively === true) {
                    var result = UtilShapeSearch.findChildById(child, id, recursively);
                    if (result != null) {
                        return result;
                    }
                }
            }
            return null;
        };
        UtilShapeSearch.findChildByType = function (shape, type, recursively) {
            var children = shape.children;
            for (var i = 0, imax = children.length; i < imax; ++i) {
                var child = children[i];
                if (child.type === type) {
                    return child;
                }
                if (recursively === true) {
                    var result = UtilShapeSearch.findChildByType(child, type, recursively);
                    if (result != null) {
                        return result;
                    }
                }
            }
            return null;
        };
        UtilShapeSearch.findChild = function (shape, matcher, recursively) {
            var children = shape.children;
            for (var i = 0, imax = children.length; i < imax; ++i) {
                var child = children[i];
                if (matcher(child)) {
                    return child;
                }
                if (recursively === true) {
                    var result = UtilShapeSearch.findChild(child, matcher, recursively);
                    if (result != null) {
                        return result;
                    }
                }
            }
            return null;
        };
        UtilShapeSearch.findChildrenByType = function (shape, type, recursively, result) {
            result = result || [];
            var children = shape.children;
            for (var i = 0, imax = children.length; i < imax; ++i) {
                var child = children[i];
                if (child.type === type) {
                    result.push(child);
                }
                if (recursively === true) {
                    UtilShapeSearch.findChildrenByType(child, type, recursively, result);
                }
            }
            return result;
        };
        UtilShapeSearch.findChildren = function (shape, matcher, recursively, result) {
            result = result || [];
            var children = shape.children;
            for (var i = 0, imax = children.length; i < imax; ++i) {
                var child = children[i];
                if (matcher(child)) {
                    result.push(child);
                }
                if (recursively === true) {
                    UtilShapeSearch.findChildren(child, matcher, recursively, result);
                }
            }
            return result;
        };
        UtilShapeSearch.COMPARATOR_INDEX = function (a, b) {
            return a.index - b.index;
        };
        return UtilShapeSearch;
    }());

    var EShapeTableRowSelectionType = {
        NONE: 0,
        SINGLE: 1,
        MULTIPLE: 2
    };
    /** @class */ ((function () {
        function EShapeTableRowSelection(parent) {
            this.parent = parent;
            this.type = EShapeTableRowSelectionType.NONE;
            this.indices = [];
            this.body = null;
        }
        Object.defineProperty(EShapeTableRowSelection.prototype, "values", {
            get: function () {
                var indices = this.indices;
                var values = this.parent.data.values;
                var result = (this._values = this._values || []);
                if (values != null) {
                    result.length = 0;
                    for (var i = 0, imax = indices.length; i < imax; ++i) {
                        var index = indices[i];
                        if (0 <= index && index < values.length) {
                            result.push(values[index]);
                        }
                    }
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        EShapeTableRowSelection.prototype.size = function () {
            return this.indices.length;
        };
        EShapeTableRowSelection.prototype.isEmpty = function () {
            return this.indices.length <= 0;
        };
        EShapeTableRowSelection.prototype.toggle = function (index) {
            var indices = this.indices;
            var indexIndex = indices.indexOf(index);
            if (indexIndex < 0) {
                indices.push(index);
                var body = this.getBody();
                if (body != null) {
                    this.setRowActive(body, index, true);
                }
            }
            else {
                indices.splice(indexIndex, 1);
                var body = this.getBody();
                if (body != null) {
                    this.setRowActive(body, index, false);
                }
            }
        };
        EShapeTableRowSelection.prototype.add = function (index) {
            var indices = this.indices;
            var indexIndex = indices.indexOf(index);
            if (indexIndex < 0) {
                indices.push(index);
                var body = this.getBody();
                if (body != null) {
                    this.setRowActive(body, index, true);
                }
            }
        };
        EShapeTableRowSelection.prototype.addTo = function (index) {
            var indices = this.indices;
            var lastIndex = indices[indices.length - 1];
            if (lastIndex < index) {
                var body = this.getBody();
                for (var i = lastIndex + 1; i <= index; ++i) {
                    if (indices.indexOf(i) < 0) {
                        indices.push(i);
                        if (body != null) {
                            this.setRowActive(body, i, true);
                        }
                    }
                }
            }
            else if (index < lastIndex) {
                var body = this.getBody();
                for (var i = lastIndex - 1; index <= i; --i) {
                    if (indices.indexOf(i) < 0) {
                        indices.push(i);
                        if (body != null) {
                            this.setRowActive(body, i, true);
                        }
                    }
                }
            }
        };
        EShapeTableRowSelection.prototype.remove = function (index) {
            var indices = this.indices;
            var indexIndex = indices.indexOf(index);
            if (0 <= indexIndex) {
                indices.splice(indexIndex, 1);
                var body = this.getBody();
                if (body != null) {
                    this.setRowActive(body, index, false);
                }
            }
        };
        EShapeTableRowSelection.prototype.clear = function () {
            var indices = this.indices;
            var body = this.getBody();
            if (body != null) {
                for (var i = 0, imax = indices.length; i < imax; ++i) {
                    this.setRowActive(body, indices[i], false);
                }
            }
            indices.length = 0;
        };
        EShapeTableRowSelection.prototype.clearAndAdd = function (index) {
            var indices = this.indices;
            var body = this.getBody();
            if (body != null) {
                for (var i = 0, imax = indices.length; i < imax; ++i) {
                    var target = indices[i];
                    if (target !== index) {
                        this.setRowActive(body, target, false);
                    }
                }
                this.setRowActive(body, index, true);
            }
            indices.length = 0;
            indices.push(index);
        };
        EShapeTableRowSelection.prototype.getBody = function () {
            var body = this.body;
            if (body != null) {
                return body;
            }
            return (this.body = UtilShapeSearch.findChildByType(this.parent, EShapeTableIds.BODY_ID));
        };
        EShapeTableRowSelection.prototype.getRow = function (body, index) {
            var rows = body.children;
            if (0 <= index && index < rows.length) {
                return rows[index];
            }
            return null;
        };
        EShapeTableRowSelection.prototype.setRowActive = function (body, index, isActive) {
            var row = this.getRow(body, index);
            if (row != null) {
                var cells = row.children;
                for (var i = 0, imax = cells.length; i < imax; ++i) {
                    cells[i].state.isActive = isActive;
                }
            }
        };
        EShapeTableRowSelection.prototype.serialize = function (manager) {
            return manager.addResource("[".concat(this.type, "]"));
        };
        EShapeTableRowSelection.prototype.deserialize = function (target, manager) {
            var resources = manager.resources;
            if (0 <= target && target < resources.length) {
                var parsed = manager.getExtension(target);
                if (parsed == null) {
                    parsed = JSON.parse(resources[target]);
                    manager.setExtension(target, parsed);
                }
                var type = parsed[0];
                if (this.type !== type) {
                    this.type = type;
                }
            }
        };
        return EShapeTableRowSelection;
    })());

    var ESubthemeDefaultJaJpEditorShapeTable = /** @class */ (function (_super) {
        __extends(ESubthemeDefaultJaJpEditorShapeTable, _super);
        function ESubthemeDefaultJaJpEditorShapeTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ESubthemeDefaultJaJpEditorShapeTable.prototype.getButtonNewTitle = function () {
            return "新規列の作成";
        };
        ESubthemeDefaultJaJpEditorShapeTable.prototype.getButtonDeleteTitle = function () {
            return "選択列の削除";
        };
        ESubthemeDefaultJaJpEditorShapeTable.prototype.getButtonBringForwardTitle = function () {
            return "選択列を前に移動";
        };
        ESubthemeDefaultJaJpEditorShapeTable.prototype.getButtonSendBackwardTitle = function () {
            return "選択列を後ろに移動";
        };
        ESubthemeDefaultJaJpEditorShapeTable.prototype.getInputRowHeightLabel = function () {
            return "行の高さ";
        };
        ESubthemeDefaultJaJpEditorShapeTable.prototype.getSelectRowSelectionTypeLabel = function () {
            return "行の選択方法";
        };
        ESubthemeDefaultJaJpEditorShapeTable.prototype.toSelectRowSelectionTypeLabel = function (type) {
            switch (type) {
                case EShapeTableRowSelectionType.NONE:
                    return "なし";
                case EShapeTableRowSelectionType.SINGLE:
                    return "シングル";
                case EShapeTableRowSelectionType.MULTIPLE:
                    return "マルチ";
            }
        };
        return ESubthemeDefaultJaJpEditorShapeTable;
    }(ESubthemeDefaultEditorShapeTable));

    var EShapeTableColumnValueType = {
        TEXT: 0,
        NUMBER: 1
    };

    var EThemeDefaultJaJpDialogShapeTableColumn = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogShapeTableColumn, _super);
        function EThemeDefaultJaJpDialogShapeTableColumn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.getSelectColumnValueTypeLabel = function () {
            return "種別";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.toSelectColumnValueTypeLabel = function (type) {
            switch (type) {
                case EShapeTableColumnValueType.NUMBER:
                    return "数値";
                default:
                    return "文字";
            }
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.getInputLabelLabel = function () {
            return "ラベル";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.newInputLabel = function () {
            return "ラベル";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.getInputWidthLabel = function () {
            return "横幅";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.getInputGetterLabel = function () {
            return "ゲッター";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.getInputSetterLabel = function () {
            return "セッター";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.getInputFormatLabel = function () {
            return "書式";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.getSelectTextAlignLabel = function () {
            return "文字寄せ";
        };
        EThemeDefaultJaJpDialogShapeTableColumn.prototype.toTextAlignLabel = function (align) {
            switch (align) {
                case wcardinalUi.EShapeTextAlignHorizontal.LEFT:
                    return "左寄せ";
                case wcardinalUi.EShapeTextAlignHorizontal.RIGHT:
                    return "右寄せ";
                default:
                    return "中央揃え";
            }
        };
        return EThemeDefaultJaJpDialogShapeTableColumn;
    }(EThemeDefaultDialogShapeTableColumn));

    var EThemeDefaultJaJpShapeTable = /** @class */ (function () {
        function EThemeDefaultJaJpShapeTable() {
        }
        EThemeDefaultJaJpShapeTable.prototype.getName = function () {
            return "テーブル";
        };
        EThemeDefaultJaJpShapeTable.prototype.getHeaderName = function () {
            return "テーブルヘッダー";
        };
        EThemeDefaultJaJpShapeTable.prototype.newHeaderLabel = function () {
            return "ラベル";
        };
        EThemeDefaultJaJpShapeTable.prototype.getBodyName = function () {
            return "テーブルボディー";
        };
        return EThemeDefaultJaJpShapeTable;
    }());

    var EThemeDefaultButtonAmbient = /** @class */ (function (_super) {
        __extends(EThemeDefaultButtonAmbient, _super);
        function EThemeDefaultButtonAmbient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultButtonAmbient.prototype.getWidth = function () {
            return this.getHeight();
        };
        return EThemeDefaultButtonAmbient;
    }(wcardinalUi.DThemes.getClass("DButtonAmbient")));

    var EThemeDefaultButtonCheck = /** @class */ (function (_super) {
        __extends(EThemeDefaultButtonCheck, _super);
        function EThemeDefaultButtonCheck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultButtonCheck.prototype.getImageTintColor = function (state) {
            if (state.inDisabled || !state.isActive) {
                return this.getColor(state);
            }
            else {
                return _super.prototype.getImageTintColor.call(this, state);
            }
        };
        EThemeDefaultButtonCheck.prototype.getWidth = function () {
            return this.getHeight();
        };
        return EThemeDefaultButtonCheck;
    }(wcardinalUi.DThemes.getClass("DButtonCheck")));

    /*!
     * Material Icons https://material.io/tools/icons/
     * Available under Apache license version 2.0
     */
    var iconBuilder = new wcardinalUi.UtilSvgAtlasBuilder({
        width: 1024,
        ratio: 80 / 3,
        mipmap: pixi_js.MIPMAP_MODES.OFF
    });
    iconBuilder.add("select", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M551-80 406-392 240-160v-720l560 440H516l144 309-109 51Z\"/>" +
        "</g>");
    iconBuilder.add("camera", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path fill=\"#fff\" d=\"M5.54 8.46L2 12l3.54 3.54 1.76-1.77L5.54 12l1.76-1.77zm6.46 10l-1.77-1.76-1.77 1.76L12 22l3.54-3.54-1.77-1.76zm6.46-10l-1.76 1.77L18.46 12l-1.76 1.77 1.76 1.77L22 12zm-10-2.92l1.77 1.76L12 5.54l1.77 1.76 1.77-1.76L12 2z\"/>" +
        "</g>");
    iconBuilder.add("new", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("open", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("save", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z\" fill=\"#Fff\" />" +
        "</g>");
    iconBuilder.add("save_as", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h12l4 4v5.4l-2 2V7.825L16.175 5H5v14h9.4l-2 2Zm7-3q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18Zm-6-8h9V6H6Zm9 13v-1.775l5-4.975 1.75 1.775L16.775 23Zm7.4-5.65-1.775-1.75.85-.85q.15-.15.362-.15.213 0 .363.15l1.05 1.05q.15.15.15.35 0 .2-.15.35ZM5 19V5v9.4Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("upload", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2z\" fill=\"#fff\" />" +
        "<path d=\"M19 12m-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z\" transform=\"translate(12,10) rotate(180) translate(-12,-10)\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("download", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("undo", 24, 24, "<g transform=\"scale(26.667,26.667) translate(+12,+12) rotate(-45) translate(-12,-12)\">" +
        "<path d=\"M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("redo", 24, 24, "<g transform=\"scale(26.667,26.667) translate(+12,+12) rotate(45) scale(-1,1) translate(-12,-12)\">" +
        "<path d=\"M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("delete", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_text", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M420-160v-520H200v-120h560v120H540v520H420Z\"/>" +
        "</g>");
    iconBuilder.add("editor_action", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("shape_rectangle", 19.2, 19.2, "<rect stroke=\"#fff\" stroke-width=\"53.333\" fill=\"none\" x=\"48\" y=\"48\" width=\"416\" height=\"416\"></rect>");
    iconBuilder.add("shape_rectangle_rounded", 19.2, 19.2, "<rect stroke=\"#fff\" stroke-width=\"53.333\" fill=\"none\" x=\"48\" y=\"48\" width=\"416\" height=\"416\" rx=\"125\" ry=\"125\"></rect>");
    iconBuilder.add("stroke_side_top", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"458.666\" fill=\"#fff\" fill-opacity=\"0.2\" stroke=\"none\"></rect>" +
        "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"53.333\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("stroke_side_right", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"458.666\" fill=\"#fff\" fill-opacity=\"0.2\" stroke=\"none\"></rect>" +
        "<rect x=\"432\" y=\"26.666\" width=\"53.333\" height=\"458.666\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("stroke_side_bottom", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"458.666\" fill=\"#fff\" fill-opacity=\"0.2\" stroke=\"none\"></rect>" +
        "<rect x=\"26.666\" y=\"432\" width=\"458.666\" height=\"53.333\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("stroke_side_left", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"458.666\" fill=\"#fff\" fill-opacity=\"0.2\" stroke=\"none\"></rect>" +
        "<rect x=\"26.666\" y=\"26.666\" width=\"53.333\" height=\"458.666\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("corner_top_left", 16.8, 19.2, "<path d=\"M16 464 v -208 a 208 208 0 0 1 208 -208 h 208 v 416 z\" stroke=\"none\" fill=\"#fff\" fill-opacity=\"0.2\"></path>" +
        "<path d=\"M16 464 v -208 a 208 208 0 0 1 208 -208 h 208\" stroke=\"#fff\" stroke-width=\"53.333\" fill=\"none\"></path>");
    iconBuilder.add("corner_top_right", 16.8, 19.2, "<path d=\"M16 48 h 208 a 208 208 0 0 1 208 208 v 208 h -416 z\" stroke=\"none\" fill=\"#fff\" fill-opacity=\"0.2\"></path>" +
        "<path d=\"M16 48 h 208 a 208 208 0 0 1 208 208 v 208\" stroke=\"#fff\" stroke-width=\"53.333\" fill=\"none\"></path>");
    iconBuilder.add("corner_bottom_left", 16.8, 19.2, "<path d=\"M16 48 v 208 a 208 208 0 0 0 208 208 h 208 v -416 z\" stroke=\"none\" fill=\"#fff\" fill-opacity=\"0.2\"></path>" +
        "<path d=\"M16 48 v 208 a 208 208 0 0 0 208 208 h 208\" stroke=\"#fff\" stroke-width=\"53.333\" fill=\"none\"></path>");
    iconBuilder.add("corner_bottom_right", 16.8, 19.2, "<path d=\"M16 464 h 208 a 208 208 0 0 0 208 -208 v -208 h -416 z\" stroke=\"none\" fill=\"#fff\" fill-opacity=\"0.2\"></path>" +
        "<path d=\"M16 464 h 208 a 208 208 0 0 0 208 -208 v -208\" stroke=\"#fff\" stroke-width=\"53.333\" fill=\"none\"></path>");
    iconBuilder.add("shape_circle", 19.2, 19.2, "<circle cx=\"256\" cy=\"256\" r=\"224\" stroke-width=\"48\" stroke=\"#fff\" fill=\"none\" />");
    iconBuilder.add("shape_semicircle", 19.2, 19.2, "<path d=\"M32 256 a196 196 0 0 1 448 0z\" stroke-width=\"48\" stroke=\"#fff\" fill=\"none\"></path>" +
        "<path d=\"M32 256 a196 196 0 0 0 448 0z\" stroke-width=\"48\" stroke=\"#fff\" stroke-opacity=\"0.5\" fill=\"none\"></path>");
    iconBuilder.add("shape_line", 19.2, 19.2, "<rect fill=\"#fff\" x=\"0\" y=\"-13.333\" width=\"640\" height=\"53.333\" transform=\"translate(26.666,56) rotate(40)\" rx=\"26.666\" ry=\"26.666\"></rect>");
    iconBuilder.add("shape_line_connector", 24, 24, "<g transform=\"scale(26.667,26.667) translate(+12, +12) rotate(-40) translate(-12, -12)\">" +
        "<rect x=\"4\" y=\"11\" width=\"16\" height=\"2\" fill=\"#fff\"></rect>" +
        "<circle cx=\"1\" cy=\"12\" r=\"2\" stroke=\"#fff\" stroke-width=\"2\" fill=\"none\"></circle>" +
        "<polygon points=\"20,10 20,14 24,12\" stroke=\"#fff\" stroke-width=\"2\" fill=\"none\" />" +
        "</g>");
    iconBuilder.add("shape_elbow_connector", 24, 24, "<g transform=\"scale(26.667,26.667) translate(+12, +12) rotate(-40) translate(-12, -12)\">" +
        "<rect x=\"5\" y=\"8\" width=\"7\" height=\"2\" fill=\"#fff\"></rect>" +
        "<rect x=\"11\" y=\"8\" width=\"2\" height=\"8\" fill=\"#fff\"></rect>" +
        "<rect x=\"12\" y=\"14\" width=\"7\" height=\"2\" fill=\"#fff\"></rect>" +
        "<circle cx=\"3\" cy=\"9\" r=\"2\" stroke=\"#fff\" stroke-width=\"2\" fill=\"none\"></circle>" +
        "<polygon points=\"19,13 19,17 23,15\" stroke=\"#fff\" stroke-width=\"2\" fill=\"none\" />" +
        "</g>");
    iconBuilder.add("shape_triangle", 19.2, 19.2, "<path d=\"M 0 -1 L +1 +1 L -1 +1 Z\" transform=\"translate(+256,+256) scale(229.333, 229.3335)\" fill=\"none\" stroke=\"#fff\" stroke-width=\"0.23255651703741495\"></path>");
    iconBuilder.add("shape_triangle_rounded", 19.2, 19.2, "<path d=\"" +
        "M -0.2857142857142857 -0.7142857142857142 " +
        "Q 0 -1.2857142857142856 0.2857142857142857, -0.7142857142857142 " +
        "L +0.8571428571428571, 0.42857142857142855 " +
        "Q 1.1428571428571428 1 0.5714285714285714, 1 " +
        "L -0.5714285714285714, 1 " +
        "Q -1.1428571428571428, 1 -0.8571428571428571, 0.42857142857142855 Z\" " +
        "transform=\"translate(+256,+256) scale(229.333, 229.3335)\" " +
        "fill=\"none\" stroke=\"#fff\" stroke-width=\"0.23255651703741495\"></path>");
    iconBuilder.add("shape_group", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M80-160v-640h320l80 80h400v560H80Zm80-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-80h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80Z\"/>" +
        "</g>");
    iconBuilder.add("shape_ungroup", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M80-160v-640h320l80 80h400v560H80Zm80-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm320-160h240v-80h-240Z\"/>" +
        "</g>");
    iconBuilder.add("editor_image", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z\"/>" +
        "</g>");
    iconBuilder.add("editor_coordinate", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z\"/>" +
        "</g>");
    iconBuilder.add("editor_shape", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z\"/>" +
        "</g>");
    iconBuilder.add("editor_data", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z\"/>" +
        "</g>");
    iconBuilder.add("editor_data_mapping", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M220-80q-58 0-99-41t-41-99q0-58 41-99t99-41q18 0 35 4.5t32 12.5l153-153v-110q-44-13-72-49.5T340-740q0-58 41-99t99-41q58 0 99 41t41 99q0 48-28 84.5T520-606v110l154 153q15-8 31.5-12.5T740-360q58 0 99 41t41 99q0 58-41 99t-99 41q-58 0-99-41t-41-99q0-18 4.5-35t12.5-32L480-424 343-287q8 15 12.5 32t4.5 35q0 58-41 99t-99 41Zm520-80q25 0 42.5-17.5T800-220q0-25-17.5-42.5T740-280q-25 0-42.5 17.5T680-220q0 25 17.5 42.5T740-160ZM480-680q25 0 42.5-17.5T540-740q0-25-17.5-42.5T480-800q-25 0-42.5 17.5T420-740q0 25 17.5 42.5T480-680ZM220-160q25 0 42.5-17.5T280-220q0-25-17.5-42.5T220-280q-25 0-42.5 17.5T160-220q0 25 17.5 42.5T220-160Z\"/>" +
        "</g>");
    iconBuilder.add("text_align_left", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z\"/>" +
        "</g>");
    iconBuilder.add("text_align_center", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z\"/>" +
        "</g>");
    iconBuilder.add("text_align_right", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z\"/>" +
        "</g>");
    iconBuilder.add("text_align_outside_left", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z\" transform=\"translate(-160,0)\"/>" +
        "<rect x=\"800\" y=\"-880\" width=\"80\" height=\"800\"></rect>" +
        "</g>");
    iconBuilder.add("text_align_outside_right", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z\" transform=\"translate(160,0)\"/>" +
        "<rect x=\"80\" y=\"-880\" width=\"80\" height=\"800\"></rect>" +
        "</g>");
    iconBuilder.add("text_align_top", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"458.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"53.333\"></rect>" +
        "<rect x=\"106.666\" y=\"106.666\" width=\"298.666\" height=\"53.333\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("text_align_middle", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"458.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"53.333\"></rect>" +
        "<rect x=\"106.666\" y=\"229.333\" width=\"298.666\" height=\"53.333\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("text_align_bottom", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"458.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"53.333\"></rect>" +
        "<rect x=\"106.666\" y=\"352\" width=\"298.666\" height=\"53.333\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("text_align_outside_top", 19.2, 19.2, "<rect x=\"26.666\" y=\"133.333\" width=\"458.666\" height=\"352\" fill=\"none\" stroke=\"#fff\" stroke-width=\"53.333\"></rect>" +
        "<rect x=\"0\" y=\"0\" width=\"512\" height=\"53.333\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("text_align_outside_bottom", 19.2, 19.2, "<rect x=\"26.666\" y=\"26.666\" width=\"458.666\" height=\"352\" fill=\"none\" stroke=\"#fff\" stroke-width=\"53.333\"></rect>" +
        "<rect x=\"0\" y=\"458.666\" width=\"512\" height=\"53.333\" fill=\"#fff\" stroke=\"none\"></rect>");
    iconBuilder.add("text_direction_left_to_right", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M12.75 3h-1.5L6.5 14h2.1l.9-2.2h5l.9 2.2h2.1L12.75 3zm-2.62 7L12 4.98 13.87 10h-3.74zm10.37 8l-3-3v2H5v2h12.5v2l3-3z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("text_direction_top_to_bottom", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M21 12v-1.5L10 5.75v2.1l2.2.9v5l-2.2.9v2.1L21 12zm-7-2.62l5.02 1.87L14 13.12V9.38zM6 19.75l3-3H7V4.25H5v12.5H3l3 3z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("text_direction_bottom_to_top", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M3 12v1.5l11 4.75v-2.1l-2.2-.9v-5l2.2-.9v-2.1L3 12zm7 2.62l-5.02-1.87L10 10.88v3.74zm8-10.37l-3 3h2v12.5h2V7.25h2l-3-3z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("text_direction_right_to_left", 24, 24, "<g transform=\"scale(26.667,26.667) translate(12,12) rotate(180) translate(-12,-12)\">" +
        "<path d=\"M12.75 3h-1.5L6.5 14h2.1l.9-2.2h5l.9 2.2h2.1L12.75 3zm-2.62 7L12 4.98 13.87 10h-3.74zm10.37 8l-3-3v2H5v2h12.5v2l3-3z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_tree", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M22,11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3H22z M7,9H4V5h3V9z M17,15h3v4h-3V15z M17,5h3v4h-3V5z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("editor_layer", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("eye_slash", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z\"/>" +
        "</g>");
    iconBuilder.add("eye", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z\"/>" +
        "</g>");
    iconBuilder.add("editor_coordinate_align_right", 19.2, 19.2, "<rect x=\"476.444\" y=\"0\" width=\"35.555\" height=\"512\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect x=\"192\" y=\"80\" width=\"186.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect x=\"32\" y=\"309.333\" width=\"346.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_align_left", 19.2, 19.2, "<rect x=\"0\" y=\"0\" width=\"35.555\" height=\"512\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect x=\"133.333\" y=\"80\" width=\"186.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect x=\"133.333\" y=\"309.333\" width=\"346.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_align_center", 19.2, 19.2, "<rect x=\"238.222\" y=\"0\" width=\"35.555\" height=\"80\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect x=\"238.222\" y=\"202.666\" width=\"35.555\" height=\"106.666\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect x=\"238.222\" y=\"432\" width=\"35.555\" height=\"80\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect x=\"162.666\" y=\"80\" width=\"186.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect x=\"82.666\" y=\"309.333\" width=\"346.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_distribute_horizontally", 19.2, 19.2, "<rect x=\"238.222\" y=\"0\" width=\"35.555\" height=\"512\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect y=\"162.666\" x=\"26.666\" height=\"186.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect y=\"82.666\" x=\"362.666\" height=\"346.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_align_bottom", 19.2, 19.2, "<rect y=\"476.444\" x=\"0\" height=\"35.555\" width=\"512\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect y=\"192\" x=\"80\" height=\"186.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect y=\"32\" x=\"309.333\" height=\"346.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_align_top", 19.2, 19.2, "<rect y=\"0\" x=\"0\" height=\"35.555\" width=\"512\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect y=\"133.333\" x=\"80\" height=\"186.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect y=\"133.333\" x=\"309.333\" height=\"346.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_align_middle", 19.2, 19.2, "<rect y=\"238.222\" x=\"0\" height=\"35.555\" width=\"80\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect y=\"229.333\" x=\"202.666\" height=\"35.555\" width=\"106.666\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect y=\"229.333\" x=\"432\" height=\"35.555\" width=\"80\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect y=\"162.666\" x=\"80\" height=\"186.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect y=\"82.666\" x=\"309.333\" height=\"346.666\" width=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_distribute_vertically", 19.2, 19.2, "<rect y=\"238.222\" x=\"0\" height=\"35.555\" width=\"512\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<rect x=\"162.666\" y=\"26.666\" width=\"186.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>" +
        "<rect x=\"82.666\" y=\"362.666\" width=\"346.666\" height=\"122.666\" fill=\"none\" stroke=\"#fff\" stroke-width=\"35.555\"></rect>");
    iconBuilder.add("editor_coordinate_rotate_left", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M11 22q-1.25-.125-2.4-.613Q7.45 20.9 6.4 20.1l1.4-1.45q.725.525 1.538.85.812.325 1.662.45Zm2 0v-2.05q2.6-.375" +
        " 4.3-2.337Q19 15.65 19 13.05q0-2.925-2.038-4.962Q14.925 6.05 12 6.05h-.2l1.6 1.6-1.4 1.4-4-4 4-4 1.4 1.45-1.55 1.55H12" +
        "q1.875 0 3.513.712 1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 11.175 21 13.05q0 3.425-2.275 5.963Q16.45 21.55 13 2" +
        "2Zm-8.05-3.35q-.8-1.05-1.287-2.2-.488-1.15-.613-2.4H5.1q.125.85.45 1.662.325.813.85 1.538Zm-1.9-6.6q.15-1.275.625-2.45" +
        ".475-1.175 1.275-2.15l1.45 1.4q-.525.725-.85 1.537-.325.813-.45 1.663Z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_coordinate_rotate_right", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M13.05 22v-2.05q.85-.125 1.663-.45.812-.325 1.537-.85l1.4 1.45q-1.05.8-2.2 1.287-1.15.488-2.4.613Zm-2 0q-3.45-" +
        ".45-5.725-2.987Q3.05 16.475 3.05 13.05q0-1.875.713-3.513.712-1.637 1.925-2.85Q6.9 5.475 8.538 4.762q1.637-.712 3.512-.7" +
        "12h.15L10.65 2.5l1.4-1.45 4 4-4 4-1.4-1.4 1.6-1.6h-.2q-2.925 0-4.962 2.038Q5.05 10.125 5.05 13.05q0 2.6 1.7 4.563 1.7 1" +
        ".962 4.3 2.337Zm8.05-3.35-1.45-1.4q.525-.725.85-1.538.325-.812.45-1.662H21q-.125 1.25-.612 2.4-.488 1.15-1.288 2.2Zm1.9" +
        "-6.6h-2.05q-.125-.85-.45-1.663-.325-.812-.85-1.537l1.45-1.4q.8.975 1.275 2.15.475 1.175.625 2.45Z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_snap", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2" +
        "v4h2V8h2v4h2V8h2v8z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_canvas", 24, 24, "<g transform=\"translate(80,80) scale(0.75,0.75) scale(0.667,0.667) translate(0, -96)\">" +
        "<path d=\"m405.384 936-14.461-115.692q-19.154-5.769-41.423-18.154-22.269-12.385-37.885-26.538L204.923 821l-74.616-130 92.231-69.539q-1.769-10.846-2.923-22.346-1.154-11.5-1.154-22.346 0-10.077 1.154-21.192t2.923-25.038L130.307 461l74.616-128.462 105.923 44.616q17.923-14.923 38.769-26.923 20.846-12 40.539-18.539L405.384 216h149.232l14.461 116.461q23 8.077 40.654 18.539 17.654 10.461 36.346 26.154l109-44.616L829.693 461l-95.308 71.846q3.308 12.385 3.692 22.731.385 10.346.385 20.423 0 9.308-.769 19.654-.77 10.346-3.539 25.038L827.923 691l-74.615 130-107.231-46.154q-18.692 15.693-37.615 26.923-18.923 11.231-39.385 17.77L554.616 936H405.384Zm73.539-260q41.846 0 70.923-29.077 29.077-29.077 29.077-70.923 0-41.846-29.077-70.923Q520.769 476 478.923 476q-42.077 0-71.039 29.077-28.961 29.077-28.961 70.923 0 41.846 28.961 70.923Q436.846 676 478.923 676Zm0-40q-25 0-42.5-17.5t-17.5-42.5q0-25 17.5-42.5t42.5-17.5q25 0 42.5 17.5t17.5 42.5q0 25-17.5 42.5t-42.5 17.5ZM480 576Zm-40 320h78.231L533 787.692q30.231-8 54.423-21.961 24.192-13.962 49.269-38.269L736.462 770l39.769-68-87.539-65.769q5-17.077 6.616-31.423 1.615-14.346 1.615-28.808 0-15.231-1.615-28.808-1.616-13.577-6.616-29.884L777.769 450 738 382l-102.077 42.769q-18.154-19.923-47.731-37.346t-55.961-23.115L520 256h-79.769l-12.462 107.538q-30.231 6.462-55.577 20.808-25.346 14.346-50.423 39.423L222 382l-39.769 68L269 514.769q-5 13.462-7 29.231-2 15.769-2 32.769Q260 592 262 607q2 15 6.231 29.231l-86 65.769L222 770l99-42q23.538 23.769 48.885 38.115 25.346 14.347 57.115 22.347L440 896Z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_canvas_legacy", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 " +
        "0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("arrow_to_top", 24, 24, "<g transform=\"scale(26.667,26.667) translate(0,+1)\">" +
        "<rect x=\"4\" y=\"4\" width=\"16\" height=\"2\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("arrow_up", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("arrow_down", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("arrow_to_bottom", 24, 24, "<g transform=\"scale(26.667,26.667) translate(0,-1)\">" +
        "<rect x=\"4\" y=\"18\" width=\"16\" height=\"2\" fill=\"#fff\" stroke=\"none\"></rect>" +
        "<path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("bold", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z\"/>" +
        "</g>");
    iconBuilder.add("italic", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z\"/>" +
        "</g>");
    iconBuilder.add("view_reset", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z\"/>" +
        "</g>");
    iconBuilder.add("view_zoom_in", 19.2, 19.2, "<rect x=\"229.333\" y=\"53.333\" width=\"53.333\" height=\"405.333\" stroke=\"none\" fill=\"#fff\"></rect>" +
        "<rect y=\"229.333\" x=\"53.333\" height=\"53.333\" width=\"405.333\" stroke=\"none\" fill=\"#fff\"></rect>");
    iconBuilder.add("view_zoom_out", 19.2, 19.2, "<rect y=\"229.333\" x=\"53.333\" height=\"53.333\" width=\"405.333\" stroke=\"none\" fill=\"#fff\"></rect>");
    iconBuilder.add("view_fit", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\" fill=\"#fff\">" +
        "<path d=\"M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z\"/>" +
        "</g>");
    iconBuilder.add("refresh", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("menu", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("go_down", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("go_up", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("home", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("account", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28" +
        "c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93" +
        "-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4" +
        " 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 " +
        "3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12" +
        " 8s1.5.67 1.5 1.5S12.83 11 12 11z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("component", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M3 5v14h19V5H3zm2 2h15v4H5V7zm0 10v-4h4v4H5zm6 0v-4h9v4h-9z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("more", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("graphic_piece", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M10.5 4.5c.28 0 .5.22.5.5v2h6v6h2c.28 0 .5.22.5.5s-.22.5-.5.5h-2v6h-2.12c-.68-1.75" +
        "-2.39-3-4.38-3s-3.7 1.25-4.38 3H4v-2.12c1.75-.68 3-2.39 3-4.38 0-1.99-1.24-3.7-2.99-4.38L4 " +
        "7h6V5c0-.28.22-.5.5-.5m0-2C9.12 2.5 8 3.62 8 5H4c-1.1 0-1.99.9-1.99 2v3.8h.29c1.49 0 2.7 " +
        "1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-.3c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21" +
        " 2.7 2.7v.3H17c1.1 0 2-.9 2-2v-4c1.38 0 2.5-1.12 2.5-2.5S20.38 11 19 11V7c0-1.1-.9-2-2-2h-" +
        "4c0-1.38-1.12-2.5-2.5-2.5z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("close_mark", 24, 24, "<g transform=\"scale(13.333,13.333) translate(12,12)\">" +
        "<path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_chart", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_font_size_decrease", 24, 24, "<g transform=\"translate(24, 24) scale(24,24)\">" +
        "<path d=\"M1 19 6.25 5h2.5L14 19h-2.4l-1.275-3.575h-5.65L3.4 19Zm4.4-5.6h4.2L7.55 7.6h-.1ZM15 13v-2h8v2Z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_font_size_increase", 24, 24, "<g transform=\"translate(24, 24) scale(24,24)\">" +
        "<path d=\"M1 19 6.25 5h2.5L14 19h-2.4l-1.275-3.575h-5.65L3.4 19Zm4.4-5.6h4.2L7.55 7.6h-.1ZM18 16v-3h-3v-2h3V8h2v3h3v2h-3v3Z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("editor_validation", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2q1.625 0 3.075.475 1.45.475 2.675 1.325L16.3 5.275q-.95-.6-2.025-.938Q13.2 4 12 4 8.675 4 6.338 6.337 4 8.675 4 12t2.338 5.663Q8.675 20 12 20q3.325 0 5.663-2.337Q20 15.325 20 12q0-.45-.05-.9t-.15-.875L21.425 8.6q.275.8.425 1.65.15.85.15 1.75 0 2.075-.788 3.9-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm-1.4-5.4-4.25-4.25 1.4-1.4 2.85 2.85 10-10.025 1.4 1.4Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("editor_search", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 " +
        "9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 " +
        "14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("lock_close", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6ZM6 20V10v10Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("lock_open", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"M240-160h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Zm0 80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h280v-80q0-83 58.5-141.5T720-920q83 0 141.5 58.5T920-720h-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80h120q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("action_keyword", 24, 24, "<g transform=\"scale(26.667,26.667)\">" +
        "<path d=\"M6.5 16q1.175 0 2.288.262 1.112.263 2.212.788V7.2q-1.025-.6-2.175-.9Q7.675 6 6.5 6q-.9 0-1.787.175Q3.825 6.35 3 6.7v9.9q.875-.3 1.738-.45Q5.6 16 6.5 16Zm6.5 1.05q1.1-.525 2.213-.788Q16.325 16 17.5 16q.9 0 1.763.15.862.15 1.737.45V6.7q-.825-.35-1.712-.525Q18.4 6 17.5 6q-1.175 0-2.325.3-1.15.3-2.175.9ZM12 20q-1.2-.95-2.6-1.475Q8 18 6.5 18q-1.05 0-2.062.275-1.013.275-1.938.775-.525.275-1.012-.025Q1 18.725 1 18.15V6.1q0-.275.138-.525.137-.25.412-.375 1.15-.6 2.4-.9Q5.2 4 6.5 4q1.45 0 2.838.375Q10.725 4.75 12 5.5q1.275-.75 2.663-1.125Q16.05 4 17.5 4q1.3 0 2.55.3 1.25.3 2.4.9.275.125.413.375.137.25.137.525v12.05q0 .575-.487.875-.488.3-1.013.025-.925-.5-1.938-.775Q18.55 18 17.5 18q-1.5 0-2.9.525T12 20Zm-5-8.35Z\" fill=\"#fff\" />" +
        "</g>");
    iconBuilder.add("texture_gradient", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"M440-440v-80h80v80h-80Zm-80 80v-80h80v80h-80Zm160 0v-80h80v80h-80Zm80-80v-80h80v80h-80Zm-320 0v-80h80v80h-80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm80-80h80v-80h-80v80Zm160 0h80v-80h-80v80Zm320 0v-80 80Zm-560-80h80v-80h80v80h80v-80h80v80h80v-80h80v80h80v-80h-80v-80h80v-320H200v320h80v80h-80v80Zm0 80v-560 560Zm560-240v80-80ZM600-280v80h80v-80h-80Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("texture_fit_to", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"M800-600v-120H680v-80h120q33 0 56.5 23.5T880-720v120h-80Zm-720 0v-120q0-33 23.5-56.5T160-800h120v80H160v120H80Zm600 440v-80h120v-120h80v120q0 33-23.5 56.5T800-160H680Zm-520 0q-33 0-56.5-23.5T80-240v-120h80v120h120v80H160Zm80-160v-320h480v320H240Zm80-80h320v-160H320v160Zm0 0v-160 160Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("texture_clear", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"m840-234-80-80v-446H314l-80-80h526q33 0 56.5 23.5T840-760v526ZM792-56l-64-64H200q-33 0-56.5-23.5T120-200v-528l-64-64 56-56 736 736-56 56ZM240-280l120-160 90 120 33-44-283-283v447h447l-80-80H240Zm297-257ZM424-424Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("stroke_expandable", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"M229-229q-29-29-29-71t29-71l360-360q29-29 71-29t71 29q29 29 29 71t-29 71L371-229q-29 29-71 29t-71-29Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("stroke_shrinkable", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"M212-212q-11-11-11-28t11-28l480-480q11-12 27.5-12t28.5 12q11 11 11 28t-11 28L268-212q-11 11-28 11t-28-11Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("stroke_scalable_dot_dash", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"M120-160v-80h80v80h-80Zm0-160v-80h200v80H120Zm0-160v-80h320v80H120Zm0-160v-160h720v160H120Zm160 480v-80h80v80h-80Zm100-160v-80h200v80H380Zm60 160v-80h80v80h-80Zm80-320v-80h320v80H520Zm80 320v-80h80v80h-80Zm40-160v-80h200v80H640Zm120 160v-80h80v80h-80Z\" fill=\"#fff\"/>" +
        "</g>");
    iconBuilder.add("line_closed", 24, 24, "<g transform=\"scale(0.667,0.667) translate(0, 960)\">" +
        "<path d=\"m360-120-57-56 64-64h-7q-117 0-198.5-81.5T80-520q0-117 81.5-198.5T360-800h240q117 0 198.5 81.5T880-520q0 117-81.5 198.5T600-240v-80q83 0 141.5-58.5T800-520q0-83-58.5-141.5T600-720H360q-83 0-141.5 58.5T160-520q0 83 58.5 141.5T360-320l16 8-72-72 56-56 160 160-160 160Z\" fill=\"#fff\"/>" +
        "</g>");

    var EThemeDefaultButtonLock = /** @class */ (function (_super) {
        __extends(EThemeDefaultButtonLock, _super);
        function EThemeDefaultButtonLock() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultButtonLock.prototype.getImageSource = function (state) {
            if (state.isActive) {
                return iconBuilder.mappings.lock_close;
            }
            else {
                return iconBuilder.mappings.lock_open;
            }
        };
        return EThemeDefaultButtonLock;
    }(EThemeDefaultButtonCheck));

    var EThemeDefaultButtonToolLayout = /** @class */ (function (_super) {
        __extends(EThemeDefaultButtonToolLayout, _super);
        function EThemeDefaultButtonToolLayout() {
            var _this = _super.call(this) || this;
            _this._dialog = wcardinalUi.DThemes.get("DDialog");
            return _this;
        }
        EThemeDefaultButtonToolLayout.prototype.getX = function () {
            return 8;
        };
        EThemeDefaultButtonToolLayout.prototype.getY = function () {
            return 8;
        };
        EThemeDefaultButtonToolLayout.prototype.getWidth = function () {
            return "auto";
        };
        EThemeDefaultButtonToolLayout.prototype.getHeight = function () {
            return "auto";
        };
        EThemeDefaultButtonToolLayout.prototype.getMultiplicity = function () {
            return 2;
        };
        EThemeDefaultButtonToolLayout.prototype.getMargin = function () {
            return 5;
        };
        EThemeDefaultButtonToolLayout.prototype.getPaddingTop = function () {
            return 4;
        };
        EThemeDefaultButtonToolLayout.prototype.getPaddingRight = function () {
            return 4;
        };
        EThemeDefaultButtonToolLayout.prototype.getPaddingBottom = function () {
            return 4;
        };
        EThemeDefaultButtonToolLayout.prototype.getPaddingLeft = function () {
            return 4;
        };
        EThemeDefaultButtonToolLayout.prototype.getBackgroundColor = function (state) {
            return this._dialog.getBackgroundColor(state);
        };
        EThemeDefaultButtonToolLayout.prototype.getBorderColor = function (state) {
            return this._dialog.getBorderColor(state);
        };
        EThemeDefaultButtonToolLayout.prototype.getBorderAlign = function () {
            return 0;
        };
        EThemeDefaultButtonToolLayout.prototype.getShadow = function () {
            return this.newShadowWeak();
        };
        return EThemeDefaultButtonToolLayout;
    }(wcardinalUi.DThemes.getClass("DLayoutVertical")));

    var EThemeDefaultDialogAction = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogAction, _super);
        function EThemeDefaultDialogAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultDialogAction.prototype.newKeyword = function (keyword, type, description) {
            return {
                keyword: keyword,
                type: type,
                description: description
            };
        };
        return EThemeDefaultDialogAction;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var EThemeDefaultDialogCanvas = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogCanvas, _super);
        function EThemeDefaultDialogCanvas() {
            var _this = _super.call(this) || this;
            _this._editorCanvas = wcardinalUi.DThemes.get("EEditorCanvas");
            return _this;
        }
        EThemeDefaultDialogCanvas.prototype.getInputNameLabel = function () {
            return this._editorCanvas.getInputNameLabel();
        };
        EThemeDefaultDialogCanvas.prototype.getInputLabelLabel = function () {
            return this._editorCanvas.getInputLabelLabel();
        };
        EThemeDefaultDialogCanvas.prototype.getInputWidthLabel = function () {
            return this._editorCanvas.getInputWidthLabel();
        };
        EThemeDefaultDialogCanvas.prototype.getInputHeightLabel = function () {
            return this._editorCanvas.getInputHeightLabel();
        };
        EThemeDefaultDialogCanvas.prototype.getSelectCategoryLabel = function () {
            return this._editorCanvas.getSelectCategoryLabel();
        };
        EThemeDefaultDialogCanvas.prototype.getInputSummaryLabel = function () {
            return this._editorCanvas.getInputSummaryLabel();
        };
        EThemeDefaultDialogCanvas.prototype.getInputDescriptionLabel = function () {
            return this._editorCanvas.getInputDescriptionLabel();
        };
        EThemeDefaultDialogCanvas.prototype.getInputBackgroundLabel = function () {
            return this._editorCanvas.getInputBackgroundLabel();
        };
        return EThemeDefaultDialogCanvas;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var EThemeDefaultDialogDataMappingValue = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogDataMappingValue, _super);
        function EThemeDefaultDialogDataMappingValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultDialogDataMappingValue;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var EThemeDefaultDialogDataValue = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogDataValue, _super);
        function EThemeDefaultDialogDataValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultDialogDataValue;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var EThemeDefaultDialogLayer = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogLayer, _super);
        function EThemeDefaultDialogLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultDialogLayer;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var EThemeDefaultDialogSnap = /** @class */ (function (_super) {
        __extends(EThemeDefaultDialogSnap, _super);
        function EThemeDefaultDialogSnap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultDialogSnap;
    }(wcardinalUi.DThemes.getClass("DDialogLayered")));

    var EEDITOR_BUTTON_COUNT = 7;

    var EThemeDefaultEditor = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditor, _super);
        function EThemeDefaultEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultEditor.prototype.getWidth = function () {
            return (this.getPaddingLeft() +
                30 * EEDITOR_BUTTON_COUNT +
                5 * (EEDITOR_BUTTON_COUNT - 1) +
                this.getPaddingRight());
        };
        EThemeDefaultEditor.prototype.getHeight = function () {
            return "100%";
        };
        EThemeDefaultEditor.prototype.getPaddingTop = function () {
            return 8;
        };
        EThemeDefaultEditor.prototype.getPaddingRight = function () {
            return 8;
        };
        EThemeDefaultEditor.prototype.getPaddingBottom = function () {
            return 8;
        };
        EThemeDefaultEditor.prototype.getPaddingLeft = function () {
            return 8;
        };
        EThemeDefaultEditor.prototype.getBackgroundColor = function () {
            return null;
        };
        EThemeDefaultEditor.prototype.getBorderColor = function () {
            return null;
        };
        return EThemeDefaultEditor;
    }(wcardinalUi.DThemes.getClass("DLayoutVertical")));

    var EThemeDefaultEditorAction = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorAction, _super);
        function EThemeDefaultEditorAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultEditorAction;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorPane = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorPane, _super);
        function EThemeDefaultEditorPane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultEditorPane.prototype.getWidth = function () {
            return 30 * EEDITOR_BUTTON_COUNT + 5 * (EEDITOR_BUTTON_COUNT - 1) + 16;
        };
        EThemeDefaultEditorPane.prototype.getHeight = function () {
            return "100%";
        };
        EThemeDefaultEditorPane.prototype.getPaddingTop = function () {
            return 0;
        };
        EThemeDefaultEditorPane.prototype.getPaddingRight = function () {
            return 0;
        };
        EThemeDefaultEditorPane.prototype.getPaddingBottom = function () {
            return 0;
        };
        EThemeDefaultEditorPane.prototype.getPaddingLeft = function () {
            return 0;
        };
        EThemeDefaultEditorPane.prototype.getBackgroundColor = function () {
            return null;
        };
        EThemeDefaultEditorPane.prototype.getBorderColor = function () {
            return null;
        };
        return EThemeDefaultEditorPane;
    }(wcardinalUi.DThemes.getClass("DPane")));

    var EThemeDefaultEditorCanvasLegacy = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorCanvasLegacy, _super);
        function EThemeDefaultEditorCanvasLegacy() {
            var _this = _super.call(this) || this;
            _this._editorCanvas = wcardinalUi.DThemes.get("EEditorCanvas");
            return _this;
        }
        EThemeDefaultEditorCanvasLegacy.prototype.getLabel = function () {
            return this._editorCanvas.getLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getInputNameLabel = function () {
            return this._editorCanvas.getInputNameLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getInputLabelLabel = function () {
            return this._editorCanvas.getInputLabelLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getInputWidthLabel = function () {
            return this._editorCanvas.getInputWidthLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getInputHeightLabel = function () {
            return this._editorCanvas.getInputHeightLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getSelectCategoryLabel = function () {
            return this._editorCanvas.getSelectCategoryLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getInputBackgroundLabel = function () {
            return this._editorCanvas.getInputBackgroundLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getInputSummaryLabel = function () {
            return this._editorCanvas.getInputSummaryLabel();
        };
        EThemeDefaultEditorCanvasLegacy.prototype.getInputDescriptionLabel = function () {
            return this._editorCanvas.getInputDescriptionLabel();
        };
        return EThemeDefaultEditorCanvasLegacy;
    }(EThemeDefaultEditorPane));

    var EThemeDefaultEditorCanvas = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorCanvas, _super);
        function EThemeDefaultEditorCanvas() {
            var _this = _super.call(this) || this;
            _this._diagramEditorTheme = wcardinalUi.DThemes.get("DDiagramEditor");
            return _this;
        }
        EThemeDefaultEditorCanvas.prototype.getDefaultLabel = function () {
            return "";
        };
        EThemeDefaultEditorCanvas.prototype.getDefaultWidth = function () {
            return 500;
        };
        EThemeDefaultEditorCanvas.prototype.getDefaultHeight = function () {
            return 500;
        };
        EThemeDefaultEditorCanvas.prototype.getDefaultCategory = function () {
            return null;
        };
        EThemeDefaultEditorCanvas.prototype.getDefaultSummary = function () {
            return "";
        };
        EThemeDefaultEditorCanvas.prototype.getDefaultDescription = function () {
            return "";
        };
        EThemeDefaultEditorCanvas.prototype.getDefaultBackgroundColor = function () {
            return this._diagramEditorTheme.getCanvasBackgroundColor();
        };
        EThemeDefaultEditorCanvas.prototype.getDefaultBackgroundAlpha = function () {
            return this._diagramEditorTheme.getCanvasBackgroundAlpha();
        };
        EThemeDefaultEditorCanvas.prototype.toCategoryId = function (category) {
            if (category != null) {
                if (wcardinalUi.isString(category)) {
                    return category;
                }
                else if (wcardinalUi.isNumber(category)) {
                    return String(category);
                }
                else if ("id" in category) {
                    var id = category.id;
                    if (wcardinalUi.isString(id)) {
                        return id;
                    }
                    return String(id);
                }
                else if ("name" in category) {
                    var name_1 = category.name;
                    if (wcardinalUi.isString(name_1)) {
                        return name_1;
                    }
                    return String(name_1);
                }
                else if ("label" in category) {
                    var label = category.label;
                    if (wcardinalUi.isString(label)) {
                        return label;
                    }
                    return String(label);
                }
            }
            return "";
        };
        EThemeDefaultEditorCanvas.prototype.toCategoryLabel = function (category) {
            return wcardinalUi.toLabel(category);
        };
        EThemeDefaultEditorCanvas.prototype.isCategoryWritable = function () {
            return true;
        };
        return EThemeDefaultEditorCanvas;
    }(wcardinalUi.DThemes.getClass("DBoard")));

    var EThemeDefaultEditorCoordinate = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorCoordinate, _super);
        function EThemeDefaultEditorCoordinate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultEditorCoordinate;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorDataMapping = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorDataMapping, _super);
        function EThemeDefaultEditorDataMapping() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultEditorDataMapping;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorData = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorData, _super);
        function EThemeDefaultEditorData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultEditorData;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorLayer = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorLayer, _super);
        function EThemeDefaultEditorLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultEditorLayer;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorLayout = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorLayout, _super);
        function EThemeDefaultEditorLayout() {
            var _this = _super.call(this) || this;
            _this._dialog = wcardinalUi.DThemes.get("DDialog");
            return _this;
        }
        EThemeDefaultEditorLayout.prototype.getMargin = function () {
            return 0;
        };
        EThemeDefaultEditorLayout.prototype.getPaddingTop = function () {
            return 0;
        };
        EThemeDefaultEditorLayout.prototype.getPaddingRight = function () {
            return 0;
        };
        EThemeDefaultEditorLayout.prototype.getPaddingBottom = function () {
            return 0;
        };
        EThemeDefaultEditorLayout.prototype.getPaddingLeft = function () {
            return 0;
        };
        EThemeDefaultEditorLayout.prototype.getReverse = function () {
            return false;
        };
        EThemeDefaultEditorLayout.prototype.getBackgroundColor = function (state) {
            return this._dialog.getBackgroundColor(state);
        };
        EThemeDefaultEditorLayout.prototype.getBorderColor = function (state) {
            return this._dialog.getBorderColor(state);
        };
        EThemeDefaultEditorLayout.prototype.getBorderAlign = function () {
            return 0;
        };
        EThemeDefaultEditorLayout.prototype.getShadow = function () {
            return this.newShadowWeak();
        };
        return EThemeDefaultEditorLayout;
    }(wcardinalUi.DThemes.getClass("DLayoutHorizontal")));

    var EThemeDefaultEditorPaneContent = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorPaneContent, _super);
        function EThemeDefaultEditorPaneContent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultEditorPaneContent.prototype.getHeight = function () {
            return "auto";
        };
        EThemeDefaultEditorPaneContent.prototype.getPaddingTop = function () {
            return 8;
        };
        EThemeDefaultEditorPaneContent.prototype.getPaddingRight = function () {
            return 8;
        };
        EThemeDefaultEditorPaneContent.prototype.getPaddingBottom = function () {
            return 8;
        };
        EThemeDefaultEditorPaneContent.prototype.getPaddingLeft = function () {
            return 8;
        };
        return EThemeDefaultEditorPaneContent;
    }(wcardinalUi.DThemes.getClass("DContent")));

    var EThemeDefaultEditorSearch = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorSearch, _super);
        function EThemeDefaultEditorSearch() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultEditorSearch;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorShape = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorShape, _super);
        function EThemeDefaultEditorShape() {
            var _this = _super.call(this) || this;
            _this._shapeType = wcardinalUi.DThemes.get("FShapeType");
            return _this;
        }
        EThemeDefaultEditorShape.prototype.getButtonCircleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.CIRCLE);
        };
        EThemeDefaultEditorShape.prototype.getButtonSemicircleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.SEMICIRCLE);
        };
        EThemeDefaultEditorShape.prototype.getButtonRectangleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.RECTANGLE);
        };
        EThemeDefaultEditorShape.prototype.getButtonRectangleRoundedTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.RECTANGLE_ROUNDED);
        };
        EThemeDefaultEditorShape.prototype.getButtonTriangleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.TRIANGLE);
        };
        EThemeDefaultEditorShape.prototype.getButtonTriangleRoundedTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.TRIANGLE_ROUNDED);
        };
        EThemeDefaultEditorShape.prototype.getButtonLineTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.LINE);
        };
        EThemeDefaultEditorShape.prototype.getButtonLineConnectorTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.CONNECTOR_LINE);
        };
        EThemeDefaultEditorShape.prototype.getButtonElbowConnectorTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.CONNECTOR_ELBOW);
        };
        EThemeDefaultEditorShape.prototype.getButtonImageTitle = function () {
            return "".concat(this._shapeType.getLabel(wcardinalUi.EShapeType.IMAGE), "...");
        };
        EThemeDefaultEditorShape.prototype.getButtonGraphicPieceTitle = function () {
            return "".concat(this._shapeType.getLabel(wcardinalUi.EShapeType.EMBEDDED), "...");
        };
        EThemeDefaultEditorShape.prototype.getButtonGroupShortcut = function () {
            return "Ctrl+G";
        };
        EThemeDefaultEditorShape.prototype.getButtonUngroupShortcut = function () {
            return "Ctrl+Shift+G";
        };
        EThemeDefaultEditorShape.prototype.getSelectLineHeadTypeLabel = function (type) {
            return this.getSelectLineTailTypeLabel(type);
        };
        EThemeDefaultEditorShape.prototype.getInputLineHeadMarginLabel = function () {
            return this.getInputLineTailMarginLabel();
        };
        return EThemeDefaultEditorShape;
    }(EThemeDefaultEditorPane));

    var EThemeDefaultEditorSnap = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorSnap, _super);
        function EThemeDefaultEditorSnap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultEditorSnap.prototype.getListTargetItemLabel = function (value) {
            if (value.type === wcardinalUi.ESnapperTargetValueType.VERTICAL) {
                return "X: ".concat(value.position);
            }
            else {
                return "Y: ".concat(value.position);
            }
        };
        return EThemeDefaultEditorSnap;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorText = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorText, _super);
        function EThemeDefaultEditorText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultEditorText.prototype.getInputTextHeight = function () {
            return this.getLineHeight() * 3;
        };
        return EThemeDefaultEditorText;
    }(EThemeDefaultEditorPane));

    var EThemeDefaultEditorTree = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorTree, _super);
        function EThemeDefaultEditorTree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultEditorTree.prototype.getButtonBringToFrontShortcut = function () {
            return "Alt+Shift+F";
        };
        EThemeDefaultEditorTree.prototype.getButtonBringForwardShortcut = function () {
            return "Alt+Ctrl+F";
        };
        EThemeDefaultEditorTree.prototype.getButtonSendBackwardShortcut = function () {
            return "Alt+Ctrl+B";
        };
        EThemeDefaultEditorTree.prototype.getButtonSendToBackShortcut = function () {
            return "Alt+Shift+B";
        };
        return EThemeDefaultEditorTree;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorValidation = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorValidation, _super);
        function EThemeDefaultEditorValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultEditorValidation;
    }(EThemeDefaultEditor));

    var EThemeDefaultEditorButtonLayout = /** @class */ (function (_super) {
        __extends(EThemeDefaultEditorButtonLayout, _super);
        function EThemeDefaultEditorButtonLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultEditorButtonLayout.prototype.getWidth = function () {
            return "auto";
        };
        EThemeDefaultEditorButtonLayout.prototype.getHeight = function () {
            return "100%";
        };
        EThemeDefaultEditorButtonLayout.prototype.getMargin = function () {
            return 5;
        };
        EThemeDefaultEditorButtonLayout.prototype.getPaddingTop = function () {
            return 4;
        };
        EThemeDefaultEditorButtonLayout.prototype.getPaddingRight = function () {
            return 4;
        };
        EThemeDefaultEditorButtonLayout.prototype.getPaddingBottom = function () {
            return 4;
        };
        EThemeDefaultEditorButtonLayout.prototype.getPaddingLeft = function () {
            return 4;
        };
        return EThemeDefaultEditorButtonLayout;
    }(wcardinalUi.DThemes.getClass("DLayoutVertical")));

    var EThemeDefaultShapeActionValue = /** @class */ (function () {
        function EThemeDefaultShapeActionValue() {
        }
        EThemeDefaultShapeActionValue.prototype.toLabel = function (value) {
            var type = value.type;
            if (value instanceof wcardinalUi.EShapeActionValueSubtyped) {
                var subtype = value.subtype;
                if (value instanceof wcardinalUi.EShapeActionValueOpetyped) {
                    var result = this.toOpetypedLabel(type, subtype, value.opetype, value);
                    if (result != null) {
                        return result;
                    }
                }
                else {
                    var result = this.toSubtypedLabel(type, subtype, value);
                    if (result != null) {
                        return result;
                    }
                }
            }
            return this.toTypedLabel(type, value);
        };
        EThemeDefaultShapeActionValue.prototype.toTypedLabel = function (type, value) {
            return "".concat(this.toTypeLabel(type), ": ").concat(this.toConditionLabel(value.condition));
        };
        EThemeDefaultShapeActionValue.prototype.toSubtypedLabel = function (type, subtype, value) {
            var typeLabel = this.toTypeLabel(type);
            switch (type) {
                case wcardinalUi.EShapeActionValueType.SHOW_HIDE:
                    return "".concat(typeLabel, ": ").concat(this.toShowHideTypeLabel(subtype));
                case wcardinalUi.EShapeActionValueType.BLINK:
                    return "".concat(typeLabel, ": ").concat(this.toBlinkTypeLabel(subtype));
                case wcardinalUi.EShapeActionValueType.CHANGE_COLOR:
                case wcardinalUi.EShapeActionValueType.CHANGE_COLOR_LEGACY:
                    return "".concat(typeLabel, ": ").concat(this.toChangeColorTypeLabel(subtype));
                case wcardinalUi.EShapeActionValueType.CHANGE_TEXT:
                    return "".concat(typeLabel, ": ").concat(this.toChangeTextTypeLabel(subtype));
                case wcardinalUi.EShapeActionValueType.OPEN:
                    return "".concat(typeLabel, ": ").concat(this.toOpenTypeLabel(subtype));
                case wcardinalUi.EShapeActionValueType.GESTURE:
                    return "".concat(typeLabel, ": ").concat(this.toGestureTypeLabel(subtype));
                case wcardinalUi.EShapeActionValueType.MISC:
                    return "".concat(typeLabel, ": ").concat(this.toMiscTypeLabel(subtype));
            }
            return null;
        };
        EThemeDefaultShapeActionValue.prototype.toOpetypedLabel = function (type, subtype, opetype, value) {
            switch (type) {
                case wcardinalUi.EShapeActionValueType.TRANSFORM:
                    var subtypeLabel = this.toTransformTypeLabel(subtype);
                    switch (subtype) {
                        case wcardinalUi.EShapeActionValueTransformType.ROTATE:
                            return "".concat(subtypeLabel, ": ").concat(this.toTransformRotateTypeLabel(opetype));
                        case wcardinalUi.EShapeActionValueTransformType.MOVE:
                            return "".concat(subtypeLabel, ": ").concat(this.toTransformMoveTypeLabel(opetype));
                        case wcardinalUi.EShapeActionValueTransformType.RESIZE:
                            return "".concat(subtypeLabel, ": ").concat(this.toTransformResizeTypeLabel(opetype));
                    }
            }
            return null;
        };
        EThemeDefaultShapeActionValue.prototype.toConditionLabel = function (condition) {
            var l = 20;
            if (l < condition.length) {
                return condition.substring(0, l) + "...";
            }
            else {
                return condition;
            }
        };
        EThemeDefaultShapeActionValue.prototype.toChangeColorTypeLabel = function (type) {
            if (type === wcardinalUi.EShapeActionValueChangeColorType.NONE) {
                return this.toChangeColorTypeValueLabel(wcardinalUi.EShapeActionValueChangeColorType.NONE);
            }
            var result = "";
            var delimiter = "";
            if (type & wcardinalUi.EShapeActionValueChangeColorType.FILL) {
                result +=
                    delimiter + this.toChangeColorTypeValueLabel(wcardinalUi.EShapeActionValueChangeColorType.FILL);
                delimiter = ", ";
            }
            if (type & wcardinalUi.EShapeActionValueChangeColorType.STROKE) {
                result +=
                    delimiter +
                        this.toChangeColorTypeValueLabel(wcardinalUi.EShapeActionValueChangeColorType.STROKE);
                delimiter = ", ";
            }
            if (type & wcardinalUi.EShapeActionValueChangeColorType.TEXT) {
                result +=
                    delimiter + this.toChangeColorTypeValueLabel(wcardinalUi.EShapeActionValueChangeColorType.TEXT);
                delimiter = ", ";
            }
            if (type & wcardinalUi.EShapeActionValueChangeColorType.TEXT_OUTLINE) {
                result +=
                    delimiter +
                        this.toChangeColorTypeValueLabel(wcardinalUi.EShapeActionValueChangeColorType.TEXT_OUTLINE);
            }
            return result;
        };
        return EThemeDefaultShapeActionValue;
    }());

    var EThemeDefaultJaJpButtonLock = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpButtonLock, _super);
        function EThemeDefaultJaJpButtonLock() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpButtonLock.prototype.getTitle = function () {
            return "ロック";
        };
        return EThemeDefaultJaJpButtonLock;
    }(EThemeDefaultButtonLock));

    var EThemeDefaultJaJpDialogAction = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogAction, _super);
        function EThemeDefaultJaJpDialogAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpDialogAction.prototype.getSelectActionLabel = function () {
            return "種別";
        };
        EThemeDefaultJaJpDialogAction.prototype.getButtonKeywordTitle = function () {
            return "キーワードリストの表示切替";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputOriginXLabel = function () {
            return "基準X";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputOriginYLabel = function () {
            return "基準Y";
        };
        EThemeDefaultJaJpDialogAction.prototype.getSelectWhenLabel = function () {
            return "条件";
        };
        EThemeDefaultJaJpDialogAction.prototype.getSelectLayerLabel = function () {
            return "レイヤー";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputConditionLabel = function () {
            return "条件";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputIntervalLabel = function () {
            return "周期";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputIntervalUnitLabel = function () {
            return "ミリ秒";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputSizeLabel = function () {
            return "サイズ";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputAmountLabel = function () {
            return "量";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputValueLabel = function () {
            return "値";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputInitializationLabel = function () {
            return "初期化";
        };
        EThemeDefaultJaJpDialogAction.prototype.getCheckPointEventsLabel = function () {
            return "ポインター操作";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputTargetNameLabel = function () {
            return "名前";
        };
        EThemeDefaultJaJpDialogAction.prototype.getButtonColorLabel = function () {
            return "色";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputTargetLabel = function () {
            return "対象";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputArgumentLabel = function () {
            return "引数";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputColorCodeLabel = function () {
            return "RGB";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputAlphaCodeLabel = function () {
            return "透明度";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputBrightnessLabel = function () {
            return "明るさ";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputBlendLabel = function () {
            return "混合比率";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputInitialLabel = function () {
            return "初期値";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputStepLabel = function () {
            return "間隔";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputMinLabel = function () {
            return "最小値";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputMaxLabel = function () {
            return "最大値";
        };
        EThemeDefaultJaJpDialogAction.prototype.getInputScaleLabel = function () {
            return "上下限";
        };
        EThemeDefaultJaJpDialogAction.prototype.getCheckBringToFrontLabel = function () {
            return "最前面へ移動";
        };
        EThemeDefaultJaJpDialogAction.prototype.getCheckInNewWindowLabel = function () {
            return "新規ウィンドウ";
        };
        /* eslint-disable prettier/prettier */
        EThemeDefaultJaJpDialogAction.prototype.newKeywords = function () {
            var result = [];
            // Basics
            result.push(this.newKeyword("time", "number", "現在のUNIXミリ秒"));
            // States
            result.push(this.newKeyword("isInitializing", "boolean", "シェイプが初期化済みかどうかの真偽値"));
            result.push(this.newKeyword("isHovered", "boolean", "シェイプにHover中かどうかの真偽値"));
            result.push(this.newKeyword("isActive", "boolean", "シェイプがアクティブかどうかの真偽値"));
            result.push(this.newKeyword("isActivated", "boolean", "シェイプがアクティブになる時に真となる真偽値"));
            result.push(this.newKeyword("isDeactivated", "boolean", "シェイプが非アクティブになる時に真となる真偽値"));
            result.push(this.newKeyword("isPressed", "boolean", "シェイプが押下されているかどうかの真偽値"));
            result.push(this.newKeyword("isReadOnly", "boolean", "シェイプが読み取り専用かどうかの真偽値"));
            result.push(this.newKeyword("isEnabled", "boolean", "シェイプが有効かどうかの真偽値"));
            result.push(this.newKeyword("isDisabled", "boolean", "シェイプが非有効かどうかの真偽値"));
            result.push(this.newKeyword("isActionable", "boolean", "シェイプがアクション可能な状態かどうかの真偽値"));
            result.push(this.newKeyword("isGesturing", "boolean", "シェイプがドラッグ等による操作中かどうかの真偽値"));
            result.push(this.newKeyword("isFocused", "boolean", "シェイプがフォーカスされているかどうかの真偽値"));
            result.push(this.newKeyword("isFocusable", "boolean", "シェイプがフォーカス可能かどうかの真偽値"));
            result.push(this.newKeyword("isUnfocusable", "boolean", "シェイプがフォーカス不可能かどうかの真偽値"));
            result.push(this.newKeyword("isClicked", "boolean", "シェイプがクリックされた時に真となる真偽値"));
            result.push(this.newKeyword("isDblClicked", "boolean", "シェイプがダブルクリックされた時に真となる真偽値"));
            result.push(this.newKeyword("isDown", "boolean", "シェイプ上でポインターかキーが押下された時に真となる真偽値"));
            result.push(this.newKeyword("isUp", "boolean", "シェイプ上でポインターかキーが離された時に真となる真偽値"));
            result.push(this.newKeyword("isUpOutside", "boolean", "シェイプ外でポインターかキーが離された時に真となる真偽値"));
            result.push(this.newKeyword("isRightClicked", "boolean", "シェイプが右クリックされた時に真となる真偽値"));
            result.push(this.newKeyword("isRightDown", "boolean", "シェイプ上で右ポインターが押下された時に真となる真偽値"));
            result.push(this.newKeyword("isRightUp", "boolean", "シェイプ上で右ポインターが離されたときに真となる真偽値"));
            result.push(this.newKeyword("isRightUpOutside", "boolean", "シェイプ外で右ポインターが離されたときに真となる真偽値"));
            result.push(this.newKeyword("isRightPressed", "boolean", "シェイプが右ポインターで押下されているかどうかの真偽値"));
            // Shape properties
            result.push(this.newKeyword("id", "string", "シェイプID"));
            result.push(this.newKeyword("type", "number", "シェイプ種別"));
            result.push(this.newKeyword("size.x", "number", "シェイプの横幅"));
            result.push(this.newKeyword("size.y", "number", "シェイプの高さ"));
            result.push(this.newKeyword("fill.enable", "boolean", "シェイプの塗りが有効かどうかの真偽値"));
            result.push(this.newKeyword("fill.color", "number", "シェイプの塗りのRGB色"));
            result.push(this.newKeyword("fill.alpha", "number", "シェイプの塗りの透明度"));
            result.push(this.newKeyword("stroke.enable", "boolean", "シェイプの境界線が有効かどうかの真偽値"));
            result.push(this.newKeyword("stroke.color", "number", "シェイプの境界線のRGB色"));
            result.push(this.newKeyword("stroke.alpha", "number", "シェイプの境界線の透明度"));
            result.push(this.newKeyword("stroke.width", "number", "シェイプの境界線の線幅"));
            result.push(this.newKeyword("stroke.align", "number", "シェイプの境界線の位置"));
            result.push(this.newKeyword("transform.position.x", "number", "シェイプのX座標"));
            result.push(this.newKeyword("transform.position.y", "number", "シェイプのY座標"));
            result.push(this.newKeyword("transform.pivot.x", "number", "シェイプのXピボット位置"));
            result.push(this.newKeyword("transform.pivot.y", "number", "シェイプのYピボット位置"));
            result.push(this.newKeyword("transform.rotation", "number", "シェイプの回転角度（ラジアン単位）"));
            result.push(this.newKeyword("transform.skew.x", "number", "シェイプの歪のX成分"));
            result.push(this.newKeyword("transform.skew.y", "number", "シェイプの歪のY成分"));
            result.push(this.newKeyword("transform.scale.x", "number", "シェイプの拡大縮小率のX成分"));
            result.push(this.newKeyword("transform.scale.y", "number", "シェイプの拡大縮小率のY成分"));
            result.push(this.newKeyword("points.length", "number", "シェイプのポイント数"));
            result.push(this.newKeyword("points.values", "number[]", "シェイプのポイント配列"));
            result.push(this.newKeyword("text.value", "string", "シェイプのテキスト値"));
            result.push(this.newKeyword("text.color", "number", "シェイプのテキストのRGB色"));
            result.push(this.newKeyword("text.alpha", "number", "シェイプのテキストの透明度"));
            result.push(this.newKeyword("text.family", "string", "シェイプのテキストのフォントファミリー"));
            result.push(this.newKeyword("text.size", "number", "シェイプのテキストのフォントサイズ"));
            result.push(this.newKeyword("cursor", "string", "シェイプに割り当てられているカーソル"));
            result.push(this.newKeyword("shortcut", "string | undefined", "シェイプに割り当てられているショートカット"));
            result.push(this.newKeyword("title", "string | undefined", "シェイプに割り当てられているツールチップテキスト"));
            result.push(this.newKeyword("visible", "boolean", "シェイプが可視かどうかの真偽値"));
            result.push(this.newKeyword("interactive", "boolean", "シェイプがポインターに反応するかどうかの真偽値"));
            // First data
            result.push(this.newKeyword("data.id", "string", "最初のデータのID"));
            result.push(this.newKeyword("data.initial", "string", "最初のデータの初期値式"));
            result.push(this.newKeyword("data.format", "string", "最初のデータの書式式"));
            result.push(this.newKeyword("data.capacity", "number", "最初のデータのデータ保存個数上限"));
            result.push(this.newKeyword("data.order", "number", "最初のデータの並び順（0: 昇順、1: 降順）"));
            result.push(this.newKeyword("data.value", "unknown", "最初のデータのデータ値"));
            result.push(this.newKeyword("data.nvalue", "number", "最初のデータの正規化後のデータ値"));
            result.push(this.newKeyword("data.time", "number", "最初のデータのUNIXミリ秒"));
            result.push(this.newKeyword("data.values", "unknown[]", "最初のデータのデータ配列"));
            result.push(this.newKeyword("data.times", "number[]", "最初のデータのUNIXミリ秒の配列"));
            result.push(this.newKeyword("data.range.from", "number", "最初のデータの下限"));
            result.push(this.newKeyword("data.range.to", "number", "最初のデータの上限"));
            // Data by index
            result.push(this.newKeyword("data.get(n).id", "string", "n番目のデータのID"));
            result.push(this.newKeyword("data.get(n).initial", "string", "n番目のデータの初期値式"));
            result.push(this.newKeyword("data.get(n).format", "string", "n番目のデータの書式式"));
            result.push(this.newKeyword("data.get(n).capacity", "number", "n番目のデータのデータ保存個数上限"));
            result.push(this.newKeyword("data.get(n).order", "number", "n番目のデータの並び順（0: 昇順、1: 降順）"));
            result.push(this.newKeyword("data.get(n).value", "unknown", "n番目のデータのデータ値"));
            result.push(this.newKeyword("data.get(n).nvalue", "number", "n番目のデータの正規化後のデータ値"));
            result.push(this.newKeyword("data.get(n).time", "number", "n番目のデータのUNIXミリ秒"));
            result.push(this.newKeyword("data.get(n).values", "unknown[]", "n番目のデータのデータ配列"));
            result.push(this.newKeyword("data.get(n).times", "number[]", "n番目のデータのUNIXミリ秒の配列"));
            result.push(this.newKeyword("data.get(n).range.from", "number", "n番目のデータの下限"));
            result.push(this.newKeyword("data.get(n).range.to", "number", "n番目のデータの上限"));
            // Data by alias
            result.push(this.newKeyword("${alias}.id", "string", "エイリアスが指すデータのID"));
            result.push(this.newKeyword("${alias}.initial", "string", "エイリアスが指すデータの初期値式"));
            result.push(this.newKeyword("${alias}.format", "string", "エイリアスが指すデータの書式式"));
            result.push(this.newKeyword("${alias}.capacity", "number", "エイリアスが指すデータのデータ保存個数上限"));
            result.push(this.newKeyword("${alias}.order", "number", "エイリアスが指すデータの並び順（0: 昇順、1: 降順）"));
            result.push(this.newKeyword("${alias}.value", "unknown", "エイリアスが指すデータのデータ値"));
            result.push(this.newKeyword("${alias}.nvalue", "number", "エイリアスが指すデータの正規化後のデータ値"));
            result.push(this.newKeyword("${alias}.time", "number", "エイリアスが指すデータのUNIXミリ秒"));
            result.push(this.newKeyword("${alias}.values", "unknown[]", "エイリアスが指すデータのデータ配列"));
            result.push(this.newKeyword("${alias}.times", "number[]", "エイリアスが指すデータのUNIXミリ秒の配列"));
            result.push(this.newKeyword("${alias}.range.from", "number", "エイリアスが指すデータの下限"));
            result.push(this.newKeyword("${alias}.range.to", "number", "エイリアスが指すデータの上限"));
            return result;
        };
        return EThemeDefaultJaJpDialogAction;
    }(EThemeDefaultDialogAction));

    var EThemeDefaultJaJpDialogCanvas = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogCanvas, _super);
        function EThemeDefaultJaJpDialogCanvas() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultJaJpDialogCanvas;
    }(EThemeDefaultDialogCanvas));

    var EThemeDefaultJaJpDialogDataMappingValue = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogDataMappingValue, _super);
        function EThemeDefaultJaJpDialogDataMappingValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpDialogDataMappingValue.prototype.getInputSourceLabel = function () {
            return "変換対象";
        };
        EThemeDefaultJaJpDialogDataMappingValue.prototype.getInputDestinationLabel = function () {
            return "変換規則";
        };
        EThemeDefaultJaJpDialogDataMappingValue.prototype.getInputInitialLabel = function () {
            return "初期値";
        };
        EThemeDefaultJaJpDialogDataMappingValue.prototype.getTableColumnDataIdLabel = function () {
            return "変換前";
        };
        EThemeDefaultJaJpDialogDataMappingValue.prototype.getTableColumnMappedToLabel = function () {
            return "変換後";
        };
        return EThemeDefaultJaJpDialogDataMappingValue;
    }(EThemeDefaultDialogDataMappingValue));

    var EThemeDefaultJaJpDialogDataValue = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogDataValue, _super);
        function EThemeDefaultJaJpDialogDataValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpDialogDataValue.prototype.getInputIdLabel = function () {
            return "ID";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputAsLabel = function () {
            return "別名";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectTypeLabel = function () {
            return "種別";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectTypeValueLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeDataValueType.BOOLEAN:
                    return "真偽値";
                case wcardinalUi.EShapeDataValueType.BOOLEAN_ARRAY:
                    return "真偽値の配列";
                case wcardinalUi.EShapeDataValueType.NUMBER:
                    return "数値";
                case wcardinalUi.EShapeDataValueType.NUMBER_ARRAY:
                    return "数値の配列";
                case wcardinalUi.EShapeDataValueType.STRING:
                    return "文字列";
                case wcardinalUi.EShapeDataValueType.STRING_ARRAY:
                    return "文字列の配列";
                case wcardinalUi.EShapeDataValueType.OBJECT:
                    return "オブジェクト";
                case wcardinalUi.EShapeDataValueType.OBJECT_ARRAY:
                    return "オブジェクトの配列";
                case wcardinalUi.EShapeDataValueType.TICKER:
                    return "ティッカー";
                default:
                    var extension = wcardinalUi.EShapeDataValueExtensions.get(type);
                    if (extension) {
                        return extension.label;
                    }
                    return "不明";
            }
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectScopeLabel = function () {
            return "公開範囲";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectScopeValueLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeDataValueScope.PUBLIC:
                    return "公開";
                case wcardinalUi.EShapeDataValueScope.PROTECTED:
                    return "図面内のみ公開";
                case wcardinalUi.EShapeDataValueScope.PRIVATE:
                    return "非公開";
            }
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputInitialLabel = function () {
            return "初期値";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputIntervalLabel = function () {
            return "周期";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputIntervalUnitLabel = function () {
            return "ミリ秒";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputFormatLabel = function () {
            return "書式";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectRangeTypeLabel = function () {
            return "範囲";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectRangeTypeValueLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeDataValueRangeType.FROM:
                    return "下限のみ";
                case wcardinalUi.EShapeDataValueRangeType.TO:
                    return "上限のみ";
                case wcardinalUi.EShapeDataValueRangeType.FROM_TO:
                    return "上下限あり";
                default:
                    return "なし";
            }
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputRangeFromLabel = function () {
            return "下限";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputRangeToLabel = function () {
            return "上限";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getInputCapacityLabel = function () {
            return "保存個数";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectOrderLabel = function () {
            return "順序";
        };
        EThemeDefaultJaJpDialogDataValue.prototype.getSelectOrderValueLabel = function (order) {
            switch (order) {
                case wcardinalUi.EShapeDataValueOrder.ASCENDING:
                    return "昇順";
                case wcardinalUi.EShapeDataValueOrder.DESCENDING:
                    return "降順";
            }
        };
        return EThemeDefaultJaJpDialogDataValue;
    }(EThemeDefaultDialogDataValue));

    var EThemeDefaultJaJpDialogLayer = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogLayer, _super);
        function EThemeDefaultJaJpDialogLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpDialogLayer.prototype.getInputNameLabel = function () {
            return "名前";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getInputPositionLabel = function () {
            return "位置";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getInputSizeLabel = function () {
            return "サイズ";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getTextBackgroundLabel = function () {
            return "背景";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getCheckBackgroundLabel = function () {
            return "有効";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getCheckVisibleLabel = function () {
            return "可視";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getCheckInteractiveLabel = function () {
            return "インタラクティブ";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getSelectGestureLabel = function () {
            return "操作";
        };
        EThemeDefaultJaJpDialogLayer.prototype.getSelectGestureValueLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueGestureOperationType.DRAG:
                    return "ドラッグ";
                case wcardinalUi.EShapeActionValueGestureOperationType.PINCH:
                    return "ピンチ";
            }
            return "不明";
        };
        return EThemeDefaultJaJpDialogLayer;
    }(EThemeDefaultDialogLayer));

    var EThemeDefaultJaJpDialogSnap = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpDialogSnap, _super);
        function EThemeDefaultJaJpDialogSnap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpDialogSnap.prototype.getSelectDirectionLabel = function () {
            return "方向";
        };
        EThemeDefaultJaJpDialogSnap.prototype.getSelectDirectionValueLabel = function (value) {
            switch (value) {
                case wcardinalUi.ESnapperTargetValueType.VERTICAL:
                    return "垂直";
                case wcardinalUi.ESnapperTargetValueType.HORIZONTAL:
                    return "水平";
            }
            return "不明";
        };
        EThemeDefaultJaJpDialogSnap.prototype.getInputPositionLabel = function () {
            return "位置";
        };
        return EThemeDefaultJaJpDialogSnap;
    }(EThemeDefaultDialogSnap));

    var EThemeDefaultJaJpEditorAction = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorAction, _super);
        function EThemeDefaultJaJpEditorAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorAction.prototype.getLabel = function () {
            return "アクション";
        };
        EThemeDefaultJaJpEditorAction.prototype.getButtonNewTitle = function () {
            return "新規アクション";
        };
        EThemeDefaultJaJpEditorAction.prototype.getButtonDeleteTitle = function () {
            return "アクションを削除";
        };
        EThemeDefaultJaJpEditorAction.prototype.getButtonBringForwardTitle = function () {
            return "選択アクションを上へ移動";
        };
        EThemeDefaultJaJpEditorAction.prototype.getButtonSendBackwardTitle = function () {
            return "選択アクションを下へ移動";
        };
        EThemeDefaultJaJpEditorAction.prototype.getCheckInteractiveLabel = function () {
            return "インタラクティブ";
        };
        EThemeDefaultJaJpEditorAction.prototype.getCheckFocusableLabel = function () {
            return "フォーカス";
        };
        EThemeDefaultJaJpEditorAction.prototype.getInputShortcutLabel = function () {
            return "ショートカット";
        };
        EThemeDefaultJaJpEditorAction.prototype.getInputTitleLabel = function () {
            return "ツールチップ";
        };
        EThemeDefaultJaJpEditorAction.prototype.getDropdownCursorLabel = function () {
            return "カーソル";
        };
        EThemeDefaultJaJpEditorAction.prototype.getCursors = function () {
            var result = new Map();
            result.set("", "なし");
            result.set("default", "デフォルト");
            result.set("context-menu", "コンテキストメニュー");
            result.set("help", "ヘルプ");
            result.set("pointer", "ポインター");
            result.set("progress", "プログレス");
            result.set("wait", "ビジー");
            result.set("cell", "セル");
            result.set("crosshair", "十字");
            result.set("text", "テキスト");
            result.set("vertical-text", "縦書きテキスト");
            result.set("alias", "エイリアス");
            result.set("copy", "コピー");
            result.set("move", "移動");
            result.set("no-drop", "ドロップ禁止");
            result.set("not-allowed", "禁止");
            result.set("grab", "掴む");
            result.set("grabbing", "掴んでいる");
            result.set("all-scroll", "スクロール");
            result.set("col-resize", "水平リサイズ");
            result.set("row-resize", "垂直リサイズ");
            result.set("n-resize", "リサイズ（北）");
            result.set("e-resize", "リサイズ（東）");
            result.set("s-resize", "リサイズ（南）");
            result.set("w-resize", "リサイズ（西）");
            result.set("ne-resize", "リサイズ（北東）");
            result.set("nw-resize", "リサイズ（北西）");
            result.set("se-resize", "リサイズ（南東）");
            result.set("sw-resize", "リサイズ（南西）");
            result.set("ew-resize", "リサイズ（東西）");
            result.set("ns-resize", "リサイズ（南北）");
            result.set("nesw-resize", "リサイズ（北東から南西）");
            result.set("nwse-resize", "リサイズ（北西から南東）");
            result.set("zoom-in", "ズームイン");
            result.set("zoom-out", "ズームアウト");
            return result;
        };
        return EThemeDefaultJaJpEditorAction;
    }(EThemeDefaultEditorAction));

    var EThemeDefaultJaJpEditorCanvasLegacy = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorCanvasLegacy, _super);
        function EThemeDefaultJaJpEditorCanvasLegacy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EThemeDefaultJaJpEditorCanvasLegacy;
    }(EThemeDefaultEditorCanvasLegacy));

    var EThemeDefaultJaJpEditorCanvas = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorCanvas, _super);
        function EThemeDefaultJaJpEditorCanvas() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorCanvas.prototype.getLabel = function () {
            return "キャンバス";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getDefaultName = function () {
            return "名称未設定";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getInputNameLabel = function () {
            return "名前";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getInputLabelLabel = function () {
            return "表示名称";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getInputWidthLabel = function () {
            return "幅";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getInputHeightLabel = function () {
            return "高さ";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getSelectCategoryLabel = function () {
            return "カテゴリ";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getInputBackgroundLabel = function () {
            return "背景";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getInputSummaryLabel = function () {
            return "概要";
        };
        EThemeDefaultJaJpEditorCanvas.prototype.getInputDescriptionLabel = function () {
            return "説明";
        };
        return EThemeDefaultJaJpEditorCanvas;
    }(EThemeDefaultEditorCanvas));

    var EThemeDefaultJaJpEditorCoordinate = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorCoordinate, _super);
        function EThemeDefaultJaJpEditorCoordinate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorCoordinate.prototype.getLabel = function () {
            return "位置とサイズ";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputIdLabel = function () {
            return "ID";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputPositionXLabel = function () {
            return "X";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputPositionYLabel = function () {
            return "Y";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputPositionLeftLabel = function () {
            return "左端";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputPositionTopLabel = function () {
            return "上端";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputSizeXLabel = function () {
            return "幅";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputSizeYLabel = function () {
            return "高さ";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputRotationLabel = function () {
            return "角度";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getInputSkewLabel = function () {
            return "歪";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonAlignLeftTitle = function () {
            return "左揃え";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonAlignCenterTitle = function () {
            return "中央揃え";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonAlignRightTitle = function () {
            return "右揃え";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonAlignTopTitle = function () {
            return "上揃え";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonAlignMiddleTitle = function () {
            return "上下中央揃え";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonAlignBottomTitle = function () {
            return "下揃え";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonDistributeHorizontallyTitle = function () {
            return "左右に整列";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonDistributeVerticallyTitle = function () {
            return "上下に整列";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonRotateLeftTitle = function () {
            return "左回転";
        };
        EThemeDefaultJaJpEditorCoordinate.prototype.getButtonRotateRightTitle = function () {
            return "右回転";
        };
        return EThemeDefaultJaJpEditorCoordinate;
    }(EThemeDefaultEditorCoordinate));

    var EThemeDefaultJaJpEditorDataMapping = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorDataMapping, _super);
        function EThemeDefaultJaJpEditorDataMapping() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorDataMapping.prototype.getLabel = function () {
            return "データ変換";
        };
        EThemeDefaultJaJpEditorDataMapping.prototype.getButtonNewTitle = function () {
            return "新規データ変換";
        };
        EThemeDefaultJaJpEditorDataMapping.prototype.getButtonDeleteTitle = function () {
            return "選択データ変換を削除";
        };
        EThemeDefaultJaJpEditorDataMapping.prototype.getButtonBringForwardTitle = function () {
            return "選択データ変換を上へ移動";
        };
        EThemeDefaultJaJpEditorDataMapping.prototype.getButtonSendBackwardTitle = function () {
            return "選択データ変換を下へ移動";
        };
        return EThemeDefaultJaJpEditorDataMapping;
    }(EThemeDefaultEditorDataMapping));

    var EThemeDefaultJaJpEditorData = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorData, _super);
        function EThemeDefaultJaJpEditorData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorData.prototype.getLabel = function () {
            return "データ";
        };
        EThemeDefaultJaJpEditorData.prototype.getButtonNewTitle = function () {
            return "新規データ";
        };
        EThemeDefaultJaJpEditorData.prototype.getButtonDeleteTitle = function () {
            return "選択データを削除";
        };
        EThemeDefaultJaJpEditorData.prototype.getButtonBringForwardTitle = function () {
            return "選択データを上へ移動";
        };
        EThemeDefaultJaJpEditorData.prototype.getButtonSendBackwardTitle = function () {
            return "選択データを下へ移動";
        };
        return EThemeDefaultJaJpEditorData;
    }(EThemeDefaultEditorData));

    var EThemeDefaultJaJpEditorLayer = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorLayer, _super);
        function EThemeDefaultJaJpEditorLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorLayer.prototype.getLabel = function () {
            return "レイヤー";
        };
        EThemeDefaultJaJpEditorLayer.prototype.getButtonNewTitle = function () {
            return "新規レイヤー";
        };
        EThemeDefaultJaJpEditorLayer.prototype.getButtonDeleteTitle = function () {
            return "選択レイヤーの削除";
        };
        EThemeDefaultJaJpEditorLayer.prototype.getButtonBringForwardTitle = function () {
            return "選択レイヤーを前面へ移動";
        };
        EThemeDefaultJaJpEditorLayer.prototype.getButtonSendBackwardTitle = function () {
            return "選択レイヤーを背面へ移動";
        };
        return EThemeDefaultJaJpEditorLayer;
    }(EThemeDefaultEditorLayer));

    var EEditorSearchConditionState = {
        NONE: -1,
        UNCONNECTED: 0,
        CONNECTED_PARTIALLY: 1,
        CONNECTED_FULLY: 2
    };

    var EEditorSearchConditionType = {
        NONE: -1
    };

    var EThemeDefaultJaJpEditorSearch = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorSearch, _super);
        function EThemeDefaultJaJpEditorSearch() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorSearch.prototype.getLabel = function () {
            return "検索";
        };
        EThemeDefaultJaJpEditorSearch.prototype.getInputIdLabel = function () {
            return "ID";
        };
        EThemeDefaultJaJpEditorSearch.prototype.getSelectTypeLabel = function () {
            return "種別";
        };
        EThemeDefaultJaJpEditorSearch.prototype.toTypeLabel = function (type) {
            switch (type) {
                case EEditorSearchConditionType.NONE:
                    return "指定しない";
            }
            return "不明";
        };
        EThemeDefaultJaJpEditorSearch.prototype.getSelectStateLabel = function () {
            return "状態";
        };
        EThemeDefaultJaJpEditorSearch.prototype.toStateLabel = function (state) {
            switch (state) {
                case EEditorSearchConditionState.NONE:
                    return "指定しない";
                case EEditorSearchConditionState.CONNECTED_FULLY:
                    return "完全に接続";
                case EEditorSearchConditionState.CONNECTED_PARTIALLY:
                    return "部分的に接続";
                case EEditorSearchConditionState.UNCONNECTED:
                    return "接続していない";
            }
            return "不明";
        };
        EThemeDefaultJaJpEditorSearch.prototype.getButtonExecuteTitle = function () {
            return "実行";
        };
        EThemeDefaultJaJpEditorSearch.prototype.getDialogErrorLabel = function () {
            return "シェイプが見つかりません";
        };
        return EThemeDefaultJaJpEditorSearch;
    }(EThemeDefaultEditorSearch));

    var toLabel = function (label, shortcut) {
        if (label != null) {
            if (shortcut != null) {
                return "".concat(label, " (").concat(shortcut, ")");
            }
            else {
                return label;
            }
        }
    };

    var EThemeDefaultJaJpEditorShape = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorShape, _super);
        function EThemeDefaultJaJpEditorShape() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorShape.prototype.getLabel = function () {
            return "シェイプ";
        };
        EThemeDefaultJaJpEditorShape.prototype.getTextChangeToLabel = function () {
            return "シェイプの変更";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonGroupTitle = function () {
            return toLabel("選択シェイプをグループ化", this.getButtonGroupShortcut());
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonUngroupTitle = function () {
            return toLabel("選択シェイプのグループを解除", this.getButtonUngroupShortcut());
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonFillLabel = function () {
            return "塗り";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeLabel = function () {
            return "輪郭線";
        };
        EThemeDefaultJaJpEditorShape.prototype.getInputStrokeWidthLabel = function () {
            return "幅";
        };
        EThemeDefaultJaJpEditorShape.prototype.getInputStrokeAlignLabel = function () {
            return "位置";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeSideTopTitle = function () {
            return "上輪郭線";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeSideRightTitle = function () {
            return "右輪郭線";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeSideBottomTitle = function () {
            return "下輪郭線";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeSideLeftTitle = function () {
            return "左輪郭線";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeExpandableTitle = function () {
            return "線幅の拡大を許可";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeShrinkableTitle = function () {
            return "線幅の縮小を許可";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonStrokeScalableDotDashTitle = function () {
            return "点線／破線の拡大縮小を許可";
        };
        EThemeDefaultJaJpEditorShape.prototype.getTextCornerLabel = function () {
            return "角の丸み";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonCornerTopLeftTitle = function () {
            return "左上角を丸める";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonCornerTopRightTitle = function () {
            return "右上角を丸める";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonCornerBottomRightTitle = function () {
            return "右下角を丸める";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonCornerBottomLeftTitle = function () {
            return "左下角を丸める";
        };
        EThemeDefaultJaJpEditorShape.prototype.getTextLineLabel = function () {
            return "線";
        };
        EThemeDefaultJaJpEditorShape.prototype.getSelectLineStyleLabel = function (style) {
            switch (style) {
                case wcardinalUi.EShapeStrokeStyle.NONE:
                    return "実線";
                case wcardinalUi.EShapeStrokeStyle.NON_EXPANDING_WIDTH:
                    return "拡大しない";
                case wcardinalUi.EShapeStrokeStyle.NON_SHRINKING_WIDTH:
                    return "縮小しない";
                case wcardinalUi.EShapeStrokeStyle.NON_SCALING_DOT_AND_DASH:
                    return "点線／破線の間隔を維持";
                case wcardinalUi.EShapeStrokeStyle.DOTTED:
                    return "点線";
                case wcardinalUi.EShapeStrokeStyle.DOTTED_DENSELY:
                    return "点線（密）";
                case wcardinalUi.EShapeStrokeStyle.DOTTED_LOOSELY:
                    return "点線（疎）";
                case wcardinalUi.EShapeStrokeStyle.DASHED:
                    return "破線";
                case wcardinalUi.EShapeStrokeStyle.DASHED_DENSELY:
                    return "破線（密）";
                case wcardinalUi.EShapeStrokeStyle.DASHED_LOOSELY:
                    return "破線（疎）";
            }
            return "Unknown";
        };
        EThemeDefaultJaJpEditorShape.prototype.getSelectLineTypeLabel = function (style) {
            switch (style) {
                case wcardinalUi.EShapePointsStyle.NONE:
                    return "折れ線";
                case wcardinalUi.EShapePointsStyle.CLOSED:
                    return "閉じる";
            }
            return "Unknown";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonLineClosedTitle = function () {
            return "閉じる";
        };
        EThemeDefaultJaJpEditorShape.prototype.getTextLineTailLabel = function () {
            return "線の始点側";
        };
        EThemeDefaultJaJpEditorShape.prototype.getSelectLineTailTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapePointsMarkerType.NONE:
                    return "マーカー無し";
                case wcardinalUi.EShapePointsMarkerType.CIRCLE:
                    return "円";
                case wcardinalUi.EShapePointsMarkerType.TRIANGLE:
                    return "三角形";
                case wcardinalUi.EShapePointsMarkerType.RECTANGLE:
                    return "四角形";
            }
            return "不明";
        };
        EThemeDefaultJaJpEditorShape.prototype.getInputLineTailMarginLabel = function () {
            return "余白";
        };
        EThemeDefaultJaJpEditorShape.prototype.getTextLineHeadLabel = function () {
            return "線の終点側";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonTextureImageTitle = function () {
            return "画像をテクスチャとして適用...";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonTextureGradientTitle = function () {
            return "グラデーションをテクスチャとして適用...";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonTextureFitToTitle = function () {
            return "テクスチャにフィットさせる";
        };
        EThemeDefaultJaJpEditorShape.prototype.getButtonTextureClearTitle = function () {
            return "テクスチャを削除";
        };
        return EThemeDefaultJaJpEditorShape;
    }(EThemeDefaultEditorShape));

    var EThemeDefaultJaJpEditorSnap = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorSnap, _super);
        function EThemeDefaultJaJpEditorSnap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorSnap.prototype.getLabel = function () {
            return "スナップ";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonTargetLabel = function () {
            return "スナップターゲット";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonTargetNewTitle = function () {
            return "新規スナップターゲット";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonTargetDeleteTitle = function () {
            return "選択スナップターゲットを削除";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonTargetBringForwardTitle = function () {
            return "選択スナップターゲットを上へ移動";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonTargetSendBackwardTitle = function () {
            return "選択スナップターゲットを下へ移動";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonTargetEyeTitle = function () {
            return "スナップターゲットの表示";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonGridLabel = function () {
            return "スナップグリッド";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getButtonGridEyeTitle = function () {
            return "スナップグリッドの表示";
        };
        EThemeDefaultJaJpEditorSnap.prototype.getInputGridSizeLabel = function () {
            return "サイズ";
        };
        return EThemeDefaultJaJpEditorSnap;
    }(EThemeDefaultEditorSnap));

    var EThemeDefaultJaJpEditorText = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorText, _super);
        function EThemeDefaultJaJpEditorText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorText.prototype.getLabel = function () {
            return "テキスト";
        };
        EThemeDefaultJaJpEditorText.prototype.getTextFontLabel = function () {
            return "フォント";
        };
        EThemeDefaultJaJpEditorText.prototype.getFontFamilies = function () {
            var result = new Map();
            result.set("auto", "自動");
            result.set('"Arial", "Helvetica Neue", "Helvetica", sans-serif', "Arial");
            result.set('"Calibri", "Candara", "Segoe", "Segoe UI", "Optima", "Arial", sans-serif', "Calibri");
            result.set('"Cambria", "Georgia", serif', "Cambria");
            result.set('"Candara", "Calibri","Segoe", "Segoe UI", "Optima", "Arial", sans-serif', "Candara");
            result.set('"Century Gothic", "CenturyGothic", "AppleGothic", sans-serif', "Century Gothic");
            result.set('"Consolas", "monaco", monospace', "Consolas");
            result.set('"Copperplate", "Copperplate Gothic Light", fantasy', "Copperplate");
            result.set('"Courier New", "Courier", "Lucida Sans Typewriter", "Lucida Typewriter", monospace', "Courier New");
            result.set('"Dejavu Sans", "Arial", "Verdana", sans-serif', "Dejavu Sans");
            result.set('"Georgia", "Cambria", serif', "Georgia");
            result.set('"Helvetica", "Helvetica Neue", "Arial", sans-serif', "Helvetica");
            result.set('"Hiragino Kaku Gothic Std", "Hiragino Kaku Gothic Pro", "Hiragino Sans", sans-serif', "ヒラギノ角ゴ");
            result.set('"Hiragino Maru Gothic Pro", sans-serif', "ヒラギノ丸ゴ");
            result.set('"Hiragino Mincho Pro", serif', "ヒラギノ明朝");
            result.set('"Impact", "Charcoal", "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif', "Impact");
            result.set('"MS Gothic", sans-serif', "ＭＳ ゴシック");
            result.set('"MS Mincho", serif', "ＭＳ 明朝");
            result.set('"MS PGothic", sans-serif', "ＭＳ Ｐゴシック");
            result.set('"MS PMincho", serif', "ＭＳ Ｐ明朝");
            result.set('"Meiryo", sans-serif', "メイリオ");
            result.set('"Meiryo UI", sans-serif', "メイリオＵＩ");
            result.set('"Optima", "Segoe UI", "Segoe", "Candara", "Calibri", "Arial", sans-serif', "Optima");
            result.set('"Roboto", system-ui', "Roboto");
            result.set('"Segoe", "Candara", "Calibri","Segoe UI", "Optima", "Arial", sans-serif', "Segoe");
            result.set('"Segoe UI", "Segoe", "Candara", "Calibri", "Optima", "Arial", sans-serif', "Segoe UI");
            result.set('"Verdana", "Dejavu Sans", "Arial", sans-serif', "Verdana");
            result.set('"YuGothic", "Hiragino Sans", sans-serif', "游ゴシック");
            result.set('"YuGothic UI", "Hiragino Sans", sans-serif', "游ゴシックＵＩ");
            result.set('"YuMincho", serif', "游明朝");
            return result;
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonFontSizeIncreaseTitle = function () {
            return "フォントサイズの拡大";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonFontSizeDecreaseTitle = function () {
            return "フォントサイズの縮小";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonFontItalicTitle = function () {
            return "斜体";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonFontBoldTitle = function () {
            return "太字";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonOutlineLabel = function () {
            return "輪郭線";
        };
        EThemeDefaultJaJpEditorText.prototype.getInputOutlineWidthLabel = function () {
            return "線幅";
        };
        EThemeDefaultJaJpEditorText.prototype.getTextAlignLabel = function () {
            return "配置";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignOutsideLeftTitle = function () {
            return "左外揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignLeftTitle = function () {
            return "左揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignCenterTitle = function () {
            return "中央揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignRightTitle = function () {
            return "右揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignOutsideRightTitle = function () {
            return "右外揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignOutsideTopTitle = function () {
            return "上外揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignTopTitle = function () {
            return "上揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignMiddleTitle = function () {
            return "上下中央揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignBottomTitle = function () {
            return "下揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonAlignOutsideBottomTitle = function () {
            return "下外揃え";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonDirectionLeftToRightTitle = function () {
            return "左から右";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonDirectionTopToBottomTitle = function () {
            return "上から下";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonDirectionBottomToTopTitle = function () {
            return "下から上";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonDirectionRightToLeftTitle = function () {
            return "右から左";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonClippingLabel = function () {
            return "クリッピング";
        };
        EThemeDefaultJaJpEditorText.prototype.getButtonFittingLabel = function () {
            return "フィッティング";
        };
        EThemeDefaultJaJpEditorText.prototype.getTextSpacingLabel = function () {
            return "文字間隔";
        };
        EThemeDefaultJaJpEditorText.prototype.getTextPaddingLabel = function () {
            return "パティング";
        };
        EThemeDefaultJaJpEditorText.prototype.getTextOffsetLabel = function () {
            return "オフセット";
        };
        return EThemeDefaultJaJpEditorText;
    }(EThemeDefaultEditorText));

    var EThemeDefaultJaJpEditorTree = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorTree, _super);
        function EThemeDefaultJaJpEditorTree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorTree.prototype.getLabel = function () {
            return "ツリー";
        };
        EThemeDefaultJaJpEditorTree.prototype.getButtonBringToFrontTitle = function () {
            return toLabel("最前面へ移動", this.getButtonBringToFrontShortcut());
        };
        EThemeDefaultJaJpEditorTree.prototype.getButtonBringForwardTitle = function () {
            return toLabel("前面へ移動", this.getButtonBringForwardShortcut());
        };
        EThemeDefaultJaJpEditorTree.prototype.getButtonSendBackwardTitle = function () {
            return toLabel("背面へ移動", this.getButtonSendBackwardShortcut());
        };
        EThemeDefaultJaJpEditorTree.prototype.getButtonSendToBackTitle = function () {
            return toLabel("最背面へ移動", this.getButtonSendToBackShortcut());
        };
        return EThemeDefaultJaJpEditorTree;
    }(EThemeDefaultEditorTree));

    var EThemeDefaultJaJpEditorValidation = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpEditorValidation, _super);
        function EThemeDefaultJaJpEditorValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpEditorValidation.prototype.getLabel = function () {
            return "検証";
        };
        EThemeDefaultJaJpEditorValidation.prototype.getButtonRevalidateTitle = function () {
            return "再検証";
        };
        return EThemeDefaultJaJpEditorValidation;
    }(EThemeDefaultEditorValidation));

    var EThemeDefaultJaJpShapeActionValue = /** @class */ (function (_super) {
        __extends(EThemeDefaultJaJpShapeActionValue, _super);
        function EThemeDefaultJaJpShapeActionValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EThemeDefaultJaJpShapeActionValue.prototype.toTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueType.SHOW_HIDE:
                    return "表示切替";
                case wcardinalUi.EShapeActionValueType.BLINK:
                    return "点滅";
                case wcardinalUi.EShapeActionValueType.TRANSFORM:
                    return "移動・回転・拡大縮小";
                case wcardinalUi.EShapeActionValueType.OPEN:
                    return "開く";
                case wcardinalUi.EShapeActionValueType.CHANGE_COLOR:
                case wcardinalUi.EShapeActionValueType.CHANGE_COLOR_LEGACY:
                    return "色変更";
                case wcardinalUi.EShapeActionValueType.CHANGE_TEXT:
                    return "テキスト変更";
                case wcardinalUi.EShapeActionValueType.CHANGE_CURSOR:
                    return "カーソル変更";
                case wcardinalUi.EShapeActionValueType.EMIT_EVENT:
                    return "イベント発火";
                case wcardinalUi.EShapeActionValueType.GESTURE:
                    return "操作";
                case wcardinalUi.EShapeActionValueType.MISC:
                    return "その他";
                default:
                    if (wcardinalUi.EShapeActionValueType.EXTENSION <= type) {
                        return "拡張";
                    }
                    else {
                        return "不明";
                    }
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toBlinkTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueBlinkType.VISIBILITY:
                    return "表示切替";
                case wcardinalUi.EShapeActionValueBlinkType.BRIGHTEN:
                    return "明るく";
                case wcardinalUi.EShapeActionValueBlinkType.DARKEN:
                    return "暗く";
                case wcardinalUi.EShapeActionValueBlinkType.OPACITY:
                    return "透明度";
                case wcardinalUi.EShapeActionValueBlinkType.COLOR_FILL:
                    return "塗り";
                case wcardinalUi.EShapeActionValueBlinkType.COLOR_STROKE:
                    return "境界線";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toShowHideTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueShowHideType.SHAPE_SHOW:
                    return "表示";
                case wcardinalUi.EShapeActionValueShowHideType.SHAPE_HIDE:
                    return "非表示";
                case wcardinalUi.EShapeActionValueShowHideType.SHAPE:
                    return "シェイプ";
                case wcardinalUi.EShapeActionValueShowHideType.LAYER:
                    return "レイヤー";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toTransformTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueTransformType.MOVE:
                    return "移動";
                case wcardinalUi.EShapeActionValueTransformType.ROTATE:
                    return "回転";
                case wcardinalUi.EShapeActionValueTransformType.RESIZE:
                    return "拡大縮小";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toTransformRotateTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueTransformRotateType.RELATIVE:
                    return "相対角度";
                case wcardinalUi.EShapeActionValueTransformRotateType.ABSOLUTE:
                    return "絶対角度";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toTransformMoveTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueTransformMoveType.RELATIVE_X:
                    return "相対X座標";
                case wcardinalUi.EShapeActionValueTransformMoveType.RELATIVE_Y:
                    return "相対Y座標";
                case wcardinalUi.EShapeActionValueTransformMoveType.ABSOLUTE_X:
                    return "絶対X座標";
                case wcardinalUi.EShapeActionValueTransformMoveType.ABSOLUTE_Y:
                    return "絶対Y座標";
                case wcardinalUi.EShapeActionValueTransformMoveType.FORWARD_OR_BACKWARD:
                    return "前後";
                case wcardinalUi.EShapeActionValueTransformMoveType.LEFT_OR_RIGHT:
                    return "左右";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toTransformResizeTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueTransformResizeType.ABSOLUTE_SIZE:
                    return "幅と高さ";
                case wcardinalUi.EShapeActionValueTransformResizeType.RELATIVE_SIZE:
                    return "幅と高さ（％）";
                case wcardinalUi.EShapeActionValueTransformResizeType.ABSOLUTE_HEIGHT:
                    return "高さ";
                case wcardinalUi.EShapeActionValueTransformResizeType.RELATIVE_HEIGHT:
                    return "高さ（％）";
                case wcardinalUi.EShapeActionValueTransformResizeType.ABSOLUTE_WIDTH:
                    return "幅";
                case wcardinalUi.EShapeActionValueTransformResizeType.RELATIVE_WIDTH:
                    return "幅（％）";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toChangeColorTypeValueLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueChangeColorType.NONE:
                    return "無し";
                case wcardinalUi.EShapeActionValueChangeColorType.FILL:
                    return "塗り";
                case wcardinalUi.EShapeActionValueChangeColorType.STROKE:
                    return "境界線";
                case wcardinalUi.EShapeActionValueChangeColorType.TEXT:
                    return "テキスト";
                case wcardinalUi.EShapeActionValueChangeColorType.TEXT_OUTLINE:
                    return "テキスト境界線";
            }
            return "不明";
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toChangeColorTargetLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA:
                    return "色";
                case wcardinalUi.EShapeActionValueChangeColorTarget.COLOR:
                    return "RGB";
                case wcardinalUi.EShapeActionValueChangeColorTarget.ALPHA:
                    return "透明度";
                case wcardinalUi.EShapeActionValueChangeColorTarget.CODE:
                    return "色（動的）";
                case wcardinalUi.EShapeActionValueChangeColorTarget.BRIGHTNESS:
                    return "明るさ";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toChangeTextTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueChangeTextType.TEXT:
                    return "テキスト";
                case wcardinalUi.EShapeActionValueChangeTextType.NUMBER:
                    return "数値";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toOpenTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueOpenType.DIAGRAM_LEGACY:
                    return "グラフィック";
                case wcardinalUi.EShapeActionValueOpenType.PAGE_LEGACY:
                    return "ページ（新規ウィンドウ）";
                case wcardinalUi.EShapeActionValueOpenType.PAGE_INPLACE_LEGACY:
                    return "ページ（現在のウィンドウ）";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG_TEXT:
                    return "ダイアログ（テキスト）";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG_INTEGER:
                    return "ダイアログ（整数）";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG_REAL:
                    return "ダイアログ（実数）";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG_BOOLEAN:
                    return "ダイアログ（真偽値）";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG_DATE:
                    return "ダイアログ（日付）";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG_TIME:
                    return "ダイアログ（時刻）";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG_DATETIME:
                    return "ダイアログ（日時）";
                case wcardinalUi.EShapeActionValueOpenType.DIAGRAM:
                    return "グラフィック";
                case wcardinalUi.EShapeActionValueOpenType.PAGE:
                    return "ページ";
                case wcardinalUi.EShapeActionValueOpenType.DIALOG:
                    return "ダイアログ";
                default:
                    if (wcardinalUi.EShapeActionValueOpenType.EXTENSION <= type) {
                        var extension = wcardinalUi.EShapeActionOpenExtensions.get(type);
                        if (extension) {
                            return extension.label;
                        }
                        return "拡張";
                    }
                    else {
                        return "不明";
                    }
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toOpenDialogTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueOpenDialogType.TEXT:
                    return "テキスト";
                case wcardinalUi.EShapeActionValueOpenDialogType.INTEGER:
                    return "整数";
                case wcardinalUi.EShapeActionValueOpenDialogType.REAL:
                    return "実数";
                case wcardinalUi.EShapeActionValueOpenDialogType.BOOLEAN:
                    return "真偽値";
                case wcardinalUi.EShapeActionValueOpenDialogType.DATE:
                    return "日付";
                case wcardinalUi.EShapeActionValueOpenDialogType.TIME:
                    return "時刻";
                case wcardinalUi.EShapeActionValueOpenDialogType.DATETIME:
                    return "日時";
                default:
                    if (wcardinalUi.EShapeActionValueOpenDialogType.EXTENSION <= type) {
                        var extension = wcardinalUi.EShapeActionOpenDialogExtensions.get(type);
                        if (extension) {
                            return extension.label;
                        }
                        return "拡張";
                    }
                    else {
                        return "不明";
                    }
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toGestureTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueGestureType.SHAPE:
                    return "シェイプ";
                case wcardinalUi.EShapeActionValueGestureType.LAYER:
                    return "レイヤー";
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toGestureOperationTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueGestureOperationType.DRAG:
                    return "ドラッグ";
                case wcardinalUi.EShapeActionValueGestureOperationType.PINCH:
                    return "ピンチ";
            }
            return "不明";
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toMiscTypeLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueMiscType.INPUT_TEXT:
                    return "入力（テキスト）";
                case wcardinalUi.EShapeActionValueMiscType.INPUT_INTEGER:
                    return "入力（整数）";
                case wcardinalUi.EShapeActionValueMiscType.INPUT_REAL:
                    return "入力（実数）";
                case wcardinalUi.EShapeActionValueMiscType.EMIT_EVENT:
                    return this.toOnInputActionLabel(wcardinalUi.EShapeActionValueOnInputAction.EMIT_EVENT);
                case wcardinalUi.EShapeActionValueMiscType.WRITE_BOTH:
                    return this.toOnInputActionLabel(wcardinalUi.EShapeActionValueOnInputAction.WRITE_BOTH);
                case wcardinalUi.EShapeActionValueMiscType.WRITE_LOCAL:
                    return this.toOnInputActionLabel(wcardinalUi.EShapeActionValueOnInputAction.WRITE_LOCAL);
                case wcardinalUi.EShapeActionValueMiscType.WRITE_REMOTE:
                    return this.toOnInputActionLabel(wcardinalUi.EShapeActionValueOnInputAction.WRITE_REMOTE);
                case wcardinalUi.EShapeActionValueMiscType.HTML_ELEMENT:
                    return "HTML要素";
                case wcardinalUi.EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
                    return "HTML要素（ポインター無効）";
                case wcardinalUi.EShapeActionValueMiscType.SHOW_HIDE_LAYER:
                    return "レイヤー表示切替";
                case wcardinalUi.EShapeActionValueMiscType.GESTURE_LAYER:
                    return "レイヤー操作";
                case wcardinalUi.EShapeActionValueMiscType.GESTURE:
                    return "操作";
                case wcardinalUi.EShapeActionValueMiscType.EXECUTE:
                    return "実行";
                default:
                    if (wcardinalUi.EShapeActionValueMiscType.EXTENSION <= type) {
                        var extension = wcardinalUi.EShapeActionMiscExtensions.get(type);
                        if (extension) {
                            return extension.label;
                        }
                        return "拡張";
                    }
                    else {
                        return "不明";
                    }
            }
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toHtmlElementWhenLabel = function (when) {
            switch (when) {
                case wcardinalUi.UtilHtmlElementWhen.CLICKED:
                    return "クリック時";
                case wcardinalUi.UtilHtmlElementWhen.DOUBLE_CLICKED:
                    return "ダブルクリック時";
                case wcardinalUi.UtilHtmlElementWhen.FOCUSED:
                    return "フォーカス時";
                case wcardinalUi.UtilHtmlElementWhen.ALWAYS:
                    return "常時";
            }
            return "不明";
        };
        EThemeDefaultJaJpShapeActionValue.prototype.toOnInputActionLabel = function (type) {
            switch (type) {
                case wcardinalUi.EShapeActionValueOnInputAction.EMIT_EVENT:
                    return "イベント発火";
                case wcardinalUi.EShapeActionValueOnInputAction.WRITE_BOTH:
                    return "書込み（両方）";
                case wcardinalUi.EShapeActionValueOnInputAction.WRITE_LOCAL:
                    return "書込み（ローカル）";
                case wcardinalUi.EShapeActionValueOnInputAction.WRITE_REMOTE:
                    return "書込み（リモート）";
            }
            return "不明";
        };
        return EThemeDefaultJaJpShapeActionValue;
    }(EThemeDefaultShapeActionValue));

    var FThemeDefaultGraphicEditor = /** @class */ (function () {
        function FThemeDefaultGraphicEditor() {
            this._shapeType = wcardinalUi.DThemes.get("FShapeType");
        }
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonTheme = function () {
            return "EButtonToolFile";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonCreateShortcut = function () {
            return "Ctrl+M";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonOpenShortcut = function () {
            return "Ctrl+O";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonSaveShortcut = function () {
            return "Ctrl+S";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonSaveAsShortcut = function () {
            return "Ctrl+Shift+S";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonUploadShortcut = function () {
            return "Ctrl+U";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonDownloadShortcut = function () {
            return "Ctrl+Shift+U";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonUndoShortcut = function () {
            return "Ctrl+Z";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonRedoShortcut = function () {
            return "Ctrl+Y";
        };
        FThemeDefaultGraphicEditor.prototype.getToolFileButtonDeleteShortcut = function () {
            return "Ctrl+E";
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonTheme = function () {
            return "EButtonToolShape";
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonCircleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.CIRCLE);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonSemicircleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.SEMICIRCLE);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonRectangleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.RECTANGLE);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonRectangleRoundedTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.RECTANGLE_ROUNDED);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonTriangleTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.TRIANGLE);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonTriangleRoundedTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.TRIANGLE_ROUNDED);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonLineTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.LINE);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonLineConnectorTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.CONNECTOR_LINE);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonElbowConnectorTitle = function () {
            return this._shapeType.getLabel(wcardinalUi.EShapeType.CONNECTOR_ELBOW);
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonImageTitle = function () {
            return "".concat(this._shapeType.getLabel(wcardinalUi.EShapeType.IMAGE), "...");
        };
        FThemeDefaultGraphicEditor.prototype.getToolShapeButtonGraphicPieceTitle = function () {
            return "".concat(this._shapeType.getLabel(wcardinalUi.EShapeType.EMBEDDED), "...");
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonTheme = function () {
            return "EButtonEditor";
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonCoordinateTitle = function () {
            return wcardinalUi.DThemes.get("EEditorCoordinate").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonShapeTitle = function () {
            return wcardinalUi.DThemes.get("EEditorShape").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonTextTitle = function () {
            return wcardinalUi.DThemes.get("EEditorText").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonDataTitle = function () {
            return wcardinalUi.DThemes.get("EEditorData").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonDataMappingTitle = function () {
            return wcardinalUi.DThemes.get("EEditorDataMapping").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonActionTitle = function () {
            return wcardinalUi.DThemes.get("EEditorAction").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonTreeTitle = function () {
            return wcardinalUi.DThemes.get("EEditorTree").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonLayerTitle = function () {
            return wcardinalUi.DThemes.get("EEditorLayer").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonSnapTitle = function () {
            return wcardinalUi.DThemes.get("EEditorSnap").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonValidationTitle = function () {
            return wcardinalUi.DThemes.get("EEditorValidation").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonSearchTitle = function () {
            return wcardinalUi.DThemes.get("EEditorSearch").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getEditorButtonCanvasLegacyTitle = function () {
            return wcardinalUi.DThemes.get("EEditorCanvasLegacy").getLabel();
        };
        FThemeDefaultGraphicEditor.prototype.getViewButtonTheme = function () {
            return "EButtonView";
        };
        FThemeDefaultGraphicEditor.prototype.getViewButtonZoomOutShortcut = function () {
            return "Ctrl+Alt+Minus";
        };
        FThemeDefaultGraphicEditor.prototype.getViewButtonZoomInShortcut = function () {
            return "Ctrl+Alt+Plus";
        };
        FThemeDefaultGraphicEditor.prototype.getViewButtonZoomInShortcuts = function () {
            return ["Ctrl+Alt+;", "Ctrl+Alt+Shift+Plus"];
        };
        FThemeDefaultGraphicEditor.prototype.getViewButtonDragAndPinchShortcut = function () {
            return "Ctrl+Alt+D";
        };
        FThemeDefaultGraphicEditor.prototype.getViewButtonResetShortcut = function () {
            return "Ctrl+Alt+R";
        };
        FThemeDefaultGraphicEditor.prototype.getViewButtonFitShortcut = function () {
            return "Ctrl+Alt+F";
        };
        FThemeDefaultGraphicEditor.prototype.getIconBuilder = function () {
            return iconBuilder;
        };
        FThemeDefaultGraphicEditor.prototype.getMargin = function () {
            return 8;
        };
        return FThemeDefaultGraphicEditor;
    }());

    var FThemeDefaultJaJpGraphicEditor = /** @class */ (function (_super) {
        __extends(FThemeDefaultJaJpGraphicEditor, _super);
        function FThemeDefaultJaJpGraphicEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonCreateTitle = function () {
            return toLabel("新規作成...", this.getToolFileButtonCreateShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonOpenTitle = function () {
            return toLabel("開く...", this.getToolFileButtonOpenShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonSaveTitle = function () {
            return toLabel("保存", this.getToolFileButtonSaveShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonSaveAsTitle = function () {
            return toLabel("名前を付けて保存...", this.getToolFileButtonSaveAsShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonUploadTitle = function () {
            return toLabel("アップロード...", this.getToolFileButtonUploadShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonDownloadTitle = function () {
            return toLabel("ダウンロード", this.getToolFileButtonDownloadShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonUndoTitle = function () {
            return toLabel("元に戻す", this.getToolFileButtonUndoShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonRedoTitle = function () {
            return toLabel("やり直す", this.getToolFileButtonRedoShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolFileButtonDeleteTitle = function () {
            return toLabel("削除...", this.getToolFileButtonDeleteShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getToolShapeButtonSelectTitle = function () {
            return "選択ツール";
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getViewButtonZoomOutTitle = function () {
            return toLabel("ズームアウト", this.getViewButtonZoomOutShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getViewButtonZoomInTitle = function () {
            return toLabel("ズームイン", this.getViewButtonZoomInShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getViewButtonDragAndPinchTitle = function () {
            return toLabel("ビュー操作モード", this.getViewButtonDragAndPinchShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getViewButtonResetTitle = function () {
            return toLabel("ビューのリセット", this.getViewButtonResetShortcut());
        };
        FThemeDefaultJaJpGraphicEditor.prototype.getViewButtonFitTitle = function () {
            return toLabel("ビューをスクリーンにフィットさせる", this.getViewButtonFitShortcut());
        };
        return FThemeDefaultJaJpGraphicEditor;
    }(FThemeDefaultGraphicEditor));

    var FThemeDefaultGraphicTester = /** @class */ (function () {
        function FThemeDefaultGraphicTester() {
            this._editorTheme = wcardinalUi.DThemes.get("FGraphicEditor");
        }
        FThemeDefaultGraphicTester.prototype.getToolFileButtonGraphicTheme = function () {
            return "EButtonToolFileGraphic";
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonGraphicOpenShortcut = function () {
            return this._editorTheme.getToolFileButtonOpenShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonTheme = function () {
            return this._editorTheme.getToolFileButtonTheme();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonCreateTitle = function () {
            return this._editorTheme.getToolFileButtonCreateTitle();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonCreateShortcut = function () {
            return this._editorTheme.getToolFileButtonCreateShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonOpenShortcut = function () {
            return "Ctrl+Alt+O";
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonUploadTitle = function () {
            return this._editorTheme.getToolFileButtonUploadTitle();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonUploadShortcut = function () {
            return this._editorTheme.getToolFileButtonUploadShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonDownloadTitle = function () {
            return this._editorTheme.getToolFileButtonDownloadTitle();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonDownloadShortcut = function () {
            return this._editorTheme.getToolFileButtonDownloadShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonSaveTitle = function () {
            return this._editorTheme.getToolFileButtonSaveTitle();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonSaveShortcut = function () {
            return this._editorTheme.getToolFileButtonSaveShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonDeleteTitle = function () {
            return this._editorTheme.getToolFileButtonDeleteTitle();
        };
        FThemeDefaultGraphicTester.prototype.getToolFileButtonDeleteShortcut = function () {
            return this._editorTheme.getToolFileButtonDeleteShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonTheme = function () {
            return this._editorTheme.getViewButtonTheme();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonZoomOutTitle = function () {
            return this._editorTheme.getViewButtonZoomOutTitle();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonZoomOutShortcut = function () {
            return this._editorTheme.getViewButtonZoomOutShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonZoomInTitle = function () {
            return this._editorTheme.getViewButtonZoomInTitle();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonZoomInShortcut = function () {
            return this._editorTheme.getViewButtonZoomInShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonZoomInShortcuts = function () {
            return this._editorTheme.getViewButtonZoomInShortcuts();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonResetTitle = function () {
            return this._editorTheme.getViewButtonResetTitle();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonResetShortcut = function () {
            return this._editorTheme.getViewButtonResetShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonDragAndPinchTitle = function () {
            return this._editorTheme.getViewButtonDragAndPinchTitle();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonDragAndPinchShortcut = function () {
            return this._editorTheme.getViewButtonDragAndPinchShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonFitTitle = function () {
            return this._editorTheme.getViewButtonFitTitle();
        };
        FThemeDefaultGraphicTester.prototype.getViewButtonFitShortcut = function () {
            return this._editorTheme.getViewButtonFitShortcut();
        };
        FThemeDefaultGraphicTester.prototype.getIconBuilder = function () {
            return this._editorTheme.getIconBuilder();
        };
        FThemeDefaultGraphicTester.prototype.getMargin = function () {
            return this._editorTheme.getMargin();
        };
        return FThemeDefaultGraphicTester;
    }());

    var FThemeDefaultJaJpGraphicTester = /** @class */ (function (_super) {
        __extends(FThemeDefaultJaJpGraphicTester, _super);
        function FThemeDefaultJaJpGraphicTester() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FThemeDefaultJaJpGraphicTester.prototype.getToolFileButtonGraphicOpenTitle = function () {
            return toLabel("グラフィックを開く...", this.getToolFileButtonGraphicOpenShortcut());
        };
        FThemeDefaultJaJpGraphicTester.prototype.getToolFileButtonOpenTitle = function () {
            return toLabel("マッピングを開く...", this.getToolFileButtonOpenShortcut());
        };
        FThemeDefaultJaJpGraphicTester.prototype.getInputNameLabel = function () {
            return "名称";
        };
        FThemeDefaultJaJpGraphicTester.prototype.getTableColumnDataLabel = function () {
            return "データ";
        };
        FThemeDefaultJaJpGraphicTester.prototype.getTableColumnValueLabel = function () {
            return "値";
        };
        FThemeDefaultJaJpGraphicTester.prototype.newDialogCreateTextValue = function () {
            return "名称未設定";
        };
        return FThemeDefaultJaJpGraphicTester;
    }(FThemeDefaultGraphicTester));

    var FThemeDefaultGraphicViewer = /** @class */ (function () {
        function FThemeDefaultGraphicViewer() {
            this._editorTheme = wcardinalUi.DThemes.get("FGraphicEditor");
            this._testerTheme = wcardinalUi.DThemes.get("FGraphicTester");
        }
        FThemeDefaultGraphicViewer.prototype.getToolFileButtonGraphicTheme = function () {
            return this._testerTheme.getToolFileButtonGraphicTheme();
        };
        FThemeDefaultGraphicViewer.prototype.getToolFileButtonGraphicOpenTitle = function () {
            return this._testerTheme.getToolFileButtonGraphicOpenTitle();
        };
        FThemeDefaultGraphicViewer.prototype.getToolFileButtonGraphicOpenShortcut = function () {
            return this._testerTheme.getToolFileButtonGraphicOpenShortcut();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonTheme = function () {
            return this._editorTheme.getViewButtonTheme();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonZoomOutTitle = function () {
            return this._editorTheme.getViewButtonZoomOutTitle();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonZoomOutShortcut = function () {
            return this._editorTheme.getViewButtonZoomOutShortcut();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonZoomInTitle = function () {
            return this._editorTheme.getViewButtonZoomInTitle();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonZoomInShortcut = function () {
            return this._editorTheme.getViewButtonZoomInShortcut();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonZoomInShortcuts = function () {
            return this._editorTheme.getViewButtonZoomInShortcuts();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonResetTitle = function () {
            return this._editorTheme.getViewButtonResetTitle();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonResetShortcut = function () {
            return this._editorTheme.getViewButtonResetShortcut();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonFitTitle = function () {
            return this._editorTheme.getViewButtonFitTitle();
        };
        FThemeDefaultGraphicViewer.prototype.getViewButtonFitShortcut = function () {
            return this._editorTheme.getViewButtonFitShortcut();
        };
        FThemeDefaultGraphicViewer.prototype.getIconBuilder = function () {
            return this._editorTheme.getIconBuilder();
        };
        FThemeDefaultGraphicViewer.prototype.getMargin = function () {
            return this._editorTheme.getMargin();
        };
        return FThemeDefaultGraphicViewer;
    }());

    var FThemeDefaultJaJpGraphicViewer = /** @class */ (function (_super) {
        __extends(FThemeDefaultJaJpGraphicViewer, _super);
        function FThemeDefaultJaJpGraphicViewer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FThemeDefaultJaJpGraphicViewer;
    }(FThemeDefaultGraphicViewer));

    var FThemeDefaultShapeType = /** @class */ (function () {
        function FThemeDefaultShapeType() {
        }
        return FThemeDefaultShapeType;
    }());

    var FThemeDefaultJaJpShapeType = /** @class */ (function (_super) {
        __extends(FThemeDefaultJaJpShapeType, _super);
        function FThemeDefaultJaJpShapeType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FThemeDefaultJaJpShapeType.prototype.getLabel = function (shapeType) {
            switch (shapeType) {
                case wcardinalUi.EShapeType.CIRCLE:
                    return "円";
                case wcardinalUi.EShapeType.RECTANGLE:
                    return "四角形";
                case wcardinalUi.EShapeType.RECTANGLE_ROUNDED:
                    return "四角形（角を丸める）";
                case wcardinalUi.EShapeType.TRIANGLE:
                    return "三角形";
                case wcardinalUi.EShapeType.TRIANGLE_ROUNDED:
                    return "三角形（角を丸める）";
                case wcardinalUi.EShapeType.LINE:
                    return "線";
                case wcardinalUi.EShapeType.IMAGE:
                    return "画像";
                case wcardinalUi.EShapeType.IMAGE_SDF:
                    return "SDF画像";
                case wcardinalUi.EShapeType.GROUP:
                    return "グループ";
                case wcardinalUi.EShapeType.BAR:
                    return "バー";
                case wcardinalUi.EShapeType.LABEL:
                    return "ラベル";
                case wcardinalUi.EShapeType.NULL:
                    return "Null";
                case wcardinalUi.EShapeType.GROUP_SHADOWED:
                    return "グループ";
                case wcardinalUi.EShapeType.LINE_OF_CIRCLES:
                    return "円群";
                case wcardinalUi.EShapeType.LINE_OF_RECTANGLES:
                    return "四角形群";
                case wcardinalUi.EShapeType.LINE_OF_RECTANGLE_ROUNDEDS:
                    return "四角形群（角を丸める）";
                case wcardinalUi.EShapeType.LINE_OF_TRIANGLES:
                    return "三角形群";
                case wcardinalUi.EShapeType.LINE_OF_TRIANGLE_ROUNDEDS:
                    return "三角形群（角を丸める）";
                case wcardinalUi.EShapeType.EMBEDDED:
                    return "グラフィックピース";
                case wcardinalUi.EShapeType.EMBEDDED_LAYER:
                    return "埋め込みレイヤー";
                case wcardinalUi.EShapeType.BUTTON:
                    return "ボタン";
                case wcardinalUi.EShapeType.RECTANGLE_PIVOTED:
                    return "四角形（ピボット変換）";
                case wcardinalUi.EShapeType.CONNECTOR_LINE:
                    return "コネクタ";
                case wcardinalUi.EShapeType.CONNECTOR_ELBOW:
                    return "コネクタ（カギ線）";
                case wcardinalUi.EShapeType.SEMICIRCLE:
                    return "半円";
                case wcardinalUi.EShapeType.EMBEDDED_ACCEPTOR_EDGE:
                    return "接続点";
                default:
                    if (wcardinalUi.EShapeType.EXTENSION <= shapeType) {
                        return "拡張";
                    }
            }
            return "不明";
        };
        return FThemeDefaultJaJpShapeType;
    }(FThemeDefaultShapeType));

    /*
     * Copyright (C) 2019 Toshiba Corporation
     * SPDX-License-Identifier: Apache-2.0
     */
    var loadThemeDefaultJaJpAll = function () {
        wcardinalUi.DThemes.setClass("FShapeType", FThemeDefaultJaJpShapeType);
        wcardinalUi.DThemes.setClass("EShapeActionValue", EThemeDefaultJaJpShapeActionValue);
        wcardinalUi.DThemes.setClass("EButtonEditor", EThemeDefaultButtonAmbient);
        wcardinalUi.DThemes.setClass("EButtonEditorLock", EThemeDefaultJaJpButtonLock);
        wcardinalUi.DThemes.setClass("EButtonEditorCheck", EThemeDefaultButtonCheck);
        wcardinalUi.DThemes.setClass("EButtonToolLayout", EThemeDefaultButtonToolLayout);
        wcardinalUi.DThemes.setClass("EButtonToolFileGraphic", EThemeDefaultButtonAmbient);
        wcardinalUi.DThemes.setClass("EButtonToolFile", EThemeDefaultButtonAmbient);
        wcardinalUi.DThemes.setClass("EButtonToolShape", EThemeDefaultButtonAmbient);
        wcardinalUi.DThemes.setClass("EButtonView", EThemeDefaultButtonAmbient);
        wcardinalUi.DThemes.setClass("EDialogAction", EThemeDefaultJaJpDialogAction);
        wcardinalUi.DThemes.setClass("EDialogCanvas", EThemeDefaultJaJpDialogCanvas);
        wcardinalUi.DThemes.setClass("EDialogDataMappingValue", EThemeDefaultJaJpDialogDataMappingValue);
        wcardinalUi.DThemes.setClass("EDialogDataValue", EThemeDefaultJaJpDialogDataValue);
        wcardinalUi.DThemes.setClass("EDialogLayer", EThemeDefaultJaJpDialogLayer);
        wcardinalUi.DThemes.setClass("EDialogSnap", EThemeDefaultJaJpDialogSnap);
        wcardinalUi.DThemes.setClass("EEditorButtonLayout", EThemeDefaultEditorButtonLayout);
        wcardinalUi.DThemes.setClass("EEditorAction", EThemeDefaultJaJpEditorAction);
        wcardinalUi.DThemes.setClass("EEditorCanvasLegacy", EThemeDefaultJaJpEditorCanvasLegacy);
        wcardinalUi.DThemes.setClass("EEditorCanvas", EThemeDefaultJaJpEditorCanvas);
        wcardinalUi.DThemes.setClass("EEditorCoordinate", EThemeDefaultJaJpEditorCoordinate);
        wcardinalUi.DThemes.setClass("EEditorDataMapping", EThemeDefaultJaJpEditorDataMapping);
        wcardinalUi.DThemes.setClass("EEditorData", EThemeDefaultJaJpEditorData);
        wcardinalUi.DThemes.setClass("EEditorLayer", EThemeDefaultJaJpEditorLayer);
        wcardinalUi.DThemes.setClass("EEditorLayout", EThemeDefaultEditorLayout);
        wcardinalUi.DThemes.setClass("EEditorPaneContent", EThemeDefaultEditorPaneContent);
        wcardinalUi.DThemes.setClass("EEditorPane", EThemeDefaultEditorPane);
        wcardinalUi.DThemes.setClass("EEditorSearch", EThemeDefaultJaJpEditorSearch);
        wcardinalUi.DThemes.setClass("EEditorShape", EThemeDefaultJaJpEditorShape);
        wcardinalUi.DThemes.setClass("EEditorSnap", EThemeDefaultJaJpEditorSnap);
        wcardinalUi.DThemes.setClass("EEditorText", EThemeDefaultJaJpEditorText);
        wcardinalUi.DThemes.setClass("EEditorTree", EThemeDefaultJaJpEditorTree);
        wcardinalUi.DThemes.setClass("EEditorValidation", EThemeDefaultJaJpEditorValidation);
        wcardinalUi.DThemes.setClass("EEditor", EThemeDefaultEditor);
        wcardinalUi.DThemes.setClass("FGraphicEditor", FThemeDefaultJaJpGraphicEditor);
        wcardinalUi.DThemes.setClass("FGraphicTester", FThemeDefaultJaJpGraphicTester);
        wcardinalUi.DThemes.setClass("FGraphicViewer", FThemeDefaultJaJpGraphicViewer);
        wcardinalUi.DThemes.setClass("EShapeButton", EThemeDefaultJaJpShapeButton);
        wcardinalUi.DThemes.setClass("EEditorShapeButton", ESubthemeDefaultJaJpEditorShapeButton);
        wcardinalUi.DThemes.setClass("EShapeButtonLayer", EThemeDefaultJaJpShapeButtonLayer);
        wcardinalUi.DThemes.setClass("EDialogShapeButtonLayerValue", EThemeDefaultJaJpDialogShapeButtonLayerValue);
        wcardinalUi.DThemes.setClass("EEditorShapeButtonLayer", ESubthemeDefaultJaJpEditorShapeButtonLayer);
        wcardinalUi.DThemes.setClass("EShapeChartLine", EThemeDefaultJaJpShapeChartLine);
        wcardinalUi.DThemes.setClass("EEditorShapeChartLine", ESubthemeDefaultJaJpEditorShapeChartLine);
        wcardinalUi.DThemes.setClass("EShapeEmbeddedAcceptorEdge", EThemeDefaultJaJpShapeEmbeddedAcceptorEdge);
        wcardinalUi.DThemes.setClass("EEditorShapeEmbeddedAcceptorEdge", ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge);
        wcardinalUi.DThemes.setClass("EShapeInput", EThemeDefaultJaJpShapeInput);
        wcardinalUi.DThemes.setClass("EShapeTable", EThemeDefaultJaJpShapeTable);
        wcardinalUi.DThemes.setClass("EDialogShapeTableColumn", EThemeDefaultJaJpDialogShapeTableColumn);
        wcardinalUi.DThemes.setClass("EEditorShapeTable", ESubthemeDefaultJaJpEditorShapeTable);
    };

    var d = {
        __proto__: null,
        ESubthemeDefaultEditorShapeButton: ESubthemeDefaultEditorShapeButton,
        ESubthemeDefaultEditorShapeButtonLayer: ESubthemeDefaultEditorShapeButtonLayer,
        ESubthemeDefaultEditorShapeChartLine: ESubthemeDefaultEditorShapeChartLine,
        ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge: ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge,
        ESubthemeDefaultEditorShapeTable: ESubthemeDefaultEditorShapeTable,
        ESubthemeDefaultJaJpEditorShapeButton: ESubthemeDefaultJaJpEditorShapeButton,
        ESubthemeDefaultJaJpEditorShapeButtonLayer: ESubthemeDefaultJaJpEditorShapeButtonLayer,
        ESubthemeDefaultJaJpEditorShapeChartLine: ESubthemeDefaultJaJpEditorShapeChartLine,
        ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge: ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge,
        ESubthemeDefaultJaJpEditorShapeTable: ESubthemeDefaultJaJpEditorShapeTable,
        EThemeDefaultButtonAmbient: EThemeDefaultButtonAmbient,
        EThemeDefaultButtonCheck: EThemeDefaultButtonCheck,
        EThemeDefaultButtonLock: EThemeDefaultButtonLock,
        EThemeDefaultButtonToolLayout: EThemeDefaultButtonToolLayout,
        EThemeDefaultDialogAction: EThemeDefaultDialogAction,
        EThemeDefaultDialogCanvas: EThemeDefaultDialogCanvas,
        EThemeDefaultDialogDataMappingValue: EThemeDefaultDialogDataMappingValue,
        EThemeDefaultDialogDataValue: EThemeDefaultDialogDataValue,
        EThemeDefaultDialogLayer: EThemeDefaultDialogLayer,
        EThemeDefaultDialogShapeButtonLayerValue: EThemeDefaultDialogShapeButtonLayerValue,
        EThemeDefaultDialogShapeTableColumn: EThemeDefaultDialogShapeTableColumn,
        EThemeDefaultDialogSnap: EThemeDefaultDialogSnap,
        EThemeDefaultEditor: EThemeDefaultEditor,
        EThemeDefaultEditorAction: EThemeDefaultEditorAction,
        EThemeDefaultEditorButtonLayout: EThemeDefaultEditorButtonLayout,
        EThemeDefaultEditorCanvas: EThemeDefaultEditorCanvas,
        EThemeDefaultEditorCanvasLegacy: EThemeDefaultEditorCanvasLegacy,
        EThemeDefaultEditorCoordinate: EThemeDefaultEditorCoordinate,
        EThemeDefaultEditorData: EThemeDefaultEditorData,
        EThemeDefaultEditorDataMapping: EThemeDefaultEditorDataMapping,
        EThemeDefaultEditorLayer: EThemeDefaultEditorLayer,
        EThemeDefaultEditorLayout: EThemeDefaultEditorLayout,
        EThemeDefaultEditorPane: EThemeDefaultEditorPane,
        EThemeDefaultEditorPaneContent: EThemeDefaultEditorPaneContent,
        EThemeDefaultEditorSearch: EThemeDefaultEditorSearch,
        EThemeDefaultEditorShape: EThemeDefaultEditorShape,
        EThemeDefaultEditorSnap: EThemeDefaultEditorSnap,
        EThemeDefaultEditorText: EThemeDefaultEditorText,
        EThemeDefaultEditorTree: EThemeDefaultEditorTree,
        EThemeDefaultEditorValidation: EThemeDefaultEditorValidation,
        EThemeDefaultJaJpButtonLock: EThemeDefaultJaJpButtonLock,
        EThemeDefaultJaJpDialogAction: EThemeDefaultJaJpDialogAction,
        EThemeDefaultJaJpDialogCanvas: EThemeDefaultJaJpDialogCanvas,
        EThemeDefaultJaJpDialogDataMappingValue: EThemeDefaultJaJpDialogDataMappingValue,
        EThemeDefaultJaJpDialogDataValue: EThemeDefaultJaJpDialogDataValue,
        EThemeDefaultJaJpDialogLayer: EThemeDefaultJaJpDialogLayer,
        EThemeDefaultJaJpDialogShapeButtonLayerValue: EThemeDefaultJaJpDialogShapeButtonLayerValue,
        EThemeDefaultJaJpDialogShapeTableColumn: EThemeDefaultJaJpDialogShapeTableColumn,
        EThemeDefaultJaJpDialogSnap: EThemeDefaultJaJpDialogSnap,
        EThemeDefaultJaJpEditorAction: EThemeDefaultJaJpEditorAction,
        EThemeDefaultJaJpEditorCanvas: EThemeDefaultJaJpEditorCanvas,
        EThemeDefaultJaJpEditorCanvasLegacy: EThemeDefaultJaJpEditorCanvasLegacy,
        EThemeDefaultJaJpEditorCoordinate: EThemeDefaultJaJpEditorCoordinate,
        EThemeDefaultJaJpEditorData: EThemeDefaultJaJpEditorData,
        EThemeDefaultJaJpEditorDataMapping: EThemeDefaultJaJpEditorDataMapping,
        EThemeDefaultJaJpEditorLayer: EThemeDefaultJaJpEditorLayer,
        EThemeDefaultJaJpEditorSearch: EThemeDefaultJaJpEditorSearch,
        EThemeDefaultJaJpEditorShape: EThemeDefaultJaJpEditorShape,
        EThemeDefaultJaJpEditorSnap: EThemeDefaultJaJpEditorSnap,
        EThemeDefaultJaJpEditorText: EThemeDefaultJaJpEditorText,
        EThemeDefaultJaJpEditorTree: EThemeDefaultJaJpEditorTree,
        EThemeDefaultJaJpEditorValidation: EThemeDefaultJaJpEditorValidation,
        EThemeDefaultJaJpShapeActionValue: EThemeDefaultJaJpShapeActionValue,
        EThemeDefaultJaJpShapeButton: EThemeDefaultJaJpShapeButton,
        EThemeDefaultJaJpShapeButtonLayer: EThemeDefaultJaJpShapeButtonLayer,
        EThemeDefaultJaJpShapeChartLine: EThemeDefaultJaJpShapeChartLine,
        EThemeDefaultJaJpShapeEmbeddedAcceptorEdge: EThemeDefaultJaJpShapeEmbeddedAcceptorEdge,
        EThemeDefaultJaJpShapeInput: EThemeDefaultJaJpShapeInput,
        EThemeDefaultJaJpShapeTable: EThemeDefaultJaJpShapeTable,
        EThemeDefaultShapeActionValue: EThemeDefaultShapeActionValue,
        FThemeDefaultGraphicEditor: FThemeDefaultGraphicEditor,
        FThemeDefaultGraphicTester: FThemeDefaultGraphicTester,
        FThemeDefaultGraphicViewer: FThemeDefaultGraphicViewer,
        FThemeDefaultJaJpGraphicEditor: FThemeDefaultJaJpGraphicEditor,
        FThemeDefaultJaJpGraphicTester: FThemeDefaultJaJpGraphicTester,
        FThemeDefaultJaJpGraphicViewer: FThemeDefaultJaJpGraphicViewer,
        FThemeDefaultJaJpShapeType: FThemeDefaultJaJpShapeType,
        FThemeDefaultShapeType: FThemeDefaultShapeType,
        iconBuilder: iconBuilder,
        loadThemeDefaultJaJpAll: loadThemeDefaultJaJpAll
    };

    /*
     * Copyright (C) 2019 Toshiba Corporation
     * SPDX-License-Identifier: Apache-2.0
     */
    loadThemeDefaultJaJpAll();
    var global = window;
    global.wcardinal = global.wcardinal || {};
    var dest = (global.wcardinal.geditor = global.wcardinal.geditor || {});
    var src = d;
    for (var name_1 in src) {
        dest[name_1] = src[name_1];
    }

})(wcardinal.ui, PIXI);
