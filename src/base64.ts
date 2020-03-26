export function stringBase64(input: string) {
	if (typeof btoa !== 'undefined') {
		return btoa(input)
	} else {
		return Buffer.from(input).toString('base64')
	}
}

export function arrayBufferBase64(buffer: ArrayBuffer) {
	let binary = ''
	const bytes = new Uint8Array(buffer)
	for (var i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i])
	}
	return stringBase64(binary)
}
