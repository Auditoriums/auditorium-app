import {StyleSheet} from "react-native";
import {Button, Dialog, Paragraph, Portal} from "react-native-paper";
import {InstrumentType, Mode} from "../models/models";
import React from "react";
import {modeVar} from "../api/client";

interface PropTypes {
  hideDialog: () => void;
  visible: boolean;
}

export default function ConfirmLineOut({hideDialog, visible}: PropTypes) {

  const handleOk = () => {
    modeVar(Mode.PRIMARY);
    hideDialog();
  }

  return <Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title>Увага!</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Ви дійсно бажаєте покинути чергу? Цю дію неможливо буде відмінити.</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Ні</Button>
        <Button onPress={handleOk}>Так</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
};

const styles = StyleSheet.create({

});