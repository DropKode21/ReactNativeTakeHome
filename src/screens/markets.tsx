/**
 * @format
 */
import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { InfiniteScroll } from '../components'
import Colors from '../styles/colors'

export const Markets = ({ route }) => {
	const { assetID } = route.params
	const initialPageSize = 30
	const API_URL = 'https://www.cryptingup.com/api/'
	const GET_INITIAL_MARKETS_URL = `${API_URL}assets/${assetID}/markets?size=${initialPageSize}`
	const [markets, setMarkets] = useState([])
	const [errMsg, setErrMsg] = useState('')

	useEffect(() => {
		const getMarkets = async () => {
			const resp = await fetch(GET_INITIAL_MARKETS_URL)
			if (resp.ok) {
				const { markets } = await resp.json()
				setMarkets(markets)
			} else {
				setErrMsg('Markets are unavailable')
			}
		}
		getMarkets()
	}, [])

	const renderMarkets = useCallback(({ item, index }) => {
		const {
			asset_id,
			change_1h,
			change_24h,
			change_7d,
			name,
			price,
			updated_at,
			volume_24h,
			symbol,
			spread,
			quote_asset,
			base_asset,
		} = item || {}
		return (
			// TODO: build out renderItem Component to display market exchanges
			<View />
		)
	}, [])

	return (
		<InfiniteScroll
			data={markets}
			renderItem={renderMarkets}
			onEndReach={() => {}}
			numColumns={1}
			keyExtractor={(item: { asset_id: string }, index: number) => `${item.asset_id}_${index}`}
			itemSeparator={() => <View style={styles.separator} />}
			headerTitle={'Markets'}
			errMsg={errMsg}
		/>
	)
}

const styles = StyleSheet.create({
	separator: {
		backgroundColor: Colors.orange,
		height: 2,
	},
})
