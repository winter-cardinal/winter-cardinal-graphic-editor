import { UtilSvgAtlasBuilder } from "@wcardinal/wcardinal-ui";
import { MIPMAP_MODES } from "pixi.js";

/*!
 * Material Icons https://material.io/tools/icons/
 * Available under Apache license version 2.0
 */
export const iconBuilder = new UtilSvgAtlasBuilder({
	width: 1024,
	ratio: 80 / 3,
	mipmap: MIPMAP_MODES.OFF
});

iconBuilder.add(
	"select",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M551-80 406-392 240-160v-720l560 440H516l144 309-109 51Z"/>` +
		`</g>`
);

iconBuilder.add(
	"camera",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path fill="#fff" d="M5.54 8.46L2 12l3.54 3.54 1.76-1.77L5.54 12l1.76-1.77zm6.46 10l-1.77-1.76-1.77 1.76L12 22l3.54-3.54-1.77-1.76zm6.46-10l-1.76 1.77L18.46 12l-1.76 1.77 1.76 1.77L22 12zm-10-2.92l1.77 1.76L12 5.54l1.77 1.76 1.77-1.76L12 2z"/>` +
		`</g>`
);

iconBuilder.add(
	"new",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"open",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"save",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" fill="#Fff" />` +
		`</g>`
);

