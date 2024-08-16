(function (common) {
    'use strict';

	// テスト用データ（どのシェイプのどのセンサーにどの様な値を割り当てるかを記述したJSON）
	// の入出力を担当するコントローラです
	common.graphicTesterController = {
		search: function( graphicName, word ) {
			return Promise.resolve([]);
		},

		get: function( id ) {
			return Promise.reject( "not-found" );
		},

		save: function( data ) {
			return Promise.resolve( "Id" );
		},

		delete: function( id ) {
			return Promise.resolve();
		}
	};
})(window.common ||= {});
