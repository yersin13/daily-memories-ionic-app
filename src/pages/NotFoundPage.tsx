import {
  IonContent,
  IonHeader,
  IonPage,
} from '@ionic/react';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent className="ion-padding">
Page not found.
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
