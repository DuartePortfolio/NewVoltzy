import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { housesService } from '../services/housesService';

interface AddRoomModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  houseId: number;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({ visible, onClose, onSuccess, houseId }) => {
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    // Validação
    if (!roomName.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome para o room');
      return;
    }

    try {
      setLoading(true);
      await housesService.createRoom(houseId, { name: roomName.trim() });
      
      // Limpar o campo e fechar o modal
      setRoomName('');
      onClose();
      onSuccess(); // Recarregar a lista de rooms
      
      Alert.alert('Sucesso', 'Room criado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao criar room:', error);
      Alert.alert('Erro', error.message || 'Falha ao criar room. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setRoomName('');
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Pressable 
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
        />
        <View 
          style={styles.modalContainer}
        >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Adicionar Room</Text>
              <TouchableOpacity onPress={handleClose} disabled={loading}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#1E1E1E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.label}>Nome do Room</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Kitchen, Bedroom, Living Room"
                placeholderTextColor="#999"
                value={roomName}
                onChangeText={setRoomName}
                editable={!loading}
                autoCapitalize="words"
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Criar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    fontFamily: 'Comfortaa',
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
    fontFamily: 'Comfortaa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    fontFamily: 'Comfortaa',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    fontFamily: 'Comfortaa',
  },
  submitButton: {
    backgroundColor: '#1E7B45',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Comfortaa',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default AddRoomModal;
