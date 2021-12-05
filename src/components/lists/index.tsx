/**
 * @format
 */
import React from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	FlatList,
	FlatListProps,
	ActivityIndicator,
} from 'react-native'

import { HeaderTitleText } from '../texts'
import Colors from '../../styles/colors'

export const InfiniteScroll = ({
	data,
	renderItem,
	onEndReach,
	numColumns,
	keyExtractor,
	itemSeparator,
	headerTitle,
	errMsg,
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerTitle}>
				<HeaderTitleText text={headerTitle} />
			</View>
			<FlatList
				style={styles.flatList}
				numColumns={numColumns}
				data={data}
				renderItem={renderItem}
				onEndReached={onEndReach}
				ListEmptyComponent={EmptyListPlaceholder()}
				keyExtractor={keyExtractor}
				contentContainerStyle={{ flex: data.length < 1 ? 1 : 0, alignItems: 'center' }}
				ItemSeparatorComponent={itemSeparator}
				ListFooterComponent={() => <Footer errMsg={errMsg} />}
			/>
		</SafeAreaView>
	)
}

type FooterProps = {
	errMsg: string
}

const Footer = ({ errMsg }: FooterProps) => {
	if (!errMsg) return null
	return (
		<View style={styles.emptyFlatList}>
			<Text style={{ color: 'red', fontSize: 20 }}>{errMsg}</Text>
		</View>
	)
}

const EmptyListPlaceholder = () => {
	return (
		<View style={styles.emptyFlatList}>
			<ActivityIndicator size='large' color={Colors.orange} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.steelTeal,
	},
	headerTitle: {
		marginVertical: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyFlatList: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flatList: {
		paddingTop: 4,
		borderTopWidth: 2,
		borderColor: Colors.orange,
	},
})
