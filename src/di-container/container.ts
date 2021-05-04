import bottle from './bottle'

require('./definitions/handlers')
require('./definitions/services')

export default bottle.container
