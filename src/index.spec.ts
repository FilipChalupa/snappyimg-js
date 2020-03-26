import { expect } from 'chai'
import 'mocha'
import { Snappyimg } from './index'

const originalUrl = 'https://www.snappyimg.com/demo.jpg'
const appToken = 'dummyappid'
const appSecret = 'beefcafebeefcafe'
const snappyimg = new Snappyimg(appToken, appSecret, Snappyimg.Stage.Demo)

describe('Default options', () => {
	it('should return url with default options', () => {
		const result = snappyimg.buildUrl(originalUrl)
		expect(result).to.equal(
			'https://demo.snappyimg.com/dummyappid/SamflMft2_2rUqwGjy0pwmvH7phmtgFdU8zJ9L_Tf_0/fill/1920/1080/sm/1/aHR0cHM6Ly93d3cuc25hcHB5aW1nLmNvbS9kZW1vLmpwZw.jpg'
		)
	})
})

describe('Custom resize option', () => {
	it('should return url with resize set to fit', () => {
		const result = snappyimg.buildUrl(originalUrl, {
			resize: Snappyimg.Resize.Fit,
		})
		expect(result).to.equal(
			'https://demo.snappyimg.com/dummyappid/p6O_lxAWAVvk-kvWNSYupglsvgAxWdXVd9Ijh1zf708/fit/1920/1080/sm/1/aHR0cHM6Ly93d3cuc25hcHB5aW1nLmNvbS9kZW1vLmpwZw.jpg'
		)
	})
})

describe('Custom width option', () => {
	it('should return url with width 640', () => {
		const result = snappyimg.buildUrl(originalUrl, {
			width: 640,
		})
		expect(result).to.equal(
			'https://demo.snappyimg.com/dummyappid/J4t6nDfMBTonva1xJ78UVFWknzFpQdsADdXbYwkD1SY/fill/640/1080/sm/1/aHR0cHM6Ly93d3cuc25hcHB5aW1nLmNvbS9kZW1vLmpwZw.jpg'
		)
	})
})

describe('Custom height option', () => {
	it('should return url with height 480', () => {
		const result = snappyimg.buildUrl(originalUrl, {
			height: 480,
		})
		expect(result).to.equal(
			'https://demo.snappyimg.com/dummyappid/QPScuqu4eFVkSgDl9aneIeXzjmdQ4EnVXRMnzQpoc4M/fill/1920/480/sm/1/aHR0cHM6Ly93d3cuc25hcHB5aW1nLmNvbS9kZW1vLmpwZw.jpg'
		)
	})
})

describe('Custom format option', () => {
	it('should return url in jpg format', () => {
		const result = snappyimg.buildUrl(originalUrl, {
			format: Snappyimg.Format.Jpg,
		})
		expect(result).to.equal(
			'https://demo.snappyimg.com/dummyappid/SamflMft2_2rUqwGjy0pwmvH7phmtgFdU8zJ9L_Tf_0/fill/1920/1080/sm/1/aHR0cHM6Ly93d3cuc25hcHB5aW1nLmNvbS9kZW1vLmpwZw.jpg'
		)
	})
})

describe('Custom enlarge option', () => {
	it('should return url with enlarge set to false', () => {
		const result = snappyimg.buildUrl(originalUrl, {
			enlarge: false,
		})
		expect(result).to.equal(
			'https://demo.snappyimg.com/dummyappid/Gdp9EM2GW5dgH723MSEZ1ZsF54ZK_q-usCUKuXeN7pI/fill/1920/1080/sm/0/aHR0cHM6Ly93d3cuc25hcHB5aW1nLmNvbS9kZW1vLmpwZw.jpg'
		)
	})
})

describe('Custom gravity option', () => {
	it('should return url with gravity set to south', () => {
		const result = snappyimg.buildUrl(originalUrl, {
			gravity: Snappyimg.Gravity.South,
		})
		expect(result).to.equal(
			'https://demo.snappyimg.com/dummyappid/5BQZXV1z_3XTV_zoxhVozdjTmbqfAFsbcr_025FZKTc/fill/1920/1080/so/1/aHR0cHM6Ly93d3cuc25hcHB5aW1nLmNvbS9kZW1vLmpwZw.jpg'
		)
	})
})
