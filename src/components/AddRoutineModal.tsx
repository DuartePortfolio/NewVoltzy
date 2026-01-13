import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  Pressable,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { routinesService, CreateRoutineData } from '../services/routinesService';

interface AddRoutineModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  houseId: number;
}

const AddRoutineModal: React.FC<AddRoutineModalProps> = ({ visible, onClose, onSuccess, houseId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('22:00');
  const [loading, setLoading] = useState(false);

  
  // Dias da semana
  const [repeatDays, setRepeatDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleSubmit = async () => {
    // Validação
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome para a rotina');
      return;
    }

    if (!startTime || !endTime) {
      Alert.alert('Erro', 'Por favor, insira hora de início e fim');
      return;
    }

    try {
      setLoading(true);
      const routineData: CreateRoutineData = {
        house_id: houseId,
        name: name.trim(),
        description: description.trim() || undefined,
        start_time: startTime,
        end_time: endTime,
        repeat_monday: repeatDays.monday,
        repeat_tuesday: repeatDays.tuesday,
        repeat_wednesday: repeatDays.wednesday,
        repeat_thursday: repeatDays.thursday,
        repeat_friday: repeatDays.friday,
        repeat_saturday: repeatDays.saturday,
        repeat_sunday: repeatDays.sunday,
        active: false,
      };

      await routinesService.createRoutine(routineData);
      
      // Limpar campos e fechar o modal
      setName('');
      setDescription('');
      setStartTime('08:00');
      setEndTime('22:00');
      setRepeatDays({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      });
      onClose();
      onSuccess(); // Recarregar a lista de rotinas
      
      Alert.alert('Sucesso', 'Rotina criada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao criar rotina:', error);
      Alert.alert('Erro', error.message || 'Falha ao criar rotina. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setName('');
      setDescription('');
      setStartTime('08:00');
      setEndTime('22:00');
      setRepeatDays({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      });
      onClose();
    }
  };

  const toggleDay = (day: keyof typeof repeatDays) => {
    setRepeatDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  if (!visible) {
    return null;
  }

  const dayLabels: { [key: string]: string } = {
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
    sunday: 'Domingo',
  };

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
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Adicionar Rotina</Text>
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
                <View style={styles.field}>
                  <Text style={styles.label}>Nome da Rotina *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Night Mode, Day Mode"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    editable={!loading}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Descrição (opcional)</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descrição da rotina"
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    editable={!loading}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.timeRow}>
                  <View style={styles.timeField}>
                    <Text style={styles.label}>Hora de Início *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="08:00"
                      placeholderTextColor="#999"
                      value={startTime}
                      onChangeText={setStartTime}
                      editable={!loading}
                    />
                  </View>

                  <View style={styles.timeField}>
                    <Text style={styles.label}>Hora de Fim *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="22:00"
                      placeholderTextColor="#999"
                      value={endTime}
                      onChangeText={setEndTime}
                      editable={!loading}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Repetir nos dias:</Text>
                  <View style={styles.daysContainer}>
                    {Object.keys(repeatDays).map((day) => (
                      <View key={day} style={styles.dayRow}>
                        <Text style={styles.dayLabel}>{dayLabels[day]}</Text>
                        <Switch
                          value={repeatDays[day as keyof typeof repeatDays]}
                          onValueChange={() => toggleDay(day as keyof typeof repeatDays)}
                          disabled={loading}
                          trackColor={{ false: '#ccc', true: '#1E7B45' }}
                          thumbColor="#fff"
                        />
                      </View>
                    ))}
                  </View>
                </View>
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
            </ScrollView>
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
    maxWidth: 500,
    maxHeight: '90%',
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
  field: {
    marginBottom: 20,
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  timeField: {
    flex: 1,
  },
  daysContainer: {
    marginTop: 8,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dayLabel: {
    fontSize: 16,
    color: '#1E1E1E',
    fontFamily: 'Comfortaa',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
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

export default AddRoutineModal;
