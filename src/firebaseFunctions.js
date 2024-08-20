import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';


const convertFirestoreDates = (data) => {
  if (data.startDate instanceof Timestamp && data.endDate instanceof Timestamp) {
    return {
      ...data,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
    };
  }
  return data;
};


export const getAppointments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'appointments'));
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertFirestoreDates(doc.data())
    }));
    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};


export const addAppointment = async (appointment) => {
  try {
    const { startDate, endDate, ...rest } = appointment;
    await addDoc(collection(db, 'appointments'), {
      ...rest,
      startDate: Timestamp.fromDate(startDate),
      endDate: Timestamp.fromDate(endDate)
    });
  } catch (error) {
    console.error('Error adding appointment:', error);
  }
};


export const editAppointment = async (id, updatedAppointment) => {
  try {
    const { startDate, endDate, ...rest } = updatedAppointment;
    const appointmentRef = doc(db, 'appointments', id);
    await updateDoc(appointmentRef, {
      ...rest,
      startDate: Timestamp.fromDate(startDate),
      endDate: Timestamp.fromDate(endDate),
    });
  } catch (error) {
    console.error('Error editing appointment:', error);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const appointmentRef = doc(db, 'appointments', id);
    await deleteDoc(appointmentRef);
  } catch (error) {
    console.error('Error deleting appointment:', error);
  }
};
