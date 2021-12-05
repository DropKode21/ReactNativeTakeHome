/**
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
enableScreens()

import { AppNavigator } from './navigation/appNavigator'

function App() {
	return (
		<NavigationContainer>
			<StatusBar hidden />
			<AppNavigator />
		</NavigationContainer>
	)
}

export default App

// const Stack = createStackNavigator()

// export const AppRoute = { CURRENCIES: 'Currencies', MARKETS: 'Markets' }

// const stackScreens = [
// 	{ name: AppRoute.CURRENCIES, component: Currencies },
// 	{ name: AppRoute.MARKETS, component: Markets },
// ]

// export const AppNavigator = () => {
// 	return (
// 		<Stack.Navigator
// 			screenOptions={{
// 				// require to stop screen flickering when navigating back when enableScreen() is true
// 				// detachPreviousScreen: false,
// 				cardOverlayEnabled: true,
// 				gestureEnabled: true,
// 				headerShown: false,
// 				headerMode: 'screen',
// 				presentation: 'modal',
// 				// cardStyle: { backgroundColor: Colors.blackThree },
// 			}}
// 		>
// 			{stackScreens.map(screen => (
// 				<Stack.Screen
// 					key={screen.name}
// 					name={screen.name}
// 					component={screen.component}
// 					// options={({ navigation }) => modalNavBar(navigation, false)}
// 				/>
// 			))}
// 		</Stack.Navigator>
// 	)
// }

// const { width } = Dimensions.get('screen')
// const Currencies = () => {
// 	const initialPageSize = 30
// 	const additionalPageSize = 20
// 	const API_URL = 'https://www.cryptingup.com/api/'
// 	const GET_INITIAL_ASSETS_URL = `${API_URL}assets?size=${initialPageSize}`
// 	const GET_ADDITIONAL_ASSETS_URL = `${API_URL}assets?size=${additionalPageSize}&start=`
// 	const isDarkMode = useColorScheme() === 'dark'
// 	const pageSize = useRef(additionalPageSize)
// 	const [currencies, setCurrencies] = useState([])
// 	const [details, showDetails] = useState<any>({})

// 	// const backgroundStyle = {
// 	// 	backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// 	// }

// 	useEffect(() => {
// 		const getCurrencies = async () => {
// 			const resp = await fetch(GET_INITIAL_ASSETS_URL)
// 			console.log({ resp })
// 			if (resp.ok) {
// 				const { assets } = await resp.json()
// 				setCurrencies(assets)
// 			} else {
// 				// handle error
// 			}
// 		}
// 		getCurrencies()
// 	}, [])

// 	const getMoreAssetsFunc = async () => {
// 		const resp = await fetch(`${GET_ADDITIONAL_ASSETS_URL}${pageSize.current}`)
// 		if (resp.ok) {
// 			const { assets, next } = await resp.json()
// 			pageSize.current = next
// 			const newAdditions = currencies.concat(assets)
// 			setCurrencies(newAdditions)
// 		} else {
// 			// handle error
// 		}
// 	}

// 	const renderCurrencies = useCallback(({ item, index }) => {
// 		const { asset_id, change_1h, change_24h, change_7d, name, price, updated_at, volume_24h } = item || {}
// 		const positiveChange = change_24h >= 0
// 		// const iconName = positiveChange ? 'trending-up' : 'trending-down'
// 		// const iconColor = positiveChange ? 'green' : 'red'
// 		return (
// 			<View style={styles.itemContainer}>
// 				<Text style={styles.cardIdText}>
// 					{asset_id}
// 				</Text>
// 				<View style={styles.center}>
// 					{details[index] ? (
// 						<ScrollView style={styles.detailsContainer}>
// 							<View style={styles.detailWrapper}>
// 								<Text style={styles.cardDetailText}>
// 									Price:
// 								</Text>
// 								<Text style={styles.cardDetailText}>
// 								{`$${price.toFixed(2).toString()}`}
// 								</Text>
// 							</View>
// 							<View style={styles.detailWrapper}>
// 								<Text style={styles.cardDetailText}>
// 									1h:
// 								</Text>
// 								<Text style={styles.cardDetailText}>
// 									{`${change_1h.toFixed(2).toString()}%`}
// 								</Text>
// 							</View>
// 							<View style={styles.detailWrapper}>
// 								<Text style={styles.cardDetailText}>
// 									24h:
// 								</Text>
// 								<Text style={styles.cardDetailText}>
// 									{`${change_24h.toFixed(2).toString()}%`}
// 								</Text>
// 							</View>
// 							<View style={styles.detailWrapper}>
// 								<Text style={styles.cardDetailText}>
// 									7d:
// 								</Text>
// 								<Text style={styles.cardDetailText}>
// 									{`${change_7d.toFixed(2).toString()}%`}
// 								</Text>
// 							</View>
// 							<View style={styles.detailWrapper}>
// 								<Text style={styles.cardDetailText}>
// 									24 Vol:
// 								</Text>
// 								<Text style={styles.cardDetailText}>
// 									{`${volume_24h.toFixed().toString()}`}
// 								</Text>
// 							</View>
// 							<View style={styles.detailWrapper}>
// 								<View style={styles.center}><UpdateIcon /></View>
// 								<Text style={styles.cardDateText}>
// 									{`${new Date(updated_at)}`}
// 								</Text>
// 							</View>
// 						</ScrollView>
// 					) : (
// 						<>
// 							<TrendingIcon positiveChange={positiveChange} />
// 							<Text style={styles.cardNameText} numberOfLines={1}>
// 								{name || asset_id}
// 							</Text>
// 							<Text style={styles.cardDetailText}>
// 								{`$${price.toFixed(2).toString()}`}
// 							</Text>
// 						</>
// 					)}
// 				</View>
// 				<Pressable style={styles.detailButton} onPress={() => {
// 						LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
// 						showDetails((prevDetails: { [x: string]: any }) => ({ ...prevDetails, [index]: !prevDetails[index] }))
// 					}}
// 				>
// 					<InfoIcon />
// 				</Pressable>
// 			</View>
// 		)
// 	}, [details])

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.headerTitle}>
// 				<Text style={styles.headerTitleText}>
// 					Cryptocurrencies
// 				</Text>
// 			</View>
// 			<FlatList
// 				style={styles.flatList}
// 				numColumns={2}
// 				data={currencies}
// 				renderItem={renderCurrencies}
// 				onEndReached={getMoreAssetsFunc}
// 				ListEmptyComponent={EmptyListPlaceholder()}
// 				keyExtractor={(item: { asset_id: string }, index: number) => `${item.asset_id}_${index}`}
// 				contentContainerStyle={{ flex: currencies.length < 1 ? 1 : 0, alignItems: 'center' }}
// 				ItemSeparatorComponent={() => <View style={styles.separator} />}
// 			/>
// 		</SafeAreaView>
// 	)
// }

// const EmptyListPlaceholder = () => {
// 	return (
// 		<View style={styles.emptyFlatList}>
// 			<ActivityIndicator size='large' color={Colors.orange} />
// 		</View>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: Colors.steelTeal,
// 	},
// 	center: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	headerTitle:{
// 		marginVertical: 20,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	headerTitleText: {
// 		fontSize: 40,
// 		fontWeight: '600',
// 		color: Colors.smokeyBlack,
// 	},
// 	emptyFlatList: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	flatList: {
// 		paddingTop: 4,
// 		borderTopWidth: 2,
// 		borderColor: Colors.orange,
// 	},
// 	separator: {
// 		backgroundColor: Colors.orange,
// 		height: 2,
// 	},
// 	itemContainer: {
// 		backgroundColor: Colors.lightGray,
// 		borderRadius: 8,
// 		height: 200,
// 		width: width / 2.25,
// 		margin: 8,
// 	},
// 	cardNameText: {
// 		fontSize: 24,
// 		paddingTop: 24,
// 		color: Colors.smokeyBlack,
// 	},
// 	cardDetailText: {
// 		fontSize: 16,
// 		paddingTop: 8,
// 		color: Colors.smokeyBlack,
// 	},
// 	cardIdText: {
// 		color: Colors.smokeyBlack,
// 		padding: 8,
// 		fontSize: 14
// 	},
// 	cardDateText: {
// 		fontSize: 12,
// 		width: width / 3.5,
// 	},
// 	detailsContainer: {
// 		height: 120,
// 		width: width / 2.5,
// 	},
// 	detailWrapper: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 	},
// 	detailButton: {
// 		padding: 12,
// 		alignItems: 'flex-end',
// 	},
// })

// function App() {
// 	return (
// 		<NavigationContainer>
// 			<StatusBar hidden />
// 			<AppNavigator />
// 		</NavigationContainer>
// 	)
// }

// export default App
