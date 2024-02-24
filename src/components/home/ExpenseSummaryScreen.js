import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestExpenseList } from '../../redux/actions/actionCreators/expenseActionCreators'
import styles from './styles/ExpenseSummaryStyles';
import { CustomDropDown, CustomCalendar, CustomButton, Spinner } from '../../common';
import moment from 'moment';

const ExpenseSummaryScreen = (props) => {
    const [displaySpinner, setDisplaySpinner] = useState(false);
    const [catValue, setCatValue] = useState('');
    const [dateValue, setDateValue] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [displayCalModal, setDisplayCalModal] = useState(false);

    useEffect(() => {
        getExpenseList()
    }, []);

    const getExpenseList = () => {
        setDisplaySpinner(true);
        props.requestExpenseList()
    }

    useEffect(() => {
        if (props.data.myExpenseList != undefined && props.data.myExpenseList.success) {
            setExpenses(props.data.myExpenseList.data)
            setFilteredExpenses(props.data.myExpenseList.data)
            setDisplaySpinner(false);
        } else {
            props.data.myExpenseList = undefined
            setDisplaySpinner(false);
        }
    }, [props.data.myExpenseList])

    const renderItem = ({ item }) => (
        <View style={styles.expenseItem}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{item.expenseDate}</Text>
        </View>
    );

    function onFilter() {
        let temp = expenses;
        if (catValue != '') temp = expenses.filter((item) => (item.category == catValue));
        if (dateValue != '') temp = temp.filter((item) => (item.expenseDate == dateValue));
        setFilteredExpenses(temp);
    }

    return (
        <View style={styles.container}>
            <CustomDropDown
                selectedCategory={catValue}
                setSelectedCategory={setCatValue}
            />

            <CustomButton
                title={dateValue != undefined && dateValue != '' && dateValue != null ? dateValue : `Select Date`}
                onClick={() => setDisplayCalModal(true)}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <CustomButton
                    title={'Filter'}
                    onClick={() => onFilter()}
                    customStyles={{ width: '45%' }}
                />
                <CustomButton
                    title={'Reset'}
                    onClick={() => setFilteredExpenses(expenses)}
                    customStyles={{ width: '45%' }}
                />
            </View>

            <FlatList
                data={filteredExpenses}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <CustomCalendar
                visible={displayCalModal}
                setVisible={setDisplayCalModal}
                selectedDate={dateValue}
                setSelectedDate={setDateValue}
            />

            {displaySpinner ? <Spinner visible={displaySpinner} /> : null}
        </View>
    );
};

const mapStateToProps = (state) => { return { data: state.dataReducer } }
const mapDispatchToProps = dispatch => bindActionCreators({ requestExpenseList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseSummaryScreen)
