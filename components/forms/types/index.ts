import {
  ExpenseDetails,
  Group,
  GroupDetails,
  Reimbursement,
} from "@/utils/trpc";
import { ExpenseFormValues } from "spliit-api/src/lib/schemas";

export type ExpenseFormProps = {
  expense: ExpenseDetails | null;
  reimbursementParams?: Reimbursement;
  group: Group | undefined;
  isEditing: Boolean;
};

export type GroupFormProps = {
  group: Group | null;
  isEditing: Boolean;
  participantWithExpenses?: string[];
};
