import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js"
import { createContext, useContext, useEffect, useState } from "react";

const translations = {
    en: { welcome: "Welcome", changeLang: "Change language", changeTheme: "Change theme", idiom: "Idiom", theme: "Theme"},
    es: { welcome: "Bienvenido", login: "Ingresar",  changeLang: "Cambiar Tema", changeTheme: "Cambiar tema", idiom: "Idioma", theme: "Tema"},
    fr: { welcome: "Bienvenue", changeLang: "Changer de langue", changeTheme: "Changer de sujet", idiom: "Langue", theme: "Thème"},
    de: { welcome: "Wilkommen",  changeLang: "Sprache ändern", changeTheme: "Thema ändern", idiom: "Sprache", theme: "Thema"},
}

const i18n = new I18n(translations);
i18n.defaultLocale = "es";
i18n.enableFallback = true;

type Language = "en" | "es" | "fr" | "de";

interface LanguageContextProps {
    language: Language;
    changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
    return context;
}

export const LanguageProvider=({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>("es");
    useEffect(() => {

        const loadLanguage = async () => {
            const storedLanguage = await AsyncStorage.getItem("language");
            if (storedLanguage) {
                setLanguage(storedLanguage as Language);
                i18n.locale = storedLanguage;
            }else{
                setLanguage(storedLanguage as Language);
                i18n.locale = i18n.defaultLocale;                
            }
        };
        loadLanguage();

    }, []);

    const changeLanguage = async (lang: Language) => {
        setLanguage(lang);
        i18n.locale = lang;
        await AsyncStorage.setItem("language", lang);
    }

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    )

}
export { i18n };
