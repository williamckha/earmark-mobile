import * as React from 'react';
import { Text, View, SectionList, StyleSheet, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyles } from '../constants/GlobalStyles';
import { useGetTransactionsQuery } from '../app/api/account';
import { TransactionsScreenProps } from '../navigation/types';
import { formatCurrency } from '../util/formatters/currency-formatter';
import { formatDate } from '../util/formatters/date-formatter';
import { LoadingIndicator } from '../components/common/LoadingIndicator';

export const TransactionsScreen = ({ route, navigation }: TransactionsScreenProps) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    sectionHeader: {
      backgroundColor: colors.background,
      color: colors.text,
      borderColor: colors.border,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      paddingHorizontal: 16,
      paddingVertical: 12
    },
    sectionRow: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 12
    }
  })

  const { account } = route.params;
  const { data: transactions, error, isLoading } = useGetTransactionsQuery(account?.id);

  if (error) {
    return <Text>Error</Text>;
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (!transactions) {
    return <Text>No transactions</Text>;
  }

  // Group transactions into sections by date 
  const sectionData = transactions.reduce((result, transaction) => {

    let transactionDate = new Date(transaction.date);
    let existingSection = result.find(section => ( 
      section.title.getFullYear() === transactionDate.getFullYear() &&
      section.title.getMonth() === transactionDate.getMonth() &&
      section.title.getDate() === transactionDate.getDate()
    ));

    if (existingSection) {
      existingSection.data.push(transaction);
    } else {
      result.push({
        title: transactionDate,
        data: [transaction]
      });
    }

    return result;

  }, [])

  return (
    <View>
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[GlobalStyles.fontSemiBold, styles.sectionHeader]}>
            {formatDate(title)}
          </Text>
        )}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.sectionRow,
              (index == 0) ? { borderTopWidth: 0 } : { borderTopWidth: 0.5 }
            ]}
          >
            <TransactionRow
              amount={item.amount} 
              account={item.accountName} 
              payee={item.payeeName} 
              category={item.categoryName}
            />
          </View>
        )}
        stickySectionHeadersEnabled
      />
    </View>
  );
}

type TransactionRowProps = {
  amount: number,
  account: string,
  payee: string,
  category: string
}

export const TransactionRow = (props: TransactionRowProps) => {
  return (
    <TouchableHighlight>
      <View style={TransactionRowStyles.row}>
        <View style={TransactionRowStyles.leftColumn}>
          <Text 
            style={[
              GlobalStyles.fontRegular,
            ]}
          >
            {props.payee}
          </Text>
          <Text style={GlobalStyles.fontCaption}>
            {props.category}
          </Text>
        </View>
        <View style={TransactionRowStyles.rightColumn}>
          <Text 
            style={[
              GlobalStyles.fontMedium,
              (props.amount >= 0) ? { color: "green" } : { color: "red" }
            ]}
          >
            {formatCurrency(props.amount).formattedValue}
          </Text>
          <Text style={GlobalStyles.fontCaption}>
            {props.account}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const TransactionRowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftColumn: {
    flexDirection: "column",
    alignItems: "flex-start" 
  },
  rightColumn: {
    flexDirection: "column",
    alignItems: "flex-end" 
  }
})