import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Lauding from './../screens/Lauding';
import Home from './../screens/Home';
import Cart from '../screens/Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import Account from './../screens/Account';
import Categories from '../screens/Categories';


const COLORS ={
   colorActive:'teal',
   colorInit:'gray',
   backgroundActive:'white'
}
const DIMENS = {
    iconSize : 31,
    fontsize: 18
}
const switchNavigator = createSwitchNavigator({
    // landingStack: {
    //     screen: createStackNavigator({
    //         Landing: Lauding,
    //     }, {
    //         defaultNavigationOptions: {
    //             headerShown: false
    //         }
    //     }),

    // },
    
    homeStack: createBottomTabNavigator({
        // Home tab Icon
        home: {
            screen: createStackNavigator({
                Home: Home,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
                
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Icon name="home" size={DIMENS.iconSize} color={COLORS.colorActive}/> : <Icon name="home-outline" size={DIMENS.iconSize} color={COLORS.colorInit}/>
                    return icon;
                },
                tabBarLabel: "Home"
            },
            
        },
        category: {
            screen: createStackNavigator({
                Categories: Categories,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
                
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Icon name="apps-sharp" size={DIMENS.iconSize} color={COLORS.colorActive}/> : <Icon name="apps-outline" size={DIMENS.iconSize} color={COLORS.colorInit}/>
                    return icon;
                },
                tabBarLabel: "Categories"
            },
            
        },
        cart: {
            screen: createStackNavigator({
                Cart: Cart,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
                
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Icon name="cart" size={DIMENS.iconSize} color={COLORS.colorActive}/> : <Icon name="cart-outline" size={DIMENS.iconSize} color={COLORS.colorInit}/>
                    return icon;
                },
                tabBarLabel: "Cart"
            },
            
        },
        account: {
            screen: createStackNavigator({
                Account: Account,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
                
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Icon name="person" size={DIMENS.iconSize} color={COLORS.colorActive}/> : <Icon name="person-outline" size={DIMENS.iconSize} color={COLORS.colorInit}/>
                    return icon;
                },
                tabBarLabel: "Account"
            },
            
        },
    },{
        tabBarOptions:{
            activeTintColor: COLORS.colorActive,
            inactiveTintColor :COLORS.colorInit,
            activeBackgroundColor : COLORS.backgroundActive,
            labelStyle:{
                fontSize:DIMENS.fontsize,
                fontWeight:'600'
            },
            style: {
                padding:8,
                height: 65,
            },
            allowFontScaling: true
        }          
    }),
});
const AppNavigation = createAppContainer(switchNavigator);

export default function SwitchNavigation() {
    return (
        <AppNavigation />
    )
}