iconBuilder.add(
	"save_as",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h12l4 4v5.4l-2 2V7.825L16.175 5H5v14h9.4l-2 2Zm7-3q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18Zm-6-8h9V6H6Zm9 13v-1.775l5-4.975 1.75 1.775L16.775 23Zm7.4-5.65-1.775-1.75.85-.85q.15-.15.362-.15.213 0 .363.15l1.05 1.05q.15.15.15.35 0 .2-.15.35ZM5 19V5v9.4Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"upload",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2z" fill="#fff" />` +
		`<path d="M19 12m-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" transform="translate(12,10) rotate(180) translate(-12,-10)" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"download",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"undo",
	24,
	24,
	`<g transform="scale(26.667,26.667) translate(+12,+12) rotate(-45) translate(-12,-12)">` +
		`<path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"redo",
	24,
	24,
	`<g transform="scale(26.667,26.667) translate(+12,+12) rotate(45) scale(-1,1) translate(-12,-12)">` +
		`<path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"delete",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_text",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M420-160v-520H200v-120h560v120H540v520H420Z"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_action",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"shape_rectangle",
	19.2,
	19.2,
	`<rect stroke="#fff" stroke-width="53.333" fill="none" x="48" y="48" width="416" height="416"></rect>`
);

iconBuilder.add(
	"shape_rectangle_rounded",
	19.2,
	19.2,
	`<rect stroke="#fff" stroke-width="53.333" fill="none" x="48" y="48" width="416" height="416" rx="125" ry="125"></rect>`
);

iconBuilder.add(
	"stroke_side_top",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="458.666" fill="#fff" fill-opacity="0.2" stroke="none"></rect>` +
		`<rect x="26.666" y="26.666" width="458.666" height="53.333" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"stroke_side_right",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="458.666" fill="#fff" fill-opacity="0.2" stroke="none"></rect>` +
		`<rect x="432" y="26.666" width="53.333" height="458.666" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"stroke_side_bottom",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="458.666" fill="#fff" fill-opacity="0.2" stroke="none"></rect>` +
		`<rect x="26.666" y="432" width="458.666" height="53.333" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"stroke_side_left",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="458.666" fill="#fff" fill-opacity="0.2" stroke="none"></rect>` +
		`<rect x="26.666" y="26.666" width="53.333" height="458.666" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"corner_top_left",
	16.8,
	19.2,
	`<path d="M16 464 v -208 a 208 208 0 0 1 208 -208 h 208 v 416 z" stroke="none" fill="#fff" fill-opacity="0.2"></path>` +
		`<path d="M16 464 v -208 a 208 208 0 0 1 208 -208 h 208" stroke="#fff" stroke-width="53.333" fill="none"></path>`
);

iconBuilder.add(
	"corner_top_right",
	16.8,
	19.2,
	`<path d="M16 48 h 208 a 208 208 0 0 1 208 208 v 208 h -416 z" stroke="none" fill="#fff" fill-opacity="0.2"></path>` +
		`<path d="M16 48 h 208 a 208 208 0 0 1 208 208 v 208" stroke="#fff" stroke-width="53.333" fill="none"></path>`
);

iconBuilder.add(
	"corner_bottom_left",
	16.8,
	19.2,
	`<path d="M16 48 v 208 a 208 208 0 0 0 208 208 h 208 v -416 z" stroke="none" fill="#fff" fill-opacity="0.2"></path>` +
		`<path d="M16 48 v 208 a 208 208 0 0 0 208 208 h 208" stroke="#fff" stroke-width="53.333" fill="none"></path>`
);

iconBuilder.add(
	"corner_bottom_right",
	16.8,
	19.2,
	`<path d="M16 464 h 208 a 208 208 0 0 0 208 -208 v -208 h -416 z" stroke="none" fill="#fff" fill-opacity="0.2"></path>` +
		`<path d="M16 464 h 208 a 208 208 0 0 0 208 -208 v -208" stroke="#fff" stroke-width="53.333" fill="none"></path>`
);

iconBuilder.add(
	"shape_circle",
	19.2,
	19.2,
	`<circle cx="256" cy="256" r="224" stroke-width="48" stroke="#fff" fill="none" />`
);

iconBuilder.add(
	"shape_semicircle",
	19.2,
	19.2,
	`<path d="M32 256 a196 196 0 0 1 448 0z" stroke-width="48" stroke="#fff" fill="none"></path>` +
		`<path d="M32 256 a196 196 0 0 0 448 0z" stroke-width="48" stroke="#fff" stroke-opacity="0.5" fill="none"></path>`
);

iconBuilder.add(
	"shape_line",
	19.2,
	19.2,
	`<rect fill="#fff" x="0" y="-13.333" width="640" height="53.333" transform="translate(26.666,56) rotate(40)" rx="26.666" ry="26.666"></rect>`
);

iconBuilder.add(
	"shape_polygon",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="M272-120 64-480l208-360h416l208 360-208 360H272Zm46-80h324l161-280-161-280H318L156-480l162 280Zm162-280Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"shape_line_connector",
	24,
	24,
	`<g transform="scale(26.667,26.667) translate(+12, +12) rotate(-40) translate(-12, -12)">` +
		`<rect x="4" y="11" width="16" height="2" fill="#fff"></rect>` +
		`<circle cx="1" cy="12" r="2" stroke="#fff" stroke-width="2" fill="none"></circle>` +
		`<polygon points="20,10 20,14 24,12" stroke="#fff" stroke-width="2" fill="none" />` +
		`</g>`
);

iconBuilder.add(
	"shape_elbow_connector",
	24,
	24,
	`<g transform="scale(26.667,26.667) translate(+12, +12) rotate(-40) translate(-12, -12)">` +
		`<rect x="5" y="8" width="7" height="2" fill="#fff"></rect>` +
		`<rect x="11" y="8" width="2" height="8" fill="#fff"></rect>` +
		`<rect x="12" y="14" width="7" height="2" fill="#fff"></rect>` +
		`<circle cx="3" cy="9" r="2" stroke="#fff" stroke-width="2" fill="none"></circle>` +
		`<polygon points="19,13 19,17 23,15" stroke="#fff" stroke-width="2" fill="none" />` +
		`</g>`
);

iconBuilder.add(
	"shape_triangle",
	19.2,
	19.2,
	`<path d="M 0 -1 L +1 +1 L -1 +1 Z" transform="translate(+256,+256) scale(229.333, 229.3335)" fill="none" stroke="#fff" stroke-width="0.23255651703741495"></path>`
);

iconBuilder.add(
	"shape_triangle_rounded",
	19.2,
	19.2,
	`<path d="` +
		`M -0.2857142857142857 -0.7142857142857142 ` +
		`Q 0 -1.2857142857142856 0.2857142857142857, -0.7142857142857142 ` +
		`L +0.8571428571428571, 0.42857142857142855 ` +
		`Q 1.1428571428571428 1 0.5714285714285714, 1 ` +
		`L -0.5714285714285714, 1 ` +
		`Q -1.1428571428571428, 1 -0.8571428571428571, 0.42857142857142855 Z" ` +
		`transform="translate(+256,+256) scale(229.333, 229.3335)" ` +
		`fill="none" stroke="#fff" stroke-width="0.23255651703741495"></path>`
);

