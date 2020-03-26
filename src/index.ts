//import crypto from 'crypto'
//import { stringBase64, arrayBufferBase64 } from './base64'

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

class Snappyimg {
	private static readonly domain = 'snappyimg.com'

	constructor(
		private readonly appToken: string,
		private readonly appSecret: string,
		private readonly stage: Snappyimg.Stage
	) {}

	public async buildUrl(
		originalUrl: string,
		customOptions: Partial<Snappyimg.Options> = {}
	) {
		const options: Snappyimg.Options = {
			...Snappyimg.defaultOptions,
			...customOptions,
		}

		const optionsUrlPart = this.generateSignedPart(originalUrl, options)
		const signature = await this.calculateSignature(optionsUrlPart)

		return `https://${this.stage}.${Snappyimg.domain}/${this.appToken}/${signature}${optionsUrlPart}`
	}

	private hashOriginalUrl(originalUrl: string) {
		return this.encodeBase64(originalUrl)
	}

	private generateSignedPart(originalUrl: string, options: Snappyimg.Options) {
		return `/${options.resize}/${options.width}/${options.height}/${
			options.gravity
		}/${options.enlarge ? '1' : '0'}/${this.hashOriginalUrl(originalUrl)}.${
			options.format
		}`
	}

	private async generateKey() {
		/*return await crypto.subtle.generateKey(
			{
				name: 'HMAC',
				hash: 'SHA-256',
			},
			true,
			['sign', 'verify']
		)*/
		const encoder = new TextEncoder()
		const data = encoder.encode(this.appSecret)
		return await crypto.subtle.importKey(
			'raw',
			data,
			{
				name: 'HMAC',
				hash: 'SHA-256',
			},
			false,
			['sign']
		)
	}

	private async calculateSignature(input: string) {
		console.log(input)
		if (typeof crypto === 'undefined') {
			throw new Error('Undefined crypto')
		}
		const encoder = new TextEncoder()
		const data = encoder.encode(input)
		//const hash = await crypto.subtle.digest('SHA-256', data)
		const key = await this.generateKey()
		const hash = await crypto.subtle.sign('HMAC', key, data)
		console.log(hash)
		const after = this.cleanBase64(arrayBufferBase64(hash))

		//console.log(before === after)
		console.log(after)
		console.log('')
		return after
	}

	private encodeBase64(input: string) {
		return this.cleanBase64(stringBase64(input))
	}

	private cleanBase64(input: string) {
		return input
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '')
	}
}

namespace Snappyimg {
	export enum Stage {
		Demo = 'demo',
		Serve = 'serve',
	}

	export enum Resize {
		Fill = 'fill',
		Fit = 'fit',
		Crop = 'crop',
	}

	export enum Gravity {
		Smart = 'sm',
		Center = 'ce',
		North = 'no',
		South = 'so',
		East = 'ea',
		West = 'we',
	}

	export enum Format {
		Png = 'png',
		Jpg = 'jpg',
		Webp = 'webp',
	}

	export interface Options {
		resize: Resize
		width: number
		height: number
		gravity: Gravity
		enlarge: boolean
		format: Format
	}

	export const defaultOptions: Readonly<Options> = {
		resize: Resize.Fill,
		width: 1920,
		height: 1080,
		gravity: Gravity.Smart,
		enlarge: true,
		format: Format.Jpg,
	}
}

//export default Snappyimg
export { Snappyimg }
