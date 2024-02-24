import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { Calendar } from 'react-native-calendars';
import styles from './styles/CustomCalendarStyles';

const CustomCalendar = ({
    visible = false,
    setVisible = () => { },
    selectedDate = '',
    setSelectedDate = () => { }
}) => {
    return (
        <>
            <Modal visible={visible} transparent={true} animationType={'slide'}>
                <View style={styles.modalMainView}>
                    <View style={{ width: '80%' }}>
                        <Calendar
                            onDayPress={(day) => { setSelectedDate(day.dateString) }}
                            theme={{ todayTextColor: 'blue' }}
                            markedDates={{ [selectedDate]: { selected: true } }}
                        />
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.btnStyles} onPress={() => { setVisible(false); }}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnStyles} onPress={() => { setVisible(false) }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default CustomCalendar;
