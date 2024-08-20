import React, { useEffect, useState } from 'react';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import { addAppointment, editAppointment, deleteAppointment, getAppointments } from './firebaseFunctions';
import { Button, Typography } from '@mui/material';

const CustomAppointmentTooltip = ({ appointmentData, onDeleteButtonClick }) => {
  const handleDelete = () => {
    if (appointmentData && onDeleteButtonClick) {
      onDeleteButtonClick(appointmentData.id);
    }
  };

  if (!appointmentData) return null;

  return (
    <div>
      <Typography variant="h6">{appointmentData.title}</Typography>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

const SchedulerComponent = () => {
  const [currentViewName, setCurrentViewName] = useState('week');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fetchedAppointments = await getAppointments();
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      const newAppointment = {
        ...added,
        startDate: new Date(added.startDate),
        endDate: new Date(added.endDate),
      };
      try {
        await addAppointment(newAppointment);
        const updatedAppointments = await getAppointments();
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error adding appointment:', error);
      }
    }

    if (changed) {
      try {
        await Promise.all(
          Object.keys(changed).map(async (id) => {
            const changes = {
              ...changed[id],
              startDate: new Date(changed[id].startDate),
              endDate: new Date(changed[id].endDate),
            };
            await editAppointment(id, changes);
          })
        );
        const updatedAppointments = await getAppointments();
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error editing appointments:', error);
      }
    }

    if (deleted !== undefined) {
      try {
        await deleteAppointment(deleted);
        const updatedAppointments = await getAppointments();
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  return (
    <Scheduler data={appointments}>
      <ViewState
        currentViewName={currentViewName}
        onCurrentViewNameChange={setCurrentViewName}
      />
      <EditingState onCommitChanges={commitChanges} />
      <DayView />
      <WeekView />
      <MonthView />
      <Appointments />
      <Toolbar />
      <ViewSwitcher />
      <AppointmentTooltip
        showCloseButton
        showOpenButton
        showDeleteButton
        commandButtonComponent={CustomAppointmentTooltip}
      />
      <AppointmentForm />
    </Scheduler>
  );
};

export default SchedulerComponent;
