import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = SIZES.medium,
}) => {
  return (
    <View
      style={[
        styles.card,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: SIZES.small / 2,
  },
});

export default Card;