iconBuilder.add(
	"shape_group",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M80-160v-640h320l80 80h400v560H80Zm80-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-80h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80Z"/>` +
		`</g>`
);

iconBuilder.add(
	"shape_ungroup",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M80-160v-640h320l80 80h400v560H80Zm80-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm320-160h240v-80h-240Z"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_image",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_coordinate",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_shape",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_data",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_data_mapping",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M220-80q-58 0-99-41t-41-99q0-58 41-99t99-41q18 0 35 4.5t32 12.5l153-153v-110q-44-13-72-49.5T340-740q0-58 41-99t99-41q58 0 99 41t41 99q0 48-28 84.5T520-606v110l154 153q15-8 31.5-12.5T740-360q58 0 99 41t41 99q0 58-41 99t-99 41q-58 0-99-41t-41-99q0-18 4.5-35t12.5-32L480-424 343-287q8 15 12.5 32t4.5 35q0 58-41 99t-99 41Zm520-80q25 0 42.5-17.5T800-220q0-25-17.5-42.5T740-280q-25 0-42.5 17.5T680-220q0 25 17.5 42.5T740-160ZM480-680q25 0 42.5-17.5T540-740q0-25-17.5-42.5T480-800q-25 0-42.5 17.5T420-740q0 25 17.5 42.5T480-680ZM220-160q25 0 42.5-17.5T280-220q0-25-17.5-42.5T220-280q-25 0-42.5 17.5T160-220q0 25 17.5 42.5T220-160Z"/>` +
		`</g>`
);

iconBuilder.add(
	"text_align_left",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z"/>` +
		`</g>`
);

iconBuilder.add(
	"text_align_center",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z"/>` +
		`</g>`
);

iconBuilder.add(
	"text_align_right",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z"/>` +
		`</g>`
);

iconBuilder.add(
	"text_align_outside_left",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z" transform="translate(-160,0)"/>` +
		`<rect x="800" y="-880" width="80" height="800"></rect>` +
		`</g>`
);

iconBuilder.add(
	"text_align_outside_right",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z" transform="translate(160,0)"/>` +
		`<rect x="80" y="-880" width="80" height="800"></rect>` +
		`</g>`
);

iconBuilder.add(
	"text_align_top",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="458.666" fill="none" stroke="#fff" stroke-width="53.333"></rect>` +
		`<rect x="106.666" y="106.666" width="298.666" height="53.333" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"text_align_middle",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="458.666" fill="none" stroke="#fff" stroke-width="53.333"></rect>` +
		`<rect x="106.666" y="229.333" width="298.666" height="53.333" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"text_align_bottom",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="458.666" fill="none" stroke="#fff" stroke-width="53.333"></rect>` +
		`<rect x="106.666" y="352" width="298.666" height="53.333" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"text_align_outside_top",
	19.2,
	19.2,
	`<rect x="26.666" y="133.333" width="458.666" height="352" fill="none" stroke="#fff" stroke-width="53.333"></rect>` +
		`<rect x="0" y="0" width="512" height="53.333" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"text_align_outside_bottom",
	19.2,
	19.2,
	`<rect x="26.666" y="26.666" width="458.666" height="352" fill="none" stroke="#fff" stroke-width="53.333"></rect>` +
		`<rect x="0" y="458.666" width="512" height="53.333" fill="#fff" stroke="none"></rect>`
);

iconBuilder.add(
	"text_direction_left_to_right",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M12.75 3h-1.5L6.5 14h2.1l.9-2.2h5l.9 2.2h2.1L12.75 3zm-2.62 7L12 4.98 13.87 10h-3.74zm10.37 8l-3-3v2H5v2h12.5v2l3-3z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"text_direction_top_to_bottom",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M21 12v-1.5L10 5.75v2.1l2.2.9v5l-2.2.9v2.1L21 12zm-7-2.62l5.02 1.87L14 13.12V9.38zM6 19.75l3-3H7V4.25H5v12.5H3l3 3z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"text_direction_bottom_to_top",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M3 12v1.5l11 4.75v-2.1l-2.2-.9v-5l2.2-.9v-2.1L3 12zm7 2.62l-5.02-1.87L10 10.88v3.74zm8-10.37l-3 3h2v12.5h2V7.25h2l-3-3z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"text_direction_right_to_left",
	24,
	24,
	`<g transform="scale(26.667,26.667) translate(12,12) rotate(180) translate(-12,-12)">` +
		`<path d="M12.75 3h-1.5L6.5 14h2.1l.9-2.2h5l.9 2.2h2.1L12.75 3zm-2.62 7L12 4.98 13.87 10h-3.74zm10.37 8l-3-3v2H5v2h12.5v2l3-3z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_tree",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M22,11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3H22z M7,9H4V5h3V9z M17,15h3v4h-3V15z M17,5h3v4h-3V5z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_layer",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"eye_slash",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>` +
		`</g>`
);

