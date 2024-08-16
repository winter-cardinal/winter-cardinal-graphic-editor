(function (common) {
    'use strict';

	// コネクタ用のヘルパー
	common.Connectors = {
		isConnector: function (shape) {
			return (shape instanceof wcardinal.ui.EShapeConnectorLine || shape instanceof wcardinal.ui.EShapeConnectorElbow);
		},

		isConnectedTo: function (shape, type) {
			return (
				shape.edge.head.acceptor.shape.type === type ||
				shape.edge.tail.acceptor.shape.type === type
			);
		}
	};
}(window.common ||= {}));
