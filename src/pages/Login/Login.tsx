import { IonContent, IonPage, IonText } from "@ionic/react";
import TelegramLoginButton from 'react-telegram-login';

import Footer from "../../components/Footer/Footer";
import constants from "../../constants/constants";
import { useAuth } from "../../contexts/Auth";

import './Login.css';

const LoginPage: React.FC = () => {
    const { signIn } = useAuth();

    const handleTelegramResponse = (response: any) => {
        console.log(response);
        signIn(response);
    };

    return (
        <IonPage>
            <IonContent fullscreen className="content">
                <IonText>
                    <h1>Welcome on Infinite Cloud!</h1>
                </IonText>
                <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={constants.botUsername} />
            </IonContent>
            <Footer />
        </IonPage>
    );
};
export default LoginPage;