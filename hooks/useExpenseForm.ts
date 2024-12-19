import {
  expenseFormSchema,
  ExpenseFormValues,
} from "spliit-api/src/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseDetails, Group, Reimbursement, trpc } from "@/utils/trpc";
import { useRouter } from "expo-router";

interface Params {
  expense: ExpenseDetails | null;
  reimbursementParams?: Reimbursement;
  group: Group | undefined | null;
}

export default function useExpenseForm({
  expense,
  reimbursementParams,
  group,
}: Params) {
  /**
   * Initialize form state
   */
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ExpenseFormValues>({
    defaultValues: expense
      ? {
          title: expense.title,
          expenseDate: expense.expenseDate ?? new Date(),
          amount: String(expense.amount / 100) as unknown as number, // hack
          category: expense.categoryId,
          paidBy: expense.paidById,
          paidFor: expense.paidFor.map(({ participantId, shares }) => ({
            participant: participantId,
            shares: String(shares / 100) as unknown as number,
          })),
          splitMode: expense.splitMode,
          saveDefaultSplittingOptions: false,
          isReimbursement: expense.isReimbursement,
          documents: expense.documents,
          notes: expense.notes ?? "",
        }
      : reimbursementParams
      ? {
          title: reimbursementParams.title,
          expenseDate: new Date(),
          amount: String(reimbursementParams.amount / 100) as unknown as number, // hack,
          category: 1,
          paidBy: reimbursementParams.paidBy,
          paidFor: [{ participant: reimbursementParams.paidFor, shares: 1 }],
          splitMode: "EVENLY",
          saveDefaultSplittingOptions: false,
          isReimbursement: true,
          documents: [],
          notes: "",
        }
      : {
          title: "",
          expenseDate: new Date(),
          amount: 0,
          category: 0,
          paidBy: undefined,
          paidFor: [],
          splitMode: "EVENLY",
          saveDefaultSplittingOptions: false,
          isReimbursement: false,
          documents: [],
          notes: "",
        },
    resolver: zodResolver(expenseFormSchema),
  });

  // Create mutation
  const { mutateAsync: createExpenseMutation } =
    trpc.groups.expenses.create.useMutation();
  const { mutateAsync: updateExpenseMutation } =
    trpc.groups.expenses.update.useMutation();

  const router = useRouter();

  const utils = trpc.useUtils();

  const createExpense = async (expenseFormValues: ExpenseFormValues) => {
    if (group) {
      await createExpenseMutation({ groupId: group?.id, expenseFormValues });
      await utils.groups.invalidate();
      router.back();
    }
  };

  const updateExpense = async (expenseFormValues: ExpenseFormValues) => {
    if (group && expense) {
      await updateExpenseMutation({
        groupId: group?.id,
        expenseId: expense?.id,
        expenseFormValues,
      });
      await utils.groups.invalidate();
      router.back();
    }
  };

  const splitMode = watch("splitMode");

  /**
   * Return form-related methods and state for component use
   */
  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    splitMode,
    createExpense,
    updateExpense,
  };
}
