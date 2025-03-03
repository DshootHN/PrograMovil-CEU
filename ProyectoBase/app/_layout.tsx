import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UsersProvider } from '@/contexts/UserContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <UsersProvider>
                    <LanguageProvider>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                            }}
                        />
                    </LanguageProvider>
                </UsersProvider>
            </AuthProvider>
        </ThemeProvider>

    );
}

