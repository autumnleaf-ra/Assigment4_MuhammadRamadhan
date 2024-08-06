/**
 * @swagger
 * /api/v1/helmet/login:
 *   post:
 *     tags: ['User Operations']
 *     summary: User login
 *     description: Login with user credentials
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'testaja'
 *               password:
 *                 type: string
 *                 example: 'rama123'
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     token_login:
 *                       type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               success:
 *                 summary: Successful login
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data:
 *                     id: 4
 *                     username: testaja
 *                     token_login: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ0ZXN0YWphIiwiaWF0IjoxNzIxODc2MjQ5LCJleHAiOjE3MjE4Nzk4NDl9.5cZu7GIH8KXHtfzNf_tiyeUgjprPCU_n8wFruLtznOI
 *                   transaction_id: A3022407250957291770
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
 *               invalid_request:
 *                 summary: Invalid request
 *                 value:
 *                   status: 400
 *                   message: Username can only contain alphabetic characters.
 *                   error: Bad Request
 *                   transaction_id: A3022407251005440210
 *       422:
 *         description: Unprocessable Entity - The request was well-formed but the server was unable to process it
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
 *               account_not_found:
 *                 summary: Account not found
 *                 value:
 *                   status: 422
 *                   message: Account not found, username or password wrong!
 *                   error: Not Found
 *                   transaction_id: A3022407250959118220
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
 *               route_not_found:
 *                 summary: Route not found
 *                 value:
 *                   status: 404
 *                   message: No route matched with those values
 *                   error: Not Found
 *                   transaction_id: A3022407251009152750
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
 *                   message: Username already exists
 *                   error: Conflict
 *                   transaction_id: A3022407251016509260
 */
