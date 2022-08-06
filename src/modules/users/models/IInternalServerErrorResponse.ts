/**
 * @swagger
 * definitions:
 *   IInternalServerErrorResponse:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *       message:
 *         type: string
 */
export interface IInternalServerErrorResponse {
  status: string;
  message: string;
}
