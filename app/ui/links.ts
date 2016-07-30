/**
 * Created by GregRos on 30/07/2016.
 */
import {Data} from './data';
export module Links {
	export const home = "/";
	export const getImms = "/pages/GetImms.html";
	export const whyImmutable = "/pages/WhyImmutable";
	export const whyImms = "/pages/WhyImms";
	export const general = "/pages/General";
	export function article(name : string) {
		return `/page/${name}`;
	}

	export module External {
		export const sources = "https://github.com/Imms/Imms";
		export const nuget = "https://www.nuget.org/packages/Imms/";
		export const siteSources = "https://github.com/Imms/imms.github.io";
		export const sass = "http://sass-lang.com/";
		export const bootstrap = "http://getbootstrap.com/";
		export const typescript = "https://www.typescriptlang.org/";
		export const webstorm = "https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html";
		export const gregrosProfile = "https://github.com/GregRos";
		export const react = "https://facebook.github.io/react/";
		export const binaries = `https://github.com/Imms/Imms/releases/tag/v${Data.version}`;
	}
}