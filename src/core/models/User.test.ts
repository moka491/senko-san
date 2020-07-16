import { Sequelize } from "sequelize-typescript";
import { User } from "./User";
import { createSequalizeTestDb } from "../testing/sequelize";

describe("User Model", () => {
  it("can be instantiated", async () => {
    const sequelize = await createSequalizeTestDb([User]);

    const user = new User({ id: 123456789, timeZone: "Europe/Berlin" });
    await user.save();

    const usersResult = await User.findAll();

    expect(usersResult).toHaveLength(1);
    expect(usersResult[0].id).toBe(123456789);
    expect(usersResult[0].timeZone).toBe("Europe/Berlin");
  });
});
