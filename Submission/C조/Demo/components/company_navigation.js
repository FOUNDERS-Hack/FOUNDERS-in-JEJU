import { createStackNavigator } from "react-navigation-stack";
import CompanyMainScreen from "./company_main";
import Company_employment from "./company_employment";
import Company_list from "./company_list";

const Company_navigation = createStackNavigator({
  Company: {
    screen: CompanyMainScreen,
    navigationOptions: { headerShown: false },
  },
  Company_employment: {
    screen: Company_employment,
    navigationOptions: { headerShown: false },
  },
  Company_list: {
    screen: Company_list,
    navigationOptions: { headerShown: false },
  },
});

export default Company_navigation;

// class App extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Home" component={CompanyMainScreen} />
//           <Stack.Screen name="Company" component={Company} />
//           <Stack.Screen
//             name="Company_employment"
//             component={Company_employment}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
