/**
 * @swagger
 * /api/v1/helmet/type:
 *   get:
 *     tags: ['User Operations']
 *     summary: Get All Type Helmet
 *     description: Retrieve a list of all helmet types
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successful response - List of helmet types
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
 *                     count:
 *                       type: integer
 *                       example: 2
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: 'Full Face'
 *             examples:
 *               successful_response:
 *                 summary: Successful response
 *                 value:
 *                   status: '00000'
 *                   message: 'Success'
 *                   data:
 *                     count: 2
 *                     list:
 *                       - id: 1
 *                         name: 'Full Face'
 *                       - id: 2
 *                         name: 'Half Face'
 *                   transaction_id: 'A3022407251038167840'
 *       401:
 *         description: Unauthorized - Bearer token is missing or invalid
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
 *               unauthorized_response:
 *                 summary: Unauthorized request
 *                 value:
 *                   status: 401
 *                   message: Access denied. No token provided
 *                   error: Unauthorized
 *                   transaction_id: A3022407251033274140
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
 *               not_found_response:
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
 *               server_error_response:
 *                 summary: Server error
 *                 value:
 *                   status: 500
 *                   message: An internal server error occurred
 *                   error: Internal Server Error
 *                   transaction_id: A3022407251010424070
 */
