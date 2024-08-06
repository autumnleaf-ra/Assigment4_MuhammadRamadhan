/**
 * @swagger
 * /api/v1/helmet/delete/{id}:
 *   delete:
 *     tags: ['User Operations']
 *     summary: Delete helmet
 *     description: Remove a helmet by its ID.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the helmet
 *         required: true
 *         schema:
 *           type: string
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
 *                   example: 'Deleted helmet with id 12 successfully'
 *                 transaction_id:
 *                   type: string
 *                   example: 'A3022407251104372950'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: '00000'
 *                   message: 'Success'
 *                   data: 'Deleted helmet with id 12 successfully'
 *                   transaction_id: 'A3022407251104372950'
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
 *         description: Not Found - The requested helmet ID was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: 'Helmet with id 12 not found'
 *                 error:
 *                   type: string
 *                   example: 'Not Found'
 *                 transaction_id:
 *                   type: string
 *                   example: 'A3022407251106195360'
 *             examples:
 *               not_found:
 *                 summary: Helmet not found
 *                 value:
 *                   status: 404
 *                   message: 'Helmet with id 12 not found'
 *                   error: 'Not Found'
 *                   transaction_id: 'A3022407251106195360'
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