iconBuilder.add(
	"eye",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_coordinate_align_right",
	19.2,
	19.2,
	`<rect x="476.444" y="0" width="35.555" height="512" fill="#fff" stroke="none"></rect>` +
		`<rect x="192" y="80" width="186.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect x="32" y="309.333" width="346.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_align_left",
	19.2,
	19.2,
	`<rect x="0" y="0" width="35.555" height="512" fill="#fff" stroke="none"></rect>` +
		`<rect x="133.333" y="80" width="186.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect x="133.333" y="309.333" width="346.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_align_center",
	19.2,
	19.2,
	`<rect x="238.222" y="0" width="35.555" height="80" fill="#fff" stroke="none"></rect>` +
		`<rect x="238.222" y="202.666" width="35.555" height="106.666" fill="#fff" stroke="none"></rect>` +
		`<rect x="238.222" y="432" width="35.555" height="80" fill="#fff" stroke="none"></rect>` +
		`<rect x="162.666" y="80" width="186.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect x="82.666" y="309.333" width="346.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_distribute_horizontally",
	19.2,
	19.2,
	`<rect x="238.222" y="0" width="35.555" height="512" fill="#fff" stroke="none"></rect>` +
		`<rect y="162.666" x="26.666" height="186.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect y="82.666" x="362.666" height="346.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_align_bottom",
	19.2,
	19.2,
	`<rect y="476.444" x="0" height="35.555" width="512" fill="#fff" stroke="none"></rect>` +
		`<rect y="192" x="80" height="186.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect y="32" x="309.333" height="346.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_align_top",
	19.2,
	19.2,
	`<rect y="0" x="0" height="35.555" width="512" fill="#fff" stroke="none"></rect>` +
		`<rect y="133.333" x="80" height="186.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect y="133.333" x="309.333" height="346.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_align_middle",
	19.2,
	19.2,
	`<rect y="238.222" x="0" height="35.555" width="80" fill="#fff" stroke="none"></rect>` +
		`<rect y="229.333" x="202.666" height="35.555" width="106.666" fill="#fff" stroke="none"></rect>` +
		`<rect y="229.333" x="432" height="35.555" width="80" fill="#fff" stroke="none"></rect>` +
		`<rect y="162.666" x="80" height="186.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect y="82.666" x="309.333" height="346.666" width="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_distribute_vertically",
	19.2,
	19.2,
	`<rect y="238.222" x="0" height="35.555" width="512" fill="#fff" stroke="none"></rect>` +
		`<rect x="162.666" y="26.666" width="186.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>` +
		`<rect x="82.666" y="362.666" width="346.666" height="122.666" fill="none" stroke="#fff" stroke-width="35.555"></rect>`
);

