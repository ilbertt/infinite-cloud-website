import { IonApp, IonContent, IonPage, IonRouterOutlet, IonSpinner, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import 'react-keyed-file-browser/dist/react-keyed-file-browser.css';

/* Theme variables */
import './theme/variables.css';

import LoginPage from './pages/Login/Login';
import { useAuth } from './contexts/Auth';
import HomePage from './pages/Home/Home';
import constants from './constants/constants';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
    const { user, status } = useAuth();

    if (status === 'loading') {
        return (
            <IonApp>
                <IonPage>
                    <IonContent fullscreen>
                        <IonSpinner />
                    </IonContent>

                    <Footer />
                </IonPage>
            </IonApp>
        );
    }

    const homeRouter = (
        // <IonSplitPane contentId="main">
        //     <Menu />
        //     <IonRouterOutlet id="main">
        //         <Route path="/*" exact={true}>
        //             <Redirect to="/home" />
        //         </Route>
        //         <Route path="/home" exact={true}>
        //             <HomePage />
        //         </Route>
        //     </IonRouterOutlet>
        // </IonSplitPane>
        <>
            <Route path="/*" exact={true}>
                <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true}>
                <HomePage />
            </Route>
        </>
    );

    const loginRouter = (
        <>
            <Route path="/*">
                <Redirect to="/login" />
            </Route>
            <Route path="/login" exact={true} component={LoginPage} />
        </>
    );

    const showHome = (constants.isProduction && !!user) || !constants.isProduction;

    return (
        <IonApp>
            <IonReactRouter>
                {showHome ? homeRouter : loginRouter}
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
