import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import Colors from '../../constants/Colors';
import plus from '../../../assets/plus.png'
import styles from './styles/ViewExpensesStyle'
import { requestExpenseList, requestRemoveExpense } from '../../redux/actions/actionCreators/expenseActionCreators'
import { Spinner } from '../../common';


const ViewExpensesScreen = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [displaySpinner, setDisplaySpinner] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getExpenseList();
    }, []);

    const getExpenseList = () => {
        props.requestExpenseList()
    }

    useEffect(() => {
        if (props.data.myExpenseList != undefined && props.data.myExpenseList.success) {
            setExpenses(props.data.myExpenseList.data);
            setDisplaySpinner(false);
            setRefreshing(false);
        } else {
            props.data.myExpenseList = undefined
            setDisplaySpinner(false);
        }
    }, [props.data.myExpenseList])

    useEffect(() => {
        try {
            let data = props.data.removeExpenseData;
            if (data != undefined) {
                if (data.data != undefined && data.data.success == true) {
                    Alert.alert('Success', data.data.message);
                    props.data.removeExpenseData = undefined;
                    setDisplaySpinner(false);
                    getExpenseList()
                } else {
                    setDisplaySpinner(false);
                    props.data.removeExpenseData = undefined;
                }
            }
        } catch (error) {
            setDisplaySpinner(false);
            props.data.data.removeExpenseData = undefined;
            console.log("props.data.removeExpenseData Catch error : ", error);
        }
    }, [props.data.removeExpenseData])

    const handleEdit = (item) => {
        props.navigation.navigate('EditExpenseScreen', { expenseItem: item, getExpense: () => getExpenseList() })
    };

    function onRefresh() {
        setRefreshing(true);
        getExpenseList();
    }

    const handleDelete = (item) => {
        // Handle delete action
        Alert.alert(
            'Delete Expense',
            'Are you sure, You want to Delete Expense?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'Yes', onPress: () => {
                        setDisplaySpinner(true);
                        props.requestRemoveExpense({ id: item.id })
                    }
                },
            ]
        );
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => handleEdit(data.item)}
            >
                <Text style={styles.backTextWhite}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => handleDelete(data.item)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <SwipeListView
                    data={expenses}
                    renderItem={({ item }) => (
                        <View style={styles.rowFront}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ marginBottom: 5, }}>{item.category}</Text>
                                <Text>{item.expenseDate}</Text>
                            </View>
                            <Text>${item.amount}</Text>
                        </View>
                    )}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-150}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} titleColor={Colors.BLUE} />}
                />
            </View>
            <TouchableOpacity style={styles.plusContainer} onPress={() => props.navigation.navigate('AddExpense', { getExpense: () => getExpenseList() })}>
                <Image source={plus} style={{ width: 30, height: 30 }} tintColor={Colors.WHITE} />
            </TouchableOpacity>

            {displaySpinner ? <Spinner visible={displaySpinner} /> : null}
        </View>
    );
};

const mapStateToProps = (state) => { return { data: state.dataReducer } }
const mapDispatchToProps = dispatch => bindActionCreators({ requestExpenseList, requestRemoveExpense }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewExpensesScreen);
