import * as React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyles } from '../constants/GlobalStyles';
import { useGetAccountsQuery } from '../app/api/account';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransactionsScreen } from './TransactionsScreen';
import { AccountsScreenProps, AccountsStackParamsList } from '../navigation/types';
import { formatCurrency } from '../util/formatters/currency-formatter';
import { LoadingIndicator } from '../components/common/LoadingIndicator';

const AccountsStack = createNativeStackNavigator<AccountsStackParamsList>();

export const AccountsStackScreen = () => {
  return (
    <AccountsStack.Navigator screenOptions={{
      headerShown: true,
      headerTitleStyle: { ...GlobalStyles.fontBold, fontSize: 20 }
    }}>
      <AccountsStack.Screen name="Accounts" component={AccountsScreen} />
      <AccountsStack.Screen 
        name="Transactions" 
        component={TransactionsScreen} 
        options={({ route }) => ({ title: route.params.account?.name })} 
      />
    </AccountsStack.Navigator>
  )
}

export const AccountsScreen = ({ navigation }: AccountsScreenProps) => {
  const { colors } = useTheme();

  const { data: accounts, isLoading } = useGetAccountsQuery()

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!accounts) {
    return <Text>No accounts</Text>
  }

  return (
    <View style={{ backgroundColor: colors.background }}>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <AccountCard
            accountName={item.name}
            accountBalance={item.totalBalance}
            onPress={() => { navigation.navigate("Transactions", { account: item }) }}
          />
        )}
      />
    </View>
  );
}

type AccountCardProps = {
  accountName: string,
  accountBalance: number,
  onPress: () => void
}

export const AccountCard = (props: AccountCardProps) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    accountCard: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 0.5,
      borderRadius: 8,
      padding: 12,
      marginHorizontal: 12,
      marginTop: 12,
      flexDirection: "column",
    },
  })

  return (
    <View>
      <TouchableHighlight onPress={props.onPress}>
        <View style={styles.accountCard}>
          <Text style={[GlobalStyles.fontRegular]}>{props.accountName}</Text>
          <Text style={[GlobalStyles.fontSemiBold, { fontSize: 20 }]}>
            {formatCurrency(props.accountBalance).formattedValue}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}