import { createTRPCReact } from "@trpc/react-query";
import { AppRouterOutput, type AppRouter } from "spliit-api";

// Initialize TRPC for React
export const trpc = createTRPCReact<AppRouter>();

// Expense Types
export type Expense =
  AppRouterOutput["groups"]["expenses"]["list"]["expenses"][number];
export type ExpenseDetails =
  AppRouterOutput["groups"]["expenses"]["get"]["expense"];

export type Reimbursement = {
  title: string;
  paidBy: string;
  paidFor: string;
  amount: number;
};

// Group Types
export type Group = NonNullable<AppRouterOutput["groups"]["get"]["group"]>;
export type GroupParticipant = Group["participants"][number];
export type GroupList = NonNullable<AppRouterOutput["groups"]["list"]>;
export type GroupListItem = NonNullable<
  AppRouterOutput["groups"]["list"]["groups"][number]
>;
export type GroupDetails = AppRouterOutput["groups"]["getDetails"]["group"];
export type Participants =
  AppRouterOutput["groups"]["getDetails"]["group"]["participants"];
export type Participant =
  AppRouterOutput["groups"]["getDetails"]["group"]["participants"][number];

// Category Types
export type Category =
  AppRouterOutput["categories"]["list"]["categories"][number];
