import React, { useState, useEffect } from "react";
import {
	View,
	SafeAreaView,
	TextInput,
	SectionList,
	Text,
	TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import CountrySelectionStyles from "@pages/onboarding/CountrySelectionStyles";
import {
	searchIcon,
	countrySelectionTick,
	countries,
} from "@components/onboarding/Constants";

const ItemView = ({ item, selected, action }) => {
	let text = `${item.name} (+${item.callingCode})`;
	let selectedIcon = null;

	if (selected != null && selected.callingCode === item.callingCode) {
		selectedIcon = (
			<Image
				source={countrySelectionTick}
				style={CountrySelectionStyles.selectionTick}
			/>
		);
	}

	return (
		<View style={CountrySelectionStyles.itemContainer}>
			<TouchableOpacity
				style={CountrySelectionStyles.itemTextContainer}
				onPress={() => action(item)}
			>
				<Image
					source={{ uri: item.flag }}
					style={CountrySelectionStyles.flag}
				/>
				<Text numberOfLines={1} style={CountrySelectionStyles.itemText}>
					{text}
				</Text>
				<View style={CountrySelectionStyles.selectionView}>
					{selectedIcon}
				</View>
			</TouchableOpacity>
			<View style={CountrySelectionStyles.itemSeparator} />
		</View>
	);
};

const SectionHeader = ({ title }) => (
	<View style={CountrySelectionStyles.sectionContainer}>
		<Text style={CountrySelectionStyles.sectionHeader}>{title}</Text>
	</View>
);

const CountrySelectionPage = ({ navigation }) => {
	const [sections, setSections] = useState([]);
	const [selected] = useState(null);

	useEffect(() => {
		generateSectionData(countries);
	}, []);

	const onChangeSearchText = (text) => {
		const filtered = countries.filter(
			(country) =>
				country.name.toLowerCase().indexOf(text.toLowerCase()) > -1,
		);
		generateSectionData(filtered);
	};

	const generateSectionData = (countryList) => {
		const sections = [];
		const sectionHeaders = countryList.map((data) => data.name.charAt(0));
		const uniqueHeaders = Array.from(new Set(sectionHeaders));

		uniqueHeaders.forEach((item) => {
			const filtered = countryList.filter(
				(country) => country.name.charAt(0) === item,
			);
			sections.push({ title: item, data: filtered });
		});
		setSections(sections);
	};

	const handleCountrySelect = (item) => {
		navigation.navigate("Profile", {
			selectedCountry: item.name,
			selectedCountryCode: item.code,
		});
	};

	return (
		<SafeAreaView style={CountrySelectionStyles.container}>
			<View style={CountrySelectionStyles.searchContainer}>
				<View style={CountrySelectionStyles.searchView}>
					<Image
						source={searchIcon}
						style={CountrySelectionStyles.searchIcon}
					/>
					<TextInput
						style={CountrySelectionStyles.textInput}
						placeholder="Search"
						placeholderTextColor="#2d2926"
						enablesReturnKeyAutomatically
						clearButtonMode="while-editing"
						onChangeText={(text) => onChangeSearchText(text)}
					/>
				</View>
			</View>
			<SectionList
				renderItem={({ item, index, section }) => (
					<ItemView
						item={item}
						index={index}
						section={section}
						action={handleCountrySelect}
						selected={selected}
					/>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<SectionHeader title={title} />
				)}
				sections={sections}
				keyExtractor={(item, index) => item.name + index}
			/>
		</SafeAreaView>
	);
};

export default CountrySelectionPage;
