import React, { useState } from 'react';
import { } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles/CustomDropDownStyles';

const CustomDropDown = ({
    selectedCategory = '',
    setSelectedCategory = () => { }
}) => {

    const [categoryItem, setCategoryItem] = useState([
        { label: 'Food', value: 'Food' },
        { label: 'Transportation', value: 'Transportation' },
        { label: 'Shopping', value: 'Shopping' },
        { label: 'Insurance', value: 'Insurance' },
        { label: 'Taxes', value: 'Taxes' },
        { label: 'Other', value: 'Other' },
    ])
    const [categoryDropOpen, setCategoryDropOpen] = useState(false);

    return (
        <>
            <DropDownPicker
                open={categoryDropOpen}
                setOpen={setCategoryDropOpen}
                value={selectedCategory}
                setValue={setSelectedCategory}
                items={categoryItem}
                setItems={setCategoryItem}
                style={styles.dropDownStyles}
                placeholder={'Select Category'}
                placeholderStyle={{ color: 'gray' }}
            />
        </>
    );
}

export default CustomDropDown;
