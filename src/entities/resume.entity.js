import { EntitySchema } from "typeorm";

export const Resumes = new EntitySchema({
  name: "Resumes",
  tableName: "resumes",
  columns: {
    resumeId: {
      primary: true,
      type: "int",
      generated: true
    },
    title: {
      type: "varchar"
    },
    content: {
      type: "text"
    },
    userId: {
      type: "int"
    },
    userName: {
      type: "varchar"
    },
    status: {
      type: "varchar",
      default: "APPLY"
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
    user: {
      target: "Users",
      type: "many-to-one",
      inverseSide: "resumes",
      onDelete: "CASCADE"
    }
  }
});

export const Status = {
  APPLY: "APPLY",
  DROP: "DROP",
  PASS: "PASS",
  INTERVIEW1: "INTERVIEW1",
  INTERVIEW2: "INTERVIEW2",
  FINAL_PASS: "FINAL_PASS"
};
