import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Account } from "../app/api/account";

export type AccountsStackParamsList = {
  Accounts: undefined,
  Transactions: { account: Account }
};

export type AccountsScreenProps = NativeStackScreenProps<AccountsStackParamsList, "Accounts">;
export type TransactionsScreenProps = NativeStackScreenProps<AccountsStackParamsList, "Transactions">;