import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Landing from '../screens/Landing';
import Home from './../screens/Home';
import Cart from '../screens/Cart';
import Shop from '../screens/Shop';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from './../screens/Account';
import Categories from '../screens/Categories';
import COLORS from '../consts/Colors';
import ProductDetail from './../screens/ProductDetail';
import Search from './../screens/Search';
import Profile from './../screens/User/Profile';
import Checkout from './../screens/Checkout';
import CheckoutSuccess from './../screens/CheckoutSuccess';
import Ordered from './../screens/User/Ordered';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import EmailOTPscreen from '../screens/Auth/EmailOTPscreen';
import OTPscreen from '../screens/Auth/OTPscreen';
import ChangePassword from '../screens/Auth/ChangePassword';
import OderDetail from '../screens/User/OderDetail';
import Complaint from '../screens/Complaint';
import EditProfile from '../screens/User/EditProfile';
import Chat from '../screens/Chat/Chat';
import ListChat from '../screens/Chat/ListChat';
import RatingScreen from '../screens/RatingScreen';

const DIMENS = {
    iconSize: 30,
    fontNameCategory: 15
}

const switchNavigator = createSwitchNavigator({
    landingStack: {
        screen: createStackNavigator({
            Landing: Landing,
        }, {
            defaultNavigationOptions: {
                headerShown: false
            }
        }),

    },

    loginStack: {
        screen: createStackNavigator({
            Login,
            OTPscreen,
            EmailOTPscreen,
            ChangePassword,
            Register,
        }, {
            defaultNavigationOptions: {
                headerShown: false
            }
        })
    },


    shopStack: {
        screen: createStackNavigator({
            Shop,
        }, {
            defaultNavigationOptions: {
                headerShown: false
            }
        })
    },

    homeStack: createBottomTabNavigator({
        // Home tab Icon
        home: {
            screen: createStackNavigator({
                Home,
                ProductDetail,
                Search,
                Shop,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },

            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Ionicons name="home" size={DIMENS.iconSize} color={COLORS.primary} /> : <Ionicons name="home-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit} />
                    return icon;
                },
                tabBarLabel: "Trang ch???"
            },

        },
        category: {
            screen: createStackNavigator({
                Categories,
                Search,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Ionicons name="ios-grid-sharp" size={DIMENS.iconSize} color={COLORS.primary} /> : <Ionicons name="ios-grid-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit} />
                    return icon;
                },
                tabBarLabel: "Danh m???c"
            },

        },
        cart: {
            screen: createStackNavigator({
                Cart,
                Checkout,
                CheckoutSuccess,
                Ordered
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },

            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Ionicons name="cart" size={DIMENS.iconSize} color={COLORS.primary} /> : <Ionicons name="cart-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit} />
                    return icon;
                },
                tabBarLabel: "Gi??? h??ng"
            },

        },
        account: {
            screen: createStackNavigator({
                Account,
                Profile,
                Checkout,
                Ordered,
                OderDetail,
                EditProfile,
                EmailOTPscreen,
                ChangePassword,
                OTPscreen,
                Chat,
                ListChat,
                RatingScreen,
                Complaint,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },

            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Ionicons name="person" size={DIMENS.iconSize} color={COLORS.primary} /> : <Ionicons name="person-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit} />
                    return icon;
                },
                tabBarLabel: "T??i kho???n"
            },

        },
    }, {
        tabBarOptions: {
            activeTintColor: COLORS.primary,
            inactiveTintColor: COLORS.colorFontInit,
            labelStyle: {
                fontSize: DIMENS.fontNameCategory,
                fontWeight: '600'
            },
            style: {
                padding: 8,
                height: 60,
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
