import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { lightsService } from '../services/lightsService';

interface AddLightModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  houseId: number;
  roomName: string;
}

export default function AddLightModal({ visible, onClose, onSuccess, houseId, roomName }: AddLightModalProps) {
  const [name, setName] = useState('');
  const [brightness, setBrightness] = useState('100');
  const [color, setColor] = useState('#FFFFFF');
  const [power, setPower] = useState('0');
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Insira o nome da luz');
      return;
    }

    const brightnessValue = Math.max(0, Math.min(100, Number(brightness) || 0));
    const powerValue = Math.max(0, Number(power) || 0);
    const colorValue = color.trim() || '#FFFFFF';
    if (!/^#([0-9a-fA-F]{6})$/.test(colorValue)) {
      Alert.alert('Erro', 'Cor inválida. Use formato HEX (ex: #FFFFFF)');
      return;
    }

    setLoading(true);
    try {
      await lightsService.createLight({
        house_id: houseId,
        room_name: roomName,
        name: name.trim(),
        is_on: isOn,
        brightness: brightnessValue,
        color: colorValue,
        power_consumption_watts: powerValue,
      });

      setName('');
      setBrightness('100');
      setColor('#FFFFFF');
      setPower('0');
      setIsOn(false);
      onSuccess();
      onClose();
      Alert.alert('Sucesso', 'Luz criada com sucesso');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao criar luz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />

        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Light</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Ceiling Light"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={name}
            onChangeText={setName}
            autoFocus={true}
          />

          <Text style={styles.label}>Brightness (0-100)</Text>
          <TextInput
            style={styles.input}
            placeholder="100"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={brightness}
            onChangeText={setBrightness}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Color (HEX)</Text>
          <TextInput
            style={styles.input}
            placeholder="#FFFFFF"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={color}
            onChangeText={setColor}
          />

          <Text style={styles.label}>Power (Watts)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={power}
            onChangeText={setPower}
            keyboardType="numeric"
          />

          <View style={styles.switchRow}>
            <Text style={styles.label}>Ligada</Text>
            <Switch value={isOn} onValueChange={setIsOn} />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              style={[styles.button, styles.saveButton]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={[styles.buttonText, { color: '#000' }]}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#2A4D35',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Comfortaa-Bold',
  },
  label: {
    color: '#AAC1B0',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
