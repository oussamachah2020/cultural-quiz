import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

const Scanner: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<any>(null);
  const [showInvalid, setShowInvalid] = useState(false);


  const scanQRCode = async () => {
    try {
      const result = await BarcodeScanner.startScan();
      console.log(result);

      const docRef = doc(db, "trips", result.content || 'error');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setQrCodeData(docSnap.data());
        setShowInvalid(false);
      } else {
        console.log("No such document!");
        setQrCodeData(null);
        setShowInvalid(true);
      }
    } catch (error) {
      console.error(error);
      setQrCodeData(null);
      setShowInvalid(true);

    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <p>
            Click the button to scan a QR code:
          </p>
          <IonButton onClick={scanQRCode}>Scan QR Code</IonButton>
          {qrCodeData && (
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>{qrCodeData.fullName}</IonCardSubtitle>
                <IonCardTitle>{qrCodeData.hotelName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{qrCodeData.description}</p>
                <p>{qrCodeData.city}</p>
                <p>{new Date(qrCodeData.date).toUTCString()}</p>
                <p>{qrCodeData.email}</p>
              </IonCardContent>
            </IonCard>
          )}
          {showInvalid && (
            <p style={{ color: 'red' }}>Invalid QR code</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
