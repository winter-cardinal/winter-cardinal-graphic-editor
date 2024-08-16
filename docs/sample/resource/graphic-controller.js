(function (common) {
    'use strict';

	// 図面のデータ（グラフィックと呼称、JSON形式）の入出力を担当するグラフィックコントローラ
	common.graphicController = {
		search: function( word, categoryId ) {
			// 図面データ（JSON）のリストを検索するときに呼び出されます
			// wordには検索文字列が渡されます
			// categoryIdには図面のカテゴリID、またはnull / undefinedが指定されます
			// categoryIdがnull / undefinedの場合は、全ての図面を検索対象としてください
			// Promise<Array<{ id: any, name: string }>>を返却してください
			// idは各データを識別するために使用され、nameは表示名称として使用されます
			// nameは省略可能で、省略時はidが表示名称として使用されます
			return fetch("../../resource/graphic/index.json")
			.then(function(response){
				return response.json();
			})
			.then(function(json){
				return json.filter(function( id ){
					return word.length <= 0 || 0 <= id.indexOf( word );
				})
				.map(function( id ) {
					return {
						id: id
					};
				});
			});
		},
		get: function( id ) {
			// 図面データ（JSON）を取得するときに呼び出されます
			// 引数idはsearchメソッドの返却値のidに対応します
			// 戻り値はPromise<Object>です
			// 本サンプルではfetchを使用しておりますが、
			// fetchに対応しないブラウザを使用される場合は
			// XHRを使用する等の代替手段を使用してください
			return fetch( "../../resource/graphic/" + id + ".json" ).then(function( response ) {
				return response.json();
			});
		},
		getByName: function( name ) {
			// この関数はopenアクションやグラフィックピース読み込み時に呼び出されます
			// nameは文字列で、nameで識別される図面データ（JSON）をPromiseで
			// 返却してください
			return fetch( "../../resource/graphic/" + name + ".json" ).then(function( response ) {
				return response.json();
			});
		},
		save: function( data ) {
			// 図面データ（JSON）であるdataを保存するときに呼び出されます
			// Promise<ID>を返却してください
			// IDはsearchメソッドの返却値のidに対応します
			return Promise.resolve( "Meter" );
		},
		delete: function( id ) {
			// 図面データ（JSON）を削除する時に呼び出されます
			// 引数idはsearchメソッドの返却値のidに対応します
			// Promise<void>を返却してください
			return Promise.resolve();
		}
	};

	// 図面にサブ図面を埋め込む際のコントローラを指定します
	// ここでは自分自身を指定しています
	common.graphicController.piece = common.graphicController;
})(window.common ||= {});
