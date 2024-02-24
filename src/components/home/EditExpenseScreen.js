import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestEditExpense } from '../../redux/actions/actionCreators/expenseActionCreators';
import Colors from '../../constants/Colors';
import calendar from '../../../assets/calendar.png';
import moment from 'moment';
import { CustomCalendar, CustomDropDown, Spinner } from '../../common';
import styles from './styles/EditExpenseStyles';

const EditExpenseScreen = (props) => {
    const expenseItem = props.route.params.expenseItem
    const [amount, setAmount] = useState(expenseItem.amount + '');
    const [category, setCategory] = useState(expenseItem.category);
    const [date, setDate] = useState(moment.utc(expenseItem.expenseDate).local().format('YYYY-MM-DD'));
    const [displayCalModal, setDisplayCalModal] = useState(false);
    const [displaySpinner, setDisplaySpinner] = useState(false);

    useEffect(() => {
        try {
            let data = props.data.dataReducer.editExpenseData;
            if (data != undefined) {
                if (data.data != undefined && data.data.success == true) {
                    Alert.alert('Success', data.data.message);
                    props.data.dataReducer.editExpenseData = undefined;
                    setDisplaySpinner(false);
                    props.navigation.goBack()
                    props.route.params.getExpense()
                } else props.data.dataReducer.editExpenseData = undefined;
            }
        } catch (error) {
            props.data.dataReducer.editExpenseData = undefined;
            console.log("props.data.editExpenseData Catch error : ", error);
        }
    }, [props.data.dataReducer.editExpenseData])

    // Check Validations
    function CheckValidations() {
        if (category == '') {
            Alert.alert('Error', 'Please Select Category');
            return false;
        }
        else if (amount == '') {
            Alert.alert('Error', 'Please Enter Amount');
            return false;
        }
        else if (date == '') {
            Alert.alert('Error', 'Please Select Date');
            return false;
        }
        else {
            return true;
        }
    }

    const handleEditExpense = () => {
        if (CheckValidations()) {
            setDisplaySpinner(true);
            props.requestEditExpense({
                data: JSON.stringify({
                    "category": category,
                    "amount": amount,
                    "expenseDate": date
                }),
                id: expenseItem.id,
            })
        }
    };

    return (
        <View style={styles.container}>
            <CustomDropDown
                selectedCategory={category}
                setSelectedCategory={setCategory}
            />

            <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
            />

            <View style={styles.calendarContainer}>
                <Text>Expense Date: </Text>
                <Text>{date != undefined && date}</Text>
                <TouchableOpacity onPress={() => { setDisplayCalModal(true) }}>
                    <Image source={calendar} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnEdit} onPress={handleEditExpense}>
                <Text style={{ color: Colors.WHITE }}>Edit Expense</Text>
            </TouchableOpacity>

            {
                displayCalModal
                    ?
                    <CustomCalendar
                        visible={displayCalModal}
                        setVisible={setDisplayCalModal}
                        selectedDate={date}
                        setSelectedDate={setDate}
                    />
                    :
                    null
            }
            {displaySpinner ? <Spinner visible={displaySpinner} /> : null}
        </View>
    );
};

const mapStateToProps = (state) => {
    return { data: state }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestEditExpense }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseScreen);
