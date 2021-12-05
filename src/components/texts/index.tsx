/**
 * @format
 */
import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../../styles/colors'

const { width } = Dimensions.get('screen')

type CardTextProps = {
	text: string
}

export const CardIdText = ({ text }: CardTextProps) => <Text style={styles.cardIdText}>{text}</Text>

export const CardNameText = ({ text }: CardTextProps) => (
	<Text style={styles.cardNameText} numberOfLines={1}>
		{text}
	</Text>
)

export const CardDetailText = ({ text }: CardTextProps) => <Text style={styles.cardDetailText}>{text}</Text>

export const CardDateText = ({ text }: CardTextProps) => <Text style={styles.cardDateText}>{text}</Text>

export const HeaderTitleText = ({ text }: CardTextProps) => <Text style={styles.headerTitleText}>{text}</Text>

const styles = StyleSheet.create({
	headerTitleText: {
		fontSize: 40,
		fontWeight: '600',
		color: Colors.smokeyBlack,
	},
	cardNameText: {
		fontSize: 24,
		paddingTop: 24,
		color: Colors.smokeyBlack,
	},
	cardDetailText: {
		fontSize: 16,
		paddingTop: 8,
		color: Colors.smokeyBlack,
	},
	cardIdText: {
		color: Colors.smokeyBlack,
		padding: 8,
		fontSize: 14,
	},
	cardDateText: {
		fontSize: 12,
		width: width / 3.5,
	},
})
