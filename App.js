import { LogBox } from 'react-native';
import { Amplify } from 'aws-amplify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import amplifyconfig from './src/amplifyconfiguration.json';
import { sagaMiddleware, store, persistor } from './src/store/store';
import mySage from './src/redux/saga/sagas';
import MainNavigation from './src/navigations';

sagaMiddleware.run(mySage);
LogBox.ignoreAllLogs();
Amplify.configure(amplifyconfig);

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>

  );
}
