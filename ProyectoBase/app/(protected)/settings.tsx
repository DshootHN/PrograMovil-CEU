import { View, Text, Button, TouchableOpacity, Modal, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { i18n, useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useState } from "react";

export default function SettingsScreen() {
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage} = useLanguage();
    const [modalVisible, setModalVisible] = useState(false);

    const styles = theme === "dark" ? darkTheme : lightTheme;
 
    type Language = "en" | "es" | "fr" | "de"

    const languages = [

        { code: "es", name: "Español" },
        { code: "en", name: "Inglés" },
        { code: "fr", name: "Francés" },
        { code: "de", name: "Alemán" }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {i18n.t("theme")}: {theme}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={toggleTheme}>
                <Text
                    style={styles.buttonText}
                >{i18n.t("changeTheme")}</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
                {i18n.t("idiom")}: {language}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}>
                <Text
                    style={styles.buttonText}
                >{i18n.t("changeLang")}</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <FlatList
                            data={languages}
                            keyExtractor={item => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{ padding: 10, borderBottomWidth: 1 }}
                                    onPress={() => {
                                        changeLanguage(item.code as Language);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text >{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10, padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}