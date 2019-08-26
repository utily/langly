import * as langly from "./index"

describe("langly", () => {
	const translations: langly.Translations = {
		en: {
			simple: "A simple message.",
			interpolated: data => `An interpolated string containing "${ data }".`,
		},
	}
	it("language exists", () => {
		const t: langly.Translate = langly.create(translations, "en")
		expect(t).toBeTruthy()
		expect(t("simple")).toEqual("A simple message.")
		expect(t("interpolated", 1337)).toEqual('An interpolated string containing "1337".')
		expect(t("missing")).toEqual("missing")
		expect(t("missing with $0", 42)).toEqual("missing with 42")
	})
	it("language missing", () => {
		const t: langly.Translate = langly.create(translations, "sv")
		expect(t).toBeTruthy()
		expect(t("simple")).toEqual("simple")
		expect(t("interpolated", 1337)).toEqual("interpolated")
		expect(t("missing")).toEqual("missing")
		expect(t("missing with $0", 42)).toEqual("missing with 42")
	})
})
