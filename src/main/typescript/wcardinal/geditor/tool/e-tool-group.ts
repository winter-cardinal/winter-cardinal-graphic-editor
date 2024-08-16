import { ETool } from "./e-tool";

export interface EToolGroup {
	activate(tool: ETool, parameter?: any): void;
	deactivate(tool: ETool, parameter?: any): void;
}
