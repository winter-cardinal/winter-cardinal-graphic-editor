(function (common) {
    'use strict';

	// サムネイル画像のＵＲＬを返却する関数
	common.toThumbnail = function() {
		return "../../resource/thumbnail/" + Math.floor(Math.random() * 3) + "@2x.svg";
	};

	// グラフィックピースのサムネイル画像のURLを返却する関数
	common.toPieceThumbnail = function() {
		return "../../resource/thumbnail/2@2x.svg";
	};
})(window.common ||= {});
