import CryptoJS from 'crypto-js'
import base64 from './base64'

class Snappyimg {
	private static readonly domain = 'snappyimg.com'

	constructor(
		private readonly appToken: string,
		private readonly appSecret: string,
		private readonly stage: Snappyimg.Stage
	) {}

	public buildUrl(
		originalUrl: string,
		customOptions: Partial<Snappyimg.Options> = {}
	) {
		const options: Snappyimg.Options = {
			...Snappyimg.defaultOptions,
			...customOptions,
		}

		const optionsUrlPart = this.generateSignedPart(originalUrl, options)
		const signature = this.calculateSignature(optionsUrlPart)

		return `https://${this.stage}.${Snappyimg.domain}/${
			this.appToken
		}/${signature}${optionsUrlPart}`
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

	private calculateSignature(input: string) {
		return this.cleanBase64(
			CryptoJS.enc.Base64.stringify(
				CryptoJS.HmacSHA256(input, CryptoJS.enc.Hex.parse(this.appSecret))
			)
		)
	}

	private encodeBase64(input: string) {
		return this.cleanBase64(base64(input))
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

export default Snappyimg
export { Snappyimg }