iconBuilder.add(
	"editor_coordinate_rotate_left",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M11 22q-1.25-.125-2.4-.613Q7.45 20.9 6.4 20.1l1.4-1.45q.725.525 1.538.85.812.325 1.662.45Zm2 0v-2.05q2.6-.375` +
		` 4.3-2.337Q19 15.65 19 13.05q0-2.925-2.038-4.962Q14.925 6.05 12 6.05h-.2l1.6 1.6-1.4 1.4-4-4 4-4 1.4 1.45-1.55 1.55H12` +
		`q1.875 0 3.513.712 1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 11.175 21 13.05q0 3.425-2.275 5.963Q16.45 21.55 13 2` +
		`2Zm-8.05-3.35q-.8-1.05-1.287-2.2-.488-1.15-.613-2.4H5.1q.125.85.45 1.662.325.813.85 1.538Zm-1.9-6.6q.15-1.275.625-2.45` +
		`.475-1.175 1.275-2.15l1.45 1.4q-.525.725-.85 1.537-.325.813-.45 1.663Z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_coordinate_rotate_right",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M13.05 22v-2.05q.85-.125 1.663-.45.812-.325 1.537-.85l1.4 1.45q-1.05.8-2.2 1.287-1.15.488-2.4.613Zm-2 0q-3.45-` +
		`.45-5.725-2.987Q3.05 16.475 3.05 13.05q0-1.875.713-3.513.712-1.637 1.925-2.85Q6.9 5.475 8.538 4.762q1.637-.712 3.512-.7` +
		`12h.15L10.65 2.5l1.4-1.45 4 4-4 4-1.4-1.4 1.6-1.6h-.2q-2.925 0-4.962 2.038Q5.05 10.125 5.05 13.05q0 2.6 1.7 4.563 1.7 1` +
		`.962 4.3 2.337Zm8.05-3.35-1.45-1.4q.525-.725.85-1.538.325-.812.45-1.662H21q-.125 1.25-.612 2.4-.488 1.15-1.288 2.2Zm1.9` +
		`-6.6h-2.05q-.125-.85-.45-1.663-.325-.812-.85-1.537l1.45-1.4q.8.975 1.275 2.15.475 1.175.625 2.45Z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_snap",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2` +
		`v4h2V8h2v4h2V8h2v8z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_canvas",
	24,
	24,
	`<g transform="translate(80,80) scale(0.75,0.75) scale(0.667,0.667) translate(0, -96)">` +
		`<path d="m405.384 936-14.461-115.692q-19.154-5.769-41.423-18.154-22.269-12.385-37.885-26.538L204.923 821l-74.616-130 92.231-69.539q-1.769-10.846-2.923-22.346-1.154-11.5-1.154-22.346 0-10.077 1.154-21.192t2.923-25.038L130.307 461l74.616-128.462 105.923 44.616q17.923-14.923 38.769-26.923 20.846-12 40.539-18.539L405.384 216h149.232l14.461 116.461q23 8.077 40.654 18.539 17.654 10.461 36.346 26.154l109-44.616L829.693 461l-95.308 71.846q3.308 12.385 3.692 22.731.385 10.346.385 20.423 0 9.308-.769 19.654-.77 10.346-3.539 25.038L827.923 691l-74.615 130-107.231-46.154q-18.692 15.693-37.615 26.923-18.923 11.231-39.385 17.77L554.616 936H405.384Zm73.539-260q41.846 0 70.923-29.077 29.077-29.077 29.077-70.923 0-41.846-29.077-70.923Q520.769 476 478.923 476q-42.077 0-71.039 29.077-28.961 29.077-28.961 70.923 0 41.846 28.961 70.923Q436.846 676 478.923 676Zm0-40q-25 0-42.5-17.5t-17.5-42.5q0-25 17.5-42.5t42.5-17.5q25 0 42.5 17.5t17.5 42.5q0 25-17.5 42.5t-42.5 17.5ZM480 576Zm-40 320h78.231L533 787.692q30.231-8 54.423-21.961 24.192-13.962 49.269-38.269L736.462 770l39.769-68-87.539-65.769q5-17.077 6.616-31.423 1.615-14.346 1.615-28.808 0-15.231-1.615-28.808-1.616-13.577-6.616-29.884L777.769 450 738 382l-102.077 42.769q-18.154-19.923-47.731-37.346t-55.961-23.115L520 256h-79.769l-12.462 107.538q-30.231 6.462-55.577 20.808-25.346 14.346-50.423 39.423L222 382l-39.769 68L269 514.769q-5 13.462-7 29.231-2 15.769-2 32.769Q260 592 262 607q2 15 6.231 29.231l-86 65.769L222 770l99-42q23.538 23.769 48.885 38.115 25.346 14.347 57.115 22.347L440 896Z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_canvas_legacy",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 ` +
		`0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"arrow_to_top",
	24,
	24,
	`<g transform="scale(26.667,26.667) translate(0,+1)">` +
		`<rect x="4" y="4" width="16" height="2" fill="#fff" stroke="none"></rect>` +
		`<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"arrow_up",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"arrow_down",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"arrow_to_bottom",
	24,
	24,
	`<g transform="scale(26.667,26.667) translate(0,-1)">` +
		`<rect x="4" y="18" width="16" height="2" fill="#fff" stroke="none"></rect>` +
		`<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"bold",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"/>` +
		`</g>`
);

