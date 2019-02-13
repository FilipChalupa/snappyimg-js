import CryptoJS from 'crypto-js'

export enum SnappyimgStage {
	Demo = 'demo',
	Serve = 'serve',
}

export enum SnappyimgResize {
	Fill = 'fill',
	Fit = 'fit',
	Crop = 'crop',
}

export enum SnappyimgGravity {
	Smart = 'sm',
	Center = 'ce',
	North = 'no',
	South = 'so',
	East = 'ea',
	West = 'we',
}

export enum SnappyimgFormat {
	Png = 'png',
	Jpg = 'jpg',
	Webp = 'webp',
}

interface SnappyimgOptions {
	resize: SnappyimgResize
	width: number
	height: number
	gravity: SnappyimgGravity
	enlarge: boolean
	format: SnappyimgFormat
}

export default class Snappyimg {
	private static readonly defaultOptions: Readonly<SnappyimgOptions> = {
		resize: SnappyimgResize.Fill,
		width: 1920,
		height: 1080,
		gravity: SnappyimgGravity.Smart,
		enlarge: true,
		format: SnappyimgFormat.Jpg,
	}

	private static readonly domain = 'snappyimg.com'

	constructor(
		private readonly appToken: string,
		private readonly appSecret: string,
		private readonly stage: SnappyimgStage
	) {}

	public buildUrl(
		originalUrl: string,
		customOptions: Partial<SnappyimgOptions> = {}
	) {
		const options: SnappyimgOptions = {
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

	private generateSignedPart(originalUrl: string, options: SnappyimgOptions) {
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
		return this.cleanBase64(btoa(input))
	}

	private cleanBase64(input: string) {
		return input
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '')
	}
}
