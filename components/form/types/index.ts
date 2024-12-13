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
  group: Group | undefined | null;
};

export type GroupFormProps = {
  groupDetails: GroupDetails | null | undefined;
  isEditing: Boolean;
  participantWithExpenses?: string[];
};
