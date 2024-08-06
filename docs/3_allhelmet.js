/**
 * @swagger
 * /api/v1/helmet/all:
 *   get:
 *     tags: ['User Operations']
 *     summary: Get All Helmet
 *     description: Retrieve all helmets from the database
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: OK
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
 *                     count:
 *                       type: integer
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           price:
 *                             type: integer
 *                           stock:
 *                             type: integer
 *                           type:
 *                             type: string
 *                 transaction_id:
 *                   type: string
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: '00000'
 *                   message: Success
 *                   data:
 *                     count: 2
 *                     list:
 *                       - id: 1
 *                         name: Arai J
 *                         price: 2000000
 *                         stock: 5
 *                         type: Full Face
 *                       - id: 2
 *                         name: Arai B
 *                         price: 2500000
 *                         stock: 100
 *                         type: Full Face
 *                   transaction_id: A3022407251027316230
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
 *               not_found:
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
 *                   message: An internal server error occurred
 *                   error: Internal Server Error
 *                   transaction_id: A3022407251010424070
 */
