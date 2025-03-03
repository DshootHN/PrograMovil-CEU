import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useUsers } from "@/contexts/UserContext";
import { v4 as uuidv4} from "uuid";

export default function AddUser() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const { addUser } = useUsers();
  
  const handleAddUser = () => {
    if (!nombre.trim() || !apellido.trim() || !correo.trim() || !password.trim() || !fecha.trim()) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    const nuevaUser = {
      id: uuidv4(),
      nombre,
      apellido,
      password,
      correo,
      fecha,
    };

    addUser(nuevaUser);
    setNombre("");
    setApellido("");
    setPassword("");
    setFecha("");
    setFecha("");
    Alert.alert("Éxito", "User agregada correctamente");
  };
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Ionicons style={styles.headerIcon} name="push" size={32} color="#fff" />
            <Text style={styles.headerText}>Agregar User</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombres"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              value={apellido}
              onChangeText={setApellido}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electronico"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              keyboardType="visible-password"
              onChangeText={setPassword}
            />
          <TouchableOpacity style={styles.button} onPress={handleAddUser}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFF",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    header: {
      width: "100%",
      backgroundColor: "#364FC7",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    headerIcon: {
      marginBottom: 10,
    },
    headerText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    input: {
      width: "100%",
      backgroundColor: "#fff",
      fontSize: 16,
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
      backgroundColor: "#FFD700",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: "#000",
      fontWeight: "bold",
    },
  });