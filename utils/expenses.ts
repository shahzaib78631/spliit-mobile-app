import { Expense } from "./trpc";
import dayjs, { Dayjs } from "dayjs";

function getGroupedExpensesByDate(expenses: Expense[]) {
  const today = dayjs();
  return expenses.reduce((result: { [key: string]: Expense[] }, expense) => {
    const expenseGroup = getExpenseGroup(dayjs(expense.expenseDate), today);
    result[expenseGroup] = result[expenseGroup] ?? [];
    result[expenseGroup].push(expense);
    return result;
  }, {});
}

function getExpenseGroup(date: Dayjs, today: Dayjs) {
  if (today.isBefore(date)) {
    return EXPENSE_GROUPS.UPCOMING;
  } else if (today.isSame(date, "week")) {
    return EXPENSE_GROUPS.THIS_WEEK;
  } else if (today.isSame(date, "month")) {
    return EXPENSE_GROUPS.EARLIER_THIS_MONTH;
  } else if (today.subtract(1, "month").isSame(date, "month")) {
    return EXPENSE_GROUPS.LAST_MONTH;
  } else if (today.isSame(date, "year")) {
    return EXPENSE_GROUPS.EARLIER_THIS_YEAR;
  } else if (today.subtract(1, "year").isSame(date, "year")) {
    return EXPENSE_GROUPS.LAST_YEAR;
  } else {
    return EXPENSE_GROUPS.OLDER;
  }
}

const EXPENSE_GROUPS = {
  UPCOMING: "upcoming",
  THIS_WEEK: "thisWeek",
  EARLIER_THIS_MONTH: "earlierThisMonth",
  LAST_MONTH: "lastMonth",
  EARLIER_THIS_YEAR: "earlierThisYear",
  LAST_YEAR: "lastYear",
  OLDER: "older",
};

export { getGroupedExpensesByDate, EXPENSE_GROUPS };
