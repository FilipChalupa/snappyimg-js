import { expect } from 'chai'
import 'mocha'
import { stringBase64 } from './base64'

describe('To base64', () => {
	it('should return "Hello, World!" in base64', () => {
		const result = stringBase64('Hello, World!')
		expect(result).to.equal('SGVsbG8sIFdvcmxkIQ==')
	})
})
