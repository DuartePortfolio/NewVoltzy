import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Alert
} from 'react-native';

interface AddRoomModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  houseId: number;
}

export default function AddRoomModal({ visible, onClose, onSuccess, houseId }: AddRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    setLoading(true);
    try {
      // Simulação da chamada API (Substitui pela tua chamada real)
      console.log(`Saving room: ${roomName} for house ${houseId}`);
      
      // await api.post('/rooms', { name: roomName, houseId }); <--- A TUA API AQUI
      
      // Simular delay
      setTimeout(() => {
        setLoading(false);
        setRoomName(''); // Limpar
        onSuccess();     // Recarregar lista
        onClose();       // Fechar
      }, 1000);

    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert('Error', 'Failed to create room');
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
        {/* Fundo escuro clicável para fechar */}
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Room</Text>
          
          <Text style={styles.label}>Room Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Living Room"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={roomName}
            onChangeText={setRoomName}
            autoFocus={true} // Ajuda no Web
          />

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
    backgroundColor: 'rgba(0,0,0,0.6)', // Fundo escuro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#2A4D35', // Cor do teu tema (Verde Escuro)
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: "#000",
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
    fontFamily: 'Comfortaa-Bold', // A tua fonte
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
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
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
    backgroundColor: '#4CAF50', // Verde destaque
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});