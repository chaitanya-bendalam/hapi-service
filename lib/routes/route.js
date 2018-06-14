"use strict";
const Joi = require('joi');
// Importing `index` handler from `handler/index.js` file
const handler = require('../handlers/index');

module.exports = function() {
		return [
		    {
					method: 'GET', 															// Methods Type
					path: '/guessit/{id}', 											// Url
					config: {
				    handler: handler.printGuessItOutput, // Action for fetching result
				    description: 'To fetch guess result',
				    notes: 'Returns a guessing output',
				    tags: ['api'],
						validate: {
	            params: {
                id : Joi.number()
												.integer()
												.min(1)
												.max(10)
                        .required()
                        .description('the id for guessit number'),
	            }
		        }
				  }
				},
				{
					method: 'GET', 															// Methods Type
					path: '/guessit/reloadgame/', 							// Url
					config: {
				    handler: handler.reloadGame, // Action for reloading game
				    description: 'To Reload game',
				    notes: 'Returns reload game',
				    tags: ['api']
				  }
				},
				{
				  method: 'GET',
				  path: '/hello',
				  config: {
				    handler: function(request, h){
				      return 'hello world';
				    },
				    description: 'Hello service',
				    notes: 'Returns a Hello service response',
				    tags: ['api']
				  }
				}
		];
}();
