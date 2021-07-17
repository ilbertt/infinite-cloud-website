import { IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonPage, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import TelegramLoginButton from 'react-telegram-login';

import Footer from "../../components/Footer/Footer";
import constants from "../../constants/constants";
import { useAuth } from "../../contexts/Auth";

import './Login.css';

const LoginPage: React.FC = () => {
    const { signIn } = useAuth();
    const [started, setStarted] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleTelegramResponse = (response: any) => {
        signIn(response);
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="content">
                    <IonText color="medium">
                        <h1 className="title">Welcome on {constants.appName}!</h1>
                    </IonText>
                    <IonGrid style={{ padding: 0 }}>
                        <IonRow>
                            <IonCol
                                sizeXs="12"
                                sizeSm="2"
                                sizeMd="3"
                                sizeLg="4"
                                sizeXl="4"
                            ></IonCol>
                            <IonCol
                                sizeXs="12"
                                sizeSm="8"
                                sizeMd="6"
                                sizeLg="4"
                                sizeXl="4"
                            >
                                <IonList>
                                    <IonItem onClick={() => setStarted(true)}>
                                        <IonLabel>
                                            <IonText>
                                                <h2>Start a chat with the bot</h2>
                                            </IonText>
                                            <p>Start a chat with <a className="bot-link" href={`https://t.me/${constants.botUsername}`} target="_blank" rel="noopener noreferrer">@{constants.botUsername}</a></p>
                                        </IonLabel>
                                    </IonItem>
                                    {started && <IonItem>
                                        <IonCheckbox
                                            slot="start"
                                            checked={checked}
                                            onIonChange={e => setChecked(e.detail.checked)}
                                        />
                                        <IonLabel>
                                            <IonText color="medium">
                                                <h3>I've started the chat</h3>
                                            </IonText>
                                        </IonLabel>
                                    </IonItem>}
                                </IonList>
                                {checked && <div className="tg-login-container">
                                    <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={constants.botUsername} />
                                </div>}
                            </IonCol>
                            <IonCol
                                sizeXs="12"
                                sizeSm="2"
                                sizeMd="3"
                                sizeLg="4"
                                sizeXl="4"
                            ></IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
            <Footer />
        </IonPage>
    );
};
export default LoginPage;