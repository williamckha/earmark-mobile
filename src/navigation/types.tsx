import { Account } from "../app/api/account";
import { StackScreenProps } from "@react-navigation/stack";

export type AccountsStackParamsList = {
  Accounts: undefined,
  Transactions: { account: Account }
};

export type AccountsScreenProps = StackScreenProps<AccountsStackParamsList, "Accounts">;
export type TransactionsScreenProps = StackScreenProps<AccountsStackParamsList, "Transactions">;