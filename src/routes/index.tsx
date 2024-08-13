import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../pages/login';
import Home from '../pages/home';
import Cadastro from '../pages/cadastro';
import Menu from '../pages/menu';

const Stack = createNativeStackNavigator();


export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}