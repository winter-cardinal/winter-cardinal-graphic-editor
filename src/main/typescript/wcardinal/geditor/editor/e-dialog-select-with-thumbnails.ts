import {
	DDialogSelect,
	DDialogSelectController,
	DDialogSelectListItem,
	DDialogSelectOptions,
	DListItem,
	isString,
	toSvgTexture
} from "@wcardinal/wcardinal-ui";
import { DisplayObject, Texture } from "pixi.js";

export interface EDialogSelectWithThumbnailsItem {
	id: number;
}

let dialogSelectThumbnailSize = 128;
export const getDialogSelectThumbnailSize = (): number => {
	return dialogSelectThumbnailSize;
};

export const setDialogSelectThumbnailSize = (size: number): void => {
	dialogSelectThumbnailSize = size;
};

let dialogSelectTHumbnailNotFound: Texture | undefined;
export const getDialogSelectThumbnailNotFound = (): Texture => {
	let result = dialogSelectTHumbnailNotFound;
	if (result == null) {
		result = newDialogTHumbnailNotFound();
		dialogSelectTHumbnailNotFound = result;
	}
	return result;
};

export const newDialogTHumbnailNotFound = (): Texture => {
	const thumbnailSize = getDialogSelectThumbnailSize();
	const resolution = window.devicePixelRatio || 1;
	const svgSize = thumbnailSize * resolution;
	return toSvgTexture(
		`<svg xmlns="http://www.w3.org/2000/svg" height="${svgSize}px" width="${svgSize}px" viewBox="0 0 24 24" fill="#000000" fill-opacity="0.05">` +
			`<path d="M19,5v11.17l2,2V5c0-1.1-0.9-2-2-2H5.83l2,2H19z"/>` +
			`<path d="M2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61l1.41-1.41L2.81,2.81z M5,19V7.83l7.07,7.07L11.25,16 L9,13l-3,4h8.17l2,2H5z"/>` +
			`</svg>`,
		resolution
	);
};

export const newDialogSelectWithThumbnailsOptions = <ITEM extends EDialogSelectWithThumbnailsItem>(
	controller: DDialogSelectController<ITEM, string>,
	toThumbnail?: (id: number) => string | Texture | DisplayObject | undefined,
	onSelect?: (value: ITEM) => void
): DDialogSelectOptions<ITEM, string> => {
	const thumbnailSize = getDialogSelectThumbnailSize();
	const thumbnailNotFound = getDialogSelectThumbnailNotFound();
	const itemPadding = 8;
	const itemLabelHeight = 30;
	const itemSize = itemPadding + thumbnailSize + itemLabelHeight + itemPadding;
	const textures = new Map<string, Texture>();
	const items = new Set<DListItem<ITEM>>();
	const toImage = (item: ITEM): Texture | DisplayObject | undefined => {
		if (toThumbnail) {
			const image = toThumbnail(item.id);
			if (isString(image)) {
				let texture = textures.get(image);
				if (texture == null) {
					const newTexture = Texture.from(image);
					newTexture.baseTexture.on("error", (): void => {
						checkTextures(newTexture, image);
					});
					texture = newTexture;
					textures.set(image, newTexture);
				}
				return texture;
			} else if (image != null) {
				return image as any;
			}
		}
		return thumbnailNotFound;
	};
	const openTextures = (): void => {
		items.forEach((item): void => {
			const value = item.value;
			if (value != null) {
				item.image = toImage(value);
			}
		});
	};
	let clearTimeoutId: number | null = null;
	const clearTextures = (): void => {
		items.forEach((item): void => {
			item.image = null;
		});
		textures.forEach((texture, url): void => {
			if (texture !== thumbnailNotFound) {
				const baseTexture = texture.baseTexture;
				texture.destroy();
				if (baseTexture) {
					baseTexture.destroy();
					baseTexture.off("error");
				}
			}
		});
		textures.clear();
	};
	const checkTextures = (texture: Texture, url: string): void => {
		if (texture !== thumbnailNotFound && !texture.valid) {
			items.forEach((item): void => {
				const image = item.image.get(0);
				if (image != null && image.source === texture) {
					image.source = thumbnailNotFound;
				}
			});

			const baseTexture = texture.baseTexture;
			texture.destroy();
			if (baseTexture) {
				baseTexture.destroy();
				baseTexture.off("error");
			}

			textures.set(url, thumbnailNotFound);
		}
	};
	return {
		width: "auto",
		height: "auto",
		layout: {
			width: "auto",
			height: "auto"
		},
		content: {
			width: "auto",
			height: "auto"
		},
		list: {
			width: itemSize * 3,
			height: itemSize * 2 + itemPadding * 4,
			data: {
				toImage
			},
			updater: {
				newItem: function (data) {
					const result = new DDialogSelectListItem<ITEM>(data, {
						width: itemSize,
						height: itemSize,
						padding: itemPadding,
						text: {
							align: {
								vertical: "BOTTOM",
								horizontal: "CENTER"
							}
						},
						image: {
							align: {
								vertical: "TOP",
								horizontal: "CENTER",
								with: "PADDING"
							},
							margin: {
								vertical: 0
							},
							tint: {
								color: 0xffffff,
								alpha: 1.0
							}
						}
					});
					items.add(result);
					return result;
				}
			}
		},
		controller,
		on: {
			open: (): void => {
				if (clearTimeoutId != null) {
					window.clearTimeout(clearTimeoutId);
					clearTimeoutId = null;
					clearTextures();
				}
				openTextures();
			},
			close: (): void => {
				if (clearTimeoutId == null) {
					clearTimeoutId = window.setTimeout((): void => {
						clearTimeoutId = null;
						clearTextures();
					}, 1000);
				}
			},
			select: onSelect
		}
	};
};

export const newDialogSelectWithThumbnails = <ITEM extends EDialogSelectWithThumbnailsItem>(
	controller: DDialogSelectController<ITEM, string>,
	toThumbnail?: (id: number) => string | Texture | DisplayObject | undefined,
	onSelect?: (value: ITEM) => void
): DDialogSelect<ITEM, string> => {
	return new DDialogSelect<ITEM, string>(
		newDialogSelectWithThumbnailsOptions(controller, toThumbnail, onSelect)
	);
};
