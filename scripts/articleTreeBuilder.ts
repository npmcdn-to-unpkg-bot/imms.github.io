/**
 * Created by GregRos on 02/04/2016.
 */
///<reference path="../typings/browser/ambient/jquery/index.d.ts"/>
	///<reference path="../typings/browser/ambient/yamljs/index.d.ts"/>
class ArticleTreeEntry {
	text:string;
	link:string;
	children:Array<ArticleTreeEntry>
}

export class Articles {

	static makeList<T>(arr:Array<JQuery>) {
		if (arr && arr.length) {
			return $("<ul/>").append(arr.map(jQuery => $("<li/>").append(jQuery)));
		} else {
			return $();
		}
	}

	static createListElement(nesting:number, entry:ArticleTreeEntry):JQuery {

		var actualText = entry.link ? $("<a/>").attr("href", "/pages/" + entry.link) : $("<span/>");
		actualText.text(entry.text);
		var heading =
			$("<div/>")
				.addClass("nav-heading")
				.addClass(`nav-heading--depth-${nesting}`)
				.append(actualText);
		var container = $("<li />")
			.addClass(`nav-container--depth-${nesting}`)
			.addClass("nav-container")
			.append(heading);


		if (entry.children && entry.children.length) {
			$("<ul/>").append(entry.children.map(child => Articles.createListElement(nesting + 1, child))).appendTo(container);
			container.addClass("imms-nav-item-w-children");
		}
		return container;
	}

	static makeNavTree(element:JQuery) {
		let req = $.get("/data/contentIndex.yml", yamlText => {
			let data = YAML.parse(yamlText).root;
			let listElem = $("<ul/>").append(data.map(x => Articles.createListElement(0, x)));
			element.append(listElem);
		});
	}
}



