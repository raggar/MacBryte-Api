import { UserModel } from "../database/users/model";
import { IUser } from "../database/users/types";
import initialize from "../database/initialize";

(async () => {
  initialize.connect();

  const users: IUser[] = [];

  try {
    for (const user of users) {
      await UserModel.create(user);
      console.log(`Created user ${user.email}`);
    }
    initialize.disconnect();
  } catch (e) {
    console.error(e);
  }
})();
