/**
 * @format
 */
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Colors from '../../styles/colors'

interface TrendingIconProps {
	positiveChange: boolean
}

export const TrendingIcon = ({ positiveChange }: TrendingIconProps) => (
	<FeatherIcon
		name={positiveChange ? 'trending-up' : 'trending-down'}
		size={40}
		color={positiveChange ? 'green' : 'red'}
	/>
)

export const InfoIcon = () => <EntypoIcon name={'info-with-circle'} size={20} color={Colors.smokeyBlack} />

export const UpdateIcon = () => (
	<MaterialCommunityIcons name={'update'} size={24} color={Colors.smokeyBlack} />
)