iconBuilder.add(
	"italic",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"/>` +
		`</g>`
);

iconBuilder.add(
	"view_reset",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/>` +
		`</g>`
);

iconBuilder.add(
	"view_zoom_in",
	19.2,
	19.2,
	`<rect x="229.333" y="53.333" width="53.333" height="405.333" stroke="none" fill="#fff"></rect>` +
		`<rect y="229.333" x="53.333" height="53.333" width="405.333" stroke="none" fill="#fff"></rect>`
);

iconBuilder.add(
	"view_zoom_out",
	19.2,
	19.2,
	`<rect y="229.333" x="53.333" height="53.333" width="405.333" stroke="none" fill="#fff"></rect>`
);

iconBuilder.add(
	"view_fit",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)" fill="#fff">` +
		`<path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>` +
		`</g>`
);

iconBuilder.add(
	"refresh",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"menu",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"go_down",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"go_up",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"home",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"account",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28` +
		`c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93` +
		`-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4` +
		` 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 ` +
		`3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12` +
		` 8s1.5.67 1.5 1.5S12.83 11 12 11z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"component",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M3 5v14h19V5H3zm2 2h15v4H5V7zm0 10v-4h4v4H5zm6 0v-4h9v4h-9z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"more",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"graphic_piece",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M10.5 4.5c.28 0 .5.22.5.5v2h6v6h2c.28 0 .5.22.5.5s-.22.5-.5.5h-2v6h-2.12c-.68-1.75` +
		`-2.39-3-4.38-3s-3.7 1.25-4.38 3H4v-2.12c1.75-.68 3-2.39 3-4.38 0-1.99-1.24-3.7-2.99-4.38L4 ` +
		`7h6V5c0-.28.22-.5.5-.5m0-2C9.12 2.5 8 3.62 8 5H4c-1.1 0-1.99.9-1.99 2v3.8h.29c1.49 0 2.7 ` +
		`1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-.3c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21` +
		` 2.7 2.7v.3H17c1.1 0 2-.9 2-2v-4c1.38 0 2.5-1.12 2.5-2.5S20.38 11 19 11V7c0-1.1-.9-2-2-2h-` +
		`4c0-1.38-1.12-2.5-2.5-2.5z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"close_mark",
	24,
	24,
	`<g transform="scale(13.333,13.333) translate(12,12)">` +
		`<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_chart",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_font_size_decrease",
	24,
	24,
	`<g transform="translate(24, 24) scale(24,24)">` +
		`<path d="M1 19 6.25 5h2.5L14 19h-2.4l-1.275-3.575h-5.65L3.4 19Zm4.4-5.6h4.2L7.55 7.6h-.1ZM15 13v-2h8v2Z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_font_size_increase",
	24,
	24,
	`<g transform="translate(24, 24) scale(24,24)">` +
		`<path d="M1 19 6.25 5h2.5L14 19h-2.4l-1.275-3.575h-5.65L3.4 19Zm4.4-5.6h4.2L7.55 7.6h-.1ZM18 16v-3h-3v-2h3V8h2v3h3v2h-3v3Z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"editor_validation",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2q1.625 0 3.075.475 1.45.475 2.675 1.325L16.3 5.275q-.95-.6-2.025-.938Q13.2 4 12 4 8.675 4 6.338 6.337 4 8.675 4 12t2.338 5.663Q8.675 20 12 20q3.325 0 5.663-2.337Q20 15.325 20 12q0-.45-.05-.9t-.15-.875L21.425 8.6q.275.8.425 1.65.15.85.15 1.75 0 2.075-.788 3.9-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm-1.4-5.4-4.25-4.25 1.4-1.4 2.85 2.85 10-10.025 1.4 1.4Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"editor_search",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 ` +
		`9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 ` +
		`14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"lock_close",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6ZM6 20V10v10Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"lock_open",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="M240-160h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Zm0 80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h280v-80q0-83 58.5-141.5T720-920q83 0 141.5 58.5T920-720h-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80h120q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"action_keyword",
	24,
	24,
	`<g transform="scale(26.667,26.667)">` +
		`<path d="M6.5 16q1.175 0 2.288.262 1.112.263 2.212.788V7.2q-1.025-.6-2.175-.9Q7.675 6 6.5 6q-.9 0-1.787.175Q3.825 6.35 3 6.7v9.9q.875-.3 1.738-.45Q5.6 16 6.5 16Zm6.5 1.05q1.1-.525 2.213-.788Q16.325 16 17.5 16q.9 0 1.763.15.862.15 1.737.45V6.7q-.825-.35-1.712-.525Q18.4 6 17.5 6q-1.175 0-2.325.3-1.15.3-2.175.9ZM12 20q-1.2-.95-2.6-1.475Q8 18 6.5 18q-1.05 0-2.062.275-1.013.275-1.938.775-.525.275-1.012-.025Q1 18.725 1 18.15V6.1q0-.275.138-.525.137-.25.412-.375 1.15-.6 2.4-.9Q5.2 4 6.5 4q1.45 0 2.838.375Q10.725 4.75 12 5.5q1.275-.75 2.663-1.125Q16.05 4 17.5 4q1.3 0 2.55.3 1.25.3 2.4.9.275.125.413.375.137.25.137.525v12.05q0 .575-.487.875-.488.3-1.013.025-.925-.5-1.938-.775Q18.55 18 17.5 18q-1.5 0-2.9.525T12 20Zm-5-8.35Z" fill="#fff" />` +
		`</g>`
);

iconBuilder.add(
	"texture_gradient",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="M440-440v-80h80v80h-80Zm-80 80v-80h80v80h-80Zm160 0v-80h80v80h-80Zm80-80v-80h80v80h-80Zm-320 0v-80h80v80h-80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm80-80h80v-80h-80v80Zm160 0h80v-80h-80v80Zm320 0v-80 80Zm-560-80h80v-80h80v80h80v-80h80v80h80v-80h80v80h80v-80h-80v-80h80v-320H200v320h80v80h-80v80Zm0 80v-560 560Zm560-240v80-80ZM600-280v80h80v-80h-80Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"texture_fit_to",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="M800-600v-120H680v-80h120q33 0 56.5 23.5T880-720v120h-80Zm-720 0v-120q0-33 23.5-56.5T160-800h120v80H160v120H80Zm600 440v-80h120v-120h80v120q0 33-23.5 56.5T800-160H680Zm-520 0q-33 0-56.5-23.5T80-240v-120h80v120h120v80H160Zm80-160v-320h480v320H240Zm80-80h320v-160H320v160Zm0 0v-160 160Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"texture_clear",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="m840-234-80-80v-446H314l-80-80h526q33 0 56.5 23.5T840-760v526ZM792-56l-64-64H200q-33 0-56.5-23.5T120-200v-528l-64-64 56-56 736 736-56 56ZM240-280l120-160 90 120 33-44-283-283v447h447l-80-80H240Zm297-257ZM424-424Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"stroke_expandable",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="M229-229q-29-29-29-71t29-71l360-360q29-29 71-29t71 29q29 29 29 71t-29 71L371-229q-29 29-71 29t-71-29Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"stroke_shrinkable",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="M212-212q-11-11-11-28t11-28l480-480q11-12 27.5-12t28.5 12q11 11 11 28t-11 28L268-212q-11 11-28 11t-28-11Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"stroke_scalable_dot_dash",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="M120-160v-80h80v80h-80Zm0-160v-80h200v80H120Zm0-160v-80h320v80H120Zm0-160v-160h720v160H120Zm160 480v-80h80v80h-80Zm100-160v-80h200v80H380Zm60 160v-80h80v80h-80Zm80-320v-80h320v80H520Zm80 320v-80h80v80h-80Zm40-160v-80h200v80H640Zm120 160v-80h80v80h-80Z" fill="#fff"/>` +
		`</g>`
);

iconBuilder.add(
	"line_closed",
	24,
	24,
	`<g transform="scale(0.667,0.667) translate(0, 960)">` +
		`<path d="m360-120-57-56 64-64h-7q-117 0-198.5-81.5T80-520q0-117 81.5-198.5T360-800h240q117 0 198.5 81.5T880-520q0 117-81.5 198.5T600-240v-80q83 0 141.5-58.5T800-520q0-83-58.5-141.5T600-720H360q-83 0-141.5 58.5T160-520q0 83 58.5 141.5T360-320l16 8-72-72 56-56 160 160-160 160Z" fill="#fff"/>` +
		`</g>`
);
