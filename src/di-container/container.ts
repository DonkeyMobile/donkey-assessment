import bottle from './bottle'

require('./definitions/clients')
require('./definitions/handlers')
require('./definitions/services')

export default bottle.container
