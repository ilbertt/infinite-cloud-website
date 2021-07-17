import { IonFooter, IonIcon, IonText, IonToolbar } from '@ionic/react';
import { chatbubbleEllipses, logoGithub } from 'ionicons/icons';

import constants from '../../constants/constants';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <IonFooter>
            <IonToolbar className="footer-toolbar">
                <div className="footer-element">
                    <a className="footer-link" href={constants.websiteRepoUrl} target="_blank" rel="noopener noreferrer" >
                        <IonIcon className="footer-icon" icon={logoGithub} />
                        <IonText color="medium">Website</IonText>
                    </a>
                </div>
                <div className="footer-element footer-divider">
                    <IonText color="medium">-</IonText>
                </div>
                <div className="footer-element">
                    <a className="footer-link" href={constants.websiteRepoUrl} target="_blank" rel="noopener noreferrer" >
                        <IonIcon className="footer-icon" icon={logoGithub} />
                        <IonText color="medium">Bot</IonText>
                    </a>
                </div>
                <div className="footer-element footer-divider">
                    <IonText color="medium">-</IonText>
                </div>
                <div className="footer-element">
                    <a className="footer-link" href={`https://t.me/${constants.botUsername}`} target="_blank" rel="noopener noreferrer" >
                        <IonIcon className="footer-icon" icon={chatbubbleEllipses} />
                        <IonText color="medium">Bot chat</IonText>
                    </a>
                </div>
            </IonToolbar>
        </IonFooter>
    );
};

export default Footer;