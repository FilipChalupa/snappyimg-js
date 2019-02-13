import { expect } from 'chai'
import 'mocha'
import base64 from './base64'

describe('To base64', () => {
	it('should return "Hello, World!" in base64', () => {
		const result = base64('Hello, World!')
		expect(result).to.equal('SGVsbG8sIFdvcmxkIQ==')
	})
})
