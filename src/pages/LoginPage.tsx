import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import {useAuth} from '../auth';
import {auth} from '../firebase';



const LoginPage: React.FC = () => {
  const {loggedIn} = useAuth();

  const[email,setEmail] =useState('');
  const[password, setPassword] = useState('');
  const [status,setStatus] =useState({loading:false,error:false});
  const [errorType ,setErrorType] =useState('opss!');
  
 


  const handleLogin = async ()=> {
    try{
      setStatus({loading:true,error:false});
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log('credential:', credential);
    } catch(error){
      setStatus({loading:false,error:true});
      setErrorType(error.message);
      console.log('error', error);
    }
  };

  if (loggedIn){
return <Redirect to="/my/entries" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" value={email}
            onIonChange={(event) => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password}
              onIonChange={(event) => setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error &&
        <IonToast duration={2000} color="danger" isOpen={true} message={errorType} />
        }
    <IonButton expand='block' onClick={handleLogin}>Login</IonButton>
    <IonButton expand='block' fill="clear" routerLink="/register">
      Don't have an account?
      </IonButton>
    <IonLoading isOpen={status.loading}/>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
