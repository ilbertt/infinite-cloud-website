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
import { useEffect } from 'react';

import FolderExplorer from '../../components/FolderExplorer/FolderExplorer';
import Footer from '../../components/Footer/Footer';
import constants from '../../constants/constants';
import { useAuth } from '../../contexts/Auth';
import { UserModel } from '../../models/auth.model';
import './Home.css';

const AvatarPopoverList: React.FC<{ onHide: () => void; user: UserModel }> = ({ onHide, user }) => {
    const displayName = user?.username ? user.username : user?.first_name+' '+user?.last_name
    return (
        <IonList>
            <IonListHeader>{displayName}</IonListHeader>
            <IonItem button detail={false} onClick={onHide}>Logout</IonItem>
        </IonList>
    )
};

const HomePage: React.FC = () => {
    const { user, signOut, signIn } = useAuth();
    const [present, dismiss] = useIonPopover(AvatarPopoverList, {
        onHide: () => {
            dismiss();
            signOut();
        },
        user,
    });

    // useEffect(() => {
    //     signIn({
    //         id: '397420856',
    //         first_name: 'Luca',
    //         last_name: '',
    //         username: 'ilbert_luca',
    //         photo_url: 'https://cdn4.telesco.pe/file/jGGrM-hqD0gzXMP6d8PJe7E1Qd9hei29gA5bKee7jWUqbmaHGVlFjcnTYGQ9-SxVUIBHoqUzsF9vZ4Xro_wKUlfW_AFdsPwLCvmrSgIdNEO8cu22Tk5pXV_3TNDJpy1s4Gnzt3X50FuotFeYE6No-Mml73Y2jubQZSnMtALEDwHV-50aK-rFdCqCMWfVOYzuOS0bPOhY1DJf7zGA_DeazX657GPpbPcbNg3lV-5Ze07CVVkcHtfP6nETmCidMeat_MIe2apfHnvzKztGbvA9TVZf3PVn7VCgz5YN03bPJ4s7otB58jP3rAfG0alcumIyBxeOJqWJYeUrwjDuNFfGbA.jpg',
    //         auth_date: '',
    //         hash: '',
    //     });
    // }, [signIn]);

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
