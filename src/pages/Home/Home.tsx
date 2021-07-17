import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonPopover
} from '@ionic/react';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';

import FolderExplorer from '../../components/FolderExplorer/FolderExplorer';
import Footer from '../../components/Footer/Footer';
import constants from '../../constants/constants';
import { useAuth } from '../../contexts/Auth';
import { UserModel } from '../../models/auth.model';
import './Home.css';

const AvatarPopoverList: React.FC<{ onHide: () => void; user: UserModel }> = ({ onHide, user }) => {
    const displayName = user.username ? user.username : user.first_name+' '+(user.last_name ? user.last_name : '');
    return (
        <IonList>
            <IonListHeader>{displayName}</IonListHeader>
            <IonItem button detail={false} onClick={onHide}>Logout</IonItem>
        </IonList>
    )
};

const HomePage: React.FC = () => {
    const { user, signOut } = useAuth();
    const [present, dismiss] = useIonPopover(AvatarPopoverList, {
        onHide: () => {
            dismiss();
            signOut();
        },
        user,
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{constants.appName}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href={`https://t.me/${constants.botUsername}`} target="_blank">
                            <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline} />
                        </IonButton>
                        <IonAvatar className="user-avatar" onClick={(e) => {
                            present({ event: e.nativeEvent });
                        }}>
                            <img
                                alt="user"
                                src={user.photo_url}
                            />
                        </IonAvatar>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <FolderExplorer user={user} />
            </IonContent>

            <Footer />
        </IonPage>
    );
};

export default HomePage;
