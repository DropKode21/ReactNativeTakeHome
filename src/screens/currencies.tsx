/**
 * @format
 */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ScrollView, StyleSheet, View, Dimensions, LayoutAnimation, Pressable } from 'react-native'

import { AppRoute } from '../navigation/appNavigator'
import {
	TrendingIcon,
	UpdateIcon,
	InfoIcon,
	CardIdText,
	CardNameText,
	CardDateText,
	CardDetailText,
	InfiniteScroll,
} from '../components'
import Colors from '../styles/colors'

const { width } = Dimensions.get('screen')

export const Currencies = ({ navigation }) => {
	const initialPageSize = 30
	const additionalPageSize = 20
	const API_URL = 'https://www.cryptingup.com/api/'
	const GET_INITIAL_ASSETS_URL = `${API_URL}assets?size=${initialPageSize}`
	const GET_ADDITIONAL_ASSETS_URL = `${API_URL}assets?size=${additionalPageSize}&start=`
	const pageSize = useRef(additionalPageSize)
	const [currencies, setCurrencies] = useState([])
	const [details, showDetails] = useState<any>({})
	const [errMsg, setErrMsg] = useState('')

	useEffect(() => {
		const getCurrencies = async () => {
			const resp = await fetch(GET_INITIAL_ASSETS_URL)
			console.log({ resp })
			if (resp.ok) {
				const { assets } = await resp.json()
				setCurrencies(assets)
			} else {
				setErrMsg('Currencies are unavailable')
			}
		}
		getCurrencies()
	}, [])

	const getMoreAssetsFunc = async () => {
		const resp = await fetch(`${GET_ADDITIONAL_ASSETS_URL}${pageSize.current}`)
		if (resp.ok) {
			const { assets, next } = await resp.json()
			pageSize.current = next
			const newAdditions = currencies.concat(assets)
			setCurrencies(newAdditions)
		} else {
			setErrMsg('Currencies are unavailable')
		}
	}

	const renderCurrencies = useCallback(
		({ item, index }) => {
			const { asset_id, change_1h, change_24h, change_7d, name, price, updated_at, volume_24h } =
				item || {}
			const positiveChange = change_24h >= 0
			return (
				<Pressable
					style={styles.itemContainer}
					onPress={() => navigation.navigate(AppRoute.MARKETS, { assetID: asset_id })}
				>
					<CardIdText text={asset_id} />
					<View style={styles.center}>
						{details[index] ? (
							<ScrollView style={styles.detailsContainer}>
								<View style={styles.detailWrapper}>
									<CardDetailText text={'Price:'} />
									<CardDetailText text={`$${price.toFixed(2).toString()}`} />
								</View>
								<View style={styles.detailWrapper}>
									<CardDetailText text={'1h:'} />
									<CardDetailText text={`${change_1h.toFixed(2).toString()}%`} />
								</View>
								<View style={styles.detailWrapper}>
									<CardDetailText text={'24h:'} />
									<CardDetailText text={`${change_24h.toFixed(2).toString()}%`} />
								</View>
								<View style={styles.detailWrapper}>
									<CardDetailText text={'7d:'} />
									<CardDetailText text={`${change_7d.toFixed(2).toString()}%`} />
								</View>
								<View style={styles.detailWrapper}>
									<CardDetailText text={'24 Vol:'} />
									<CardDetailText text={`${volume_24h.toFixed().toString()}`} />
								</View>
								<View style={styles.detailWrapper}>
									<View style={styles.center}>
										<UpdateIcon />
									</View>
									<CardDateText text={`${new Date(updated_at)}`} />
								</View>
							</ScrollView>
						) : (
							<>
								<TrendingIcon positiveChange={positiveChange} />
								<CardNameText text={name || asset_id} />
								<CardDetailText text={`$${price.toFixed(2).toString()}`} />
							</>
						)}
					</View>
					<Pressable
						style={styles.detailButton}
						onPress={() => {
							LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
							showDetails((prevDetails: { [x: string]: any }) => ({
								...prevDetails,
								[index]: !prevDetails[index],
							}))
						}}
					>
						<InfoIcon />
					</Pressable>
				</Pressable>
			)
		},
		[details],
	)

	return (
		<InfiniteScroll
			data={currencies}
			renderItem={renderCurrencies}
			onEndReach={getMoreAssetsFunc}
			numColumns={2}
			keyExtractor={(item: { asset_id: string }, index: number) => `${item.asset_id}_${index}`}
			itemSeparator={() => <View style={styles.separator} />}
			headerTitle={'Cryptocurrencies'}
			errMsg={errMsg}
		/>
	)
}

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	separator: {
		backgroundColor: Colors.orange,
		height: 2,
	},
	itemContainer: {
		backgroundColor: Colors.lightGray,
		borderRadius: 8,
		height: 200,
		width: width / 2.25,
		margin: 8,
	},
	detailsContainer: {
		height: 120,
		width: width / 2.5,
	},
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	detailButton: {
		padding: 12,
		alignItems: 'flex-end',
	},
})
