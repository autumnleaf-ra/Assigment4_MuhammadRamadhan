/**
 * @swagger
 * /api/v1/helmet/add_helmet:
 *   post:
 *     tags: ['User Operations']
 *     summary: Add New Helmet
 *     description: Add a new helmet to the inventory
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Helmet details to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: '1'
 *               name:
 *                 type: string
 *                 example: 'Arai F'
 *               price:
 *                 type: string
 *                 example: '2500000'
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Successful response - Operation completed successfully
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
 *                   type: string
 *                   example: "Added 'Arai F' as '2500000' to helmet with stock 100"
 *                 transaction_id:
 *                   type: string
 *                   example: 'A3022407251041027630'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: '00000'
 *                   message: 'Success'
 *                   data: "Added 'Arai F' as '2500000' to helmet with stock 100"
 *                   transaction_id: 'A3022407251041027630'
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
 *                   message: 'Body is required or Type variable must be number/string'
 *                   error: Bad Request
 *                   transaction_id: A3022407251005440210
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
 *               unauthorized:
 *                 summary: Unauthorized request
 *                 value:
 *                   status: 401
 *                   message: 'Access denied. No token provided'
 *                   error: 'Unauthorized'
 *                   transaction_id: 'A3022407251033274140'
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
 *       500:
 *         description: Error - Internal Server Error
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
