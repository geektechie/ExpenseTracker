import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestAddExpense } from '../../redux/actions/actionCreators/expenseActionCreators';
import Colors from '../../constants/Colors';
import calendar from '../../../assets/calendar.png';
import { CustomButton, CustomCalendar, CustomDropDown, Spinner } from '../../common';
import styles from './styles/AddExpenseStyles';

const AddExpenseScreen = (props) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [displayCalModal, setDisplayCalModal] = useState(false);
    const [displaySpinner, setDisplaySpinner] = useState(false);

    useEffect(() => {
        try {
            let data = props.data.dataReducer.addExpenseData;
            if (data != undefined) {
                // console.log("Add Expense Success : ", JSON.stringify(data))
                if (data.data != undefined && data.data.success == true) {
                    Alert.alert('Success', "Expense Added Succesfully");
                    props.data.dataReducer.addExpenseData = undefined;
                    setDisplaySpinner(false);
                    props.navigation.goBack()
                    props.route.params.getExpense()
                } else props.data.dataReducer.addExpenseData = undefined;
            }
        } catch (error) {
            props.data.dataReducer.addExpenseData = undefined;
            console.log("props.data.addExpenseData Catch Eroor : ", error);
        }
    }, [props.data.dataReducer.addExpenseData])

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

    const handleAddExpense = () => {
        if (CheckValidations()) {
            setDisplaySpinner(true);
            props.requestAddExpense({
                data: JSON.stringify({
                    "category": category,
                    "amount": amount,
                    "expenseDate": date
                })
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

            <CustomButton
                title={'Add Expense'}
                onClick={handleAddExpense}
            />

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

const mapDispatchToProps = dispatch => bindActionCreators({ requestAddExpense }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseScreen);
