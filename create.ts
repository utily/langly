import * as isoly from "isoly"
import { Translation } from "./Translation"
import { Translations } from "./Translations"
import { Translate } from "./Translate"
import { getLanguage } from "./getLanguage"

export function create(translations: Translations, language: isoly.Language | HTMLElement): Translate
export function create(translation: Translation): Translate
export function create(translations: Translations | Translation, language?: isoly.Language | HTMLElement): Translate {
	let result: Translate
	if (!language) {
		const translation = translations as Translation
		result = (message: string, ...argument: any[]) => {
			const r = translation[message]
			return !r ? fallback(message, ...argument) :
				typeof(r) != "string" ? r(...argument) :
				argument.length > 0 ? fallback(r, ...argument) :
				r
		}
	} else {
		if (!isoly.Language.is(language))
			language = getLanguage(language)
		const translation = language && (translations as Translations)[language]
		result = translation ? create(translation) : fallback
	}
	return result
}
function fallback(message: string, ...argument: any[]): string {
	return argument.length > 0 ? argument.reduce<string>((r, a, i) => r.replace("$" + i, a), message) : message
}
