import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface UserCard {
  nombre: string;
  apellido: string;
  correo: string;
  fecha: string;
}

const UserItem: React.FC<UserCard> = ({ nombre, apellido, correo, fecha }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.textTitle}>{nombre}" "{apellido}</Text>
      <Text style={styles.text}>Correo Electronico: {correo}</Text>
      <Text style={styles.text}>Fecha de Nacimiento: {fecha}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "Calibri",
    textAlign: "center",
    fontWeight: "bold"
  },
});

export default UserItem;
