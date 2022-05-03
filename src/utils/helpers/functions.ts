import * as _ from 'lodash'

function generateSignupCode() {
	return _.random(100000, 199999)
}

export { generateSignupCode }
