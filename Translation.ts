export interface Translation {
	[ message: string ]: string | ((...argument: string[]) => string),
}
