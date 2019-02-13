import { sha256 } from 'js-sha256'

export enum SnappyimgStage {
	DEMO = 'demo',
	SERVE = 'serve',
}

export enum SnappyimgResize {
	FILL = 'fill',
	FIT = 'fit',
	CROP = 'crop',
}

export enum SnappyimgGravity {
	SMART = 'sm',
	CENTER = 'ce',
	NORTH = 'no',
	SOUTH = 'so',
	EAST = 'ea',
	WEST = 'we',
}

export enum SnappyimgFormat {
	PNG = 'png',
	JPG = 'jpg',
	WEBP = 'webp',
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
	static defaultOptions = {
		resize: SnappyimgResize.FILL,
		width: 1920,
		height: 1080,
		gravity: SnappyimgGravity.SMART,
		enlarge: true,
		format: SnappyimgFormat.JPG,
	}

	static domain = 'snappyimg.com'

	private appToken: string
	private appSecret: string
	private stage: SnappyimgStage

	constructor(appToken: string, appSecret: string, stage: SnappyimgStage) {
		this.appToken = appToken
		this.appSecret = appSecret
		this.stage = stage
	}

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
		}/${signature}/${optionsUrlPart}`
	}

	private hashOriginalUrl(originalUrl: string) {
		return this.encodeBase64(originalUrl)
	}

	private generateSignedPart(originalUrl: string, options: SnappyimgOptions) {
		return `${options.resize}/${options.width}/${options.height}/${
			options.gravity
		}/${options.enlarge ? '1' : '0'}/${this.hashOriginalUrl(originalUrl)}.${
			options.format
		}`
	}

	private calculateSignature(input: string) {
		return this.encodeBase64(sha256.hmac(this.appSecret, input))
	}

	private encodeBase64(input: string) {
		return btoa(input)
			.split('+/')
			.join('-_')
			.replace(/=+$/, '')
	}
}
