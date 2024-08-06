/**
 * @swagger
 * /api/v1/helmet/register:
 *   post:
 *     tags: ['User Operations']
 *     summary: User Register
 *     description: Register a new user with username and password.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: 'user123'  // Example value for the request
 *             password:
 *               type: string
 *               example: 'pass123'  // Example value for the request
 *           required:
 *             - username
 *             - password
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '00000'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     token_login:
 *                       type: string
 *                   example:
 *                     id: 1
 *                     username: 'user123'
 *                     token_login: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *                 transaction_id:
 *                   type: string
 *                   example: 'A3022407251007184420'
 *             examples:
 *               success:
 *                 summary: Successful registration
 *                 value:
 *                   status: '00000'
 *                   message: 'Success'
 *                   data:
 *                     id: 1
 *                     username: 'user123'
 *                     token_login: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *                   transaction_id: 'A3022407251007184420'
 *       400:
 *         description: Bad Request - The request parameters are invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               bad_request:
 *                 summary: Invalid request
 *                 value:
 *                   status: 400
 *                   message: 'Username can only contain alphabetic characters.'
 *                   error: 'Bad Request'
 *                   transaction_id: 'A3022407251005440210'
 *       404:
 *         description: Not Found - The requested route was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               not_found:
 *                 summary: Route not found
 *                 value:
 *                   status: 404
 *                   message: 'No route matched with those values'
 *                   error: 'Not Found'
 *                   transaction_id: 'A3022407251009152750'
 *       409:
 *         description: Conflict - Username already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               conflict:
 *                 summary: Conflict - Username already exists
 *                 value:
 *                   status: 409
 *                   message: 'Username already exists'
 *                   error: 'Conflict'
 *                   transaction_id: 'A3022407251016509260'
 *       500:
 *         description: Internal Server Error - An error occurred on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               server_error:
 *                 summary: Server error
 *                 value:
 *                   status: 500
 *                   message: 'An internal server error occurred'
 *                   error: 'Internal Server Error'
 *                   transaction_id: 'A3022407251010424070'
 */
