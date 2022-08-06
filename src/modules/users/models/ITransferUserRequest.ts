/**
 * @swagger
 * definitions:
 *    ITransferUserRequest:
 *      type: object
 *      properties:
 *        payee:
 *          type: string
 *          example:
 *            70058491-b66d-4909-a41c-b97b3417c84d
 *        value:
 *          type: number
 *          example:
 *            10.10
 *      required:
 *       - payee
 *       - value
 */
export interface ITransferUserRequest {
  payee: string;
  value: number;
}
