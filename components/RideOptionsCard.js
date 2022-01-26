import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/core';

import { selectTravelTimeInformation } from '../slices/navSlice';

import tw from 'twrnc';

const data = [
  {
    id: "Uber-X",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// Rate is dependent on traffic in the area
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInformation?.distance?.text}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3.5 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="font-awesome" size={16} />
        </TouchableOpacity>
        <View style={tw`border-t border-gray-200 flex-shrink`}></View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 h-24 ${id === selected?.id && "bg-gray-200"}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                marginTop: -20,
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP'
              }).format(
                (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`-mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-3 m-2 ${!selected && "bg-gray-300"}`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
          <Text style={tw`text-center text-white text-xs`}>Your travel time is estimated to be {travelTimeInformation?.duration?.text}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
