import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Currencies, Markets } from '../screens'

const Stack = createStackNavigator()

export const AppRoute = { CURRENCIES: 'Currencies', MARKETS: 'Markets' }

const stackScreens = [
	{ name: AppRoute.CURRENCIES, component: Currencies },
	{ name: AppRoute.MARKETS, component: Markets },
]

export const AppNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				// require to stop screen flickering when navigating back when enableScreen() is true
				// detachPreviousScreen: false,
				cardOverlayEnabled: true,
				gestureEnabled: true,
				headerShown: false,
				headerMode: 'screen',
				presentation: 'modal',
				// cardStyle: { backgroundColor: Colors.blackThree },
			}}
		>
			{stackScreens.map(screen => (
				<Stack.Screen
					key={screen.name}
					name={screen.name}
					component={screen.component}
					// options={({ navigation }) => modalNavBar(navigation, false)}
				/>
			))}
		</Stack.Navigator>
	)
}
