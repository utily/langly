import * as langly from "./index"

describe("langly", () => {
	const translations: langly.Translations = {
		en: {
			simple: "A simple message.",
			interpolated: (data: string) => `An interpolated string containing "${ data }".`,
			interpolatedAuto: "An auto interpolated string containing $0.",
			interpolatedMulti: "Auto interpolated string containing both $0 and $1.",
			alternative: ["A simple message", "in", "an array."],
			alternativeInterpolated: (data: string) => ["An interpolated array containing", data, "."],
		},
	}
	it("language exists", () => {
		const t: langly.Translate = langly.create(translations, "en")
		expect(t).toBeTruthy()
		expect(t("simple")).toEqual("A simple message.")
		expect(t("interpolated", 1337)).toEqual('An interpolated string containing "1337".')
		expect(t("interpolatedAuto", 1337)).toEqual("An auto interpolated string containing 1337.")
		expect(t("interpolatedMulti", 42, 1337)).toEqual("Auto interpolated string containing both 42 and 1337.")
		expect(t("interpolated", 1337)).toEqual('An interpolated string containing "1337".')
		expect(t("alternative")).toEqual(["A simple message", "in", "an array."])
		expect(t("alternativeInterpolated", 1337)).toEqual(["An interpolated array containing", 1337, "."])
		expect(t("missing")).toEqual("missing")
		expect(t("missing with $0", 42)).toEqual("missing with 42")
	})
	it("language missing", () => {
		const t: langly.Translate = langly.create(translations, "sv")
		expect(t).toBeTruthy()
		expect(t("simple")).toEqual("simple")
		expect(t("interpolated", 1337)).toEqual("interpolated")
		expect(t("interpolatedAuto", 1337)).toEqual("interpolatedAuto")
		expect(t("missing")).toEqual("missing")
		expect(t("missing with $0", 42)).toEqual("missing with 42")
	})
})
