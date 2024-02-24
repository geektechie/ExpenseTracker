import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AddExpenseScreen from './AddExpenseScreen';
import ViewExpensesScreen from './ViewExpensesScreen';
import ExpenseSummaryScreen from './ExpenseSummaryScreen';
import EditExpenseScreen from './EditExpenseScreen';
import ProfileScreen from '../profile/ProfileScreen';

const HomeScreen = () => {
    const Tab = createBottomTabNavigator();
    const StackNavigator = createStackNavigator()

    const ExpenseStackScreen = () => (
        <StackNavigator.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <StackNavigator.Screen name="ViewExpensesScreen" component={ViewExpensesScreen} options={{ title: "Expense List" }} />
            <StackNavigator.Screen name="AddExpense" component={AddExpenseScreen} />
            <StackNavigator.Screen name="EditExpenseScreen" component={EditExpenseScreen} options={{ title: "Edit Expense" }} />
        </StackNavigator.Navigator>
    );

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="ViewExpenses" component={ExpenseStackScreen} options={{ headerShown: false, title: "Expense" }} />
                <Tab.Screen name="ExpenseSummary" component={ExpenseSummaryScreen} options={{ title: "Summary" }} />
                <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Profile" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default HomeScreen;
