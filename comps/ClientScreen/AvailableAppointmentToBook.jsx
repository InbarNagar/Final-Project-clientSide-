import React, { useContext,useEffect, useState } from "react";
import {
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { UserContext } from "../UserDietails";

const AvailableAppointmentToBook = (props) => {
  const { userDetails, setUserDetails } = useContext(UserContext);

    return(
    <Modal>

    </Modal>
    );
}

export default AvailableAppointmentToBook;