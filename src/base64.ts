export default function base64(input: string) {
	if (typeof btoa !== 'undefined') {
		return btoa(input)
	} else {
		return Buffer.from(input).toString('base64')
	}
}
