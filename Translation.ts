export interface Translation {
	[ message: string ]: string | any | ((...argument: string[]) => string | any),
}
