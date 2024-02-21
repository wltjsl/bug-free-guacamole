import { EntitySchema } from "typeorm";

export const Users = new EntitySchema({
  name: "Users",
  tableName: "users",
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: true
    },
    email: {
      type: "varchar",
      unique: true
    },
    password: {
      type: "varchar"
    },
    userName: {
      type: "varchar"
    },
    createdAt: {
      type: "timestamp",
      createDate: true
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true
    }
  },
  relations: {
    resumes: {
      target: "Resumes",
      type: "one-to-many",
      inverseSide: "user"
    }
  }
});
