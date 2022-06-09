import encBase64 from 'crypto-js/enc-base64'
import encHex from 'crypto-js/enc-hex'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import base64 from './base64'

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

class Snappyimg {
	private static readonly domain = 'snappyimg.com'

	public static defaultOptions: Readonly<Options> = {
		resize: Resize.Fill,
		width: 1920,
		height: 1080,
		gravity: Gravity.Smart,
		enlarge: true,
		format: Format.Jpg,
	}

	constructor(
		private readonly appToken: string,
		private readonly appSecret: string,
		private readonly stage: Stage
	) {}

	public buildUrl(originalUrl: string, customOptions: Partial<Options> = {}) {
		const options: Options = {
			...Snappyimg.defaultOptions,
			...customOptions,
		}

		const optionsUrlPart = this.generateSignedPart(originalUrl, options)
		const signature = this.calculateSignature(optionsUrlPart)

		return `https://${this.stage}.${Snappyimg.domain}/${this.appToken}/${signature}${optionsUrlPart}`
	}

	private hashOriginalUrl(originalUrl: string) {
		return this.encodeBase64(originalUrl)
	}

	private generateSignedPart(originalUrl: string, options: Options) {
		return `/${options.resize}/${options.width}/${options.height}/${
			options.gravity
		}/${options.enlarge ? '1' : '0'}/${this.hashOriginalUrl(originalUrl)}.${
			options.format
		}`
	}

	private calculateSignature(input: string) {
		return this.cleanBase64(
			encBase64.stringify(hmacSHA256(input, encHex.parse(this.appSecret)))
		)
	}

	private encodeBase64(input: string) {
		return this.cleanBase64(base64(input))
	}

	private cleanBase64(input: string) {
		return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
	}
}

export default Snappyimg
