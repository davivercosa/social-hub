import bcrypt from "bcrypt";

import { AppDataSource } from "../../../../data-source";

import { Account } from "../../entitities/Account.entity";

import {
  iUpdateAccountPassword,
  iUpdateAccountPasswordResponse,
} from "./interfaces/updateAccountPassword.interface";

export class UpdateAccountPasswordUseCase {
  constructor(
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}
  async resolve(
    { password }: iUpdateAccountPassword,
    accountId: number
  ): Promise<iUpdateAccountPasswordResponse> {
    try {
      const account = await this.accountRepository.findOneBy({
        id_account: accountId,
      });

      if (!account) {
        return {
          status: "error",
          message: "Account not found on our database. Please try again!",
          code: 404,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      account.password = hashedPassword;

      await this.accountRepository.save(account);

      return {
        status: "success",
        message: "Account Password successfully updated!",
        code: 200,
      };
    } catch (error) {
      return {
        status: "error",
        message: error.toString(),
        code: 500,
      };
    }
  }
}
