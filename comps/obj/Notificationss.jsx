import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';

const Notificationss = ({title, body}) => {
  const sendPushNotification = async (title, body) => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
  
    // Create and schedule the notification
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body
      },
      trigger: null,
    });
  }

  return (
    <TouchableOpacity onPress={() => sendPushNotification(title, body)}>
      <Text>Send Notification</Text>
    </TouchableOpacity>
  );
}

export default Notificationss;
