import * as isoly from "isoly"

export function getLanguage(element: HTMLElement): isoly.Language | undefined {
	const result = element.lang
	const parent = element.parentElement
	return result && result != "unknown" ? convert(result) :
		parent ? getLanguage(parent) : convert(navigator.language)
}
function convert(language: string): isoly.Language | undefined {
	if (language && language != "unknown" && language.length >= 2)
		language = language.substr(0, 2)
	return isoly.Language.is(language) ? language : undefined
}
