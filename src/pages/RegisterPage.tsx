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
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import {useAuth} from '../auth';
import {auth} from '../firebase';



const RegisterPage: React.FC = () => {
  const {loggedIn} = useAuth();

  const[email,setEmail] =useState('');
  const[password, setPassword] = useState('');
  const [status,setStatus] =useState({loading:false,error:false});
  const [errorType ,setErrorType] =useState('');
  

  const handleRegister = async ()=> {
    try{
      setStatus({loading:true,error:false});
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('credential:', credential);
    } catch(error){
      setStatus({loading:false,error:true});
      setErrorType(error.message)
      console.log('error', error.message);
    }
  };

  if (loggedIn){
return <Redirect to="/my/entries" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
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
        <IonToast color="danger" isOpen={true} message={errorType} />
        }
    <IonButton expand='block' onClick={handleRegister}>
      Create Account
      </IonButton>
      <IonButton expand='block' fill="clear" routerLink="/login">
      Already have an account?
      </IonButton>
    <IonLoading isOpen={status.loading}/>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
