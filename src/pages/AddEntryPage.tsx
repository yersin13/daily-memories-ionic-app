import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from '../firebase';
const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
 const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
 const response = await fetch(blobUrl);
 const blob = await response.blob();
 const snapshot = await pictureRef.put(blob);
 const url = await snapshot.ref.getDownloadURL();
console.log(url);
return url;
}




const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>();
  const [buttomStatus, setButtomStatus] = useState(false);
 
  //this code is to clean memory link created by selected images before upload
  useEffect(() => ()=> {
    if (pictureUrl.startsWith('blob:')){
      URL.revokeObjectURL(pictureUrl);
      // console.log('revoke Url:', pictureUrl);
    }
  },[pictureUrl]);

  const handleFileChange =(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0){
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      // console.log('create Url:', pictureUrl);
      setPictureUrl(pictureUrl);
    }
  }

const handlePictureClick = async () =>{
  if(isPlatform('capacitor')){
    try{
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        width:600,
      })
      setPictureUrl(photo.webPath);
    } catch (error){
      console.log('camera error', error);
    }
  } else{
  fileInputRef.current.click();
  }

};


  const handleSave = async () => {
    const entriesRef = firestore.collection('users').doc(userId)
    .collection('entries');
    const entryData ={ date, title, pictureUrl, description};
    if(!pictureUrl.startsWith('/assets')){
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }

    const entryRef = await entriesRef.add(entryData);
    console.log('saved', entryRef.id);
    setButtomStatus(true);
    history.goBack();
    // console.log('should save', {title, description});
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList>
      <IonItem>
            <IonLabel position="stacked">Day</IonLabel>
            <IonDatetime
            value={date}
            onIonChange={(event) => setDate(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
            value={title}
            onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel><br/>
            <input type="file" accept="image/*" hidden ref={fileInputRef}
            onChange={handleFileChange}
            />
            <img src={pictureUrl} alt="" style={{ cursor:'pointer' }}
            onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea
            value={description}
            onIonChange={(event) => setDescription(event.detail.value)} 
            />
          </IonItem>
          <IonButton expand="block" disabled={buttomStatus} onClick={handleSave}>Save</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
