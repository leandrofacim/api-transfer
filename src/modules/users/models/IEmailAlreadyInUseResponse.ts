/**
 * @swagger
 * definitions:
 *   IErrorBadRequestResponse:
 *     type: object
 *     properties:
 *       statusCode:
 *         type: number
 *       error:
 *         type: string
 *       message:
 *         type: string
 *       validation:
 *         type: object
 *         properties:
 *           body:
 *             type: object
 *             properties:
 *               source:
 *                 type: string
 *               keys:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - foo
 *                   - bar
 *               message:
 *                 type: string
 */
export interface IErrorBadRequestResponse {
  statusCode: number;
  error: string;
  message: string;
  validation: {
    body: {
      source: string;
      keys: string[];
      message: string;
    };
  };
}

/**
 * @swagger
 * definitions:
 *   IEmailAlreadyInUseResponse:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *       message:
 *         type: string
 */
export interface IEmailAlreadyInUseResponse {
  status: string;
  message: string;
}
