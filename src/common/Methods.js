import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

export const storeToken = async (val) => {
    try {
        await AsyncStorage.setItem('idToken', val)
    } catch (error) {
        console.log(Colors.CONSOLE_RED + "storeToken Error : " + Colors.CONSOLE_WHITE + error)
    }
};

export const getStoredToken = async () => {
    try {
        return await AsyncStorage.getItem('idToken')
    } catch (error) {
        console.log(Colors.CONSOLE_RED + "getStoredToken Error : " + Colors.CONSOLE_WHITE + error)
    }
};
