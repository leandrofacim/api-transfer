/**
 * @swagger
 * definitions:
 *    ICreateUserRequest:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example:
 *            João da Silva
 *        password:
 *          type: string
 *          example:
 *            123456
 *        email:
 *          type: string
 *          example:
 *            loremipisum@hotmail.com
 *        cpf:
 *          type: string
 *          example:
 *            164.645.900-81
 *        cnpj:
 *          type: string
 *          example:
 *            32.946.503/0001-40
 *        type:
 *          type: string
 *          example:
 *            common
 *      required:
 *       - name
 *       - password
 *       - email
 *       - cpf
 *       - type
 */
export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cnpj: string;
  type: string;
}
