# Resumo da Implementação - Add Room, Add Routine e Add Light

## 📋 Estado Atual do Projeto

### ✅ O que já está implementado:

1. **Componente AddRoomModal** (`src/components/AddRoomModal.tsx`)
   - Modal completo com formulário
   - Campo para nome do room
   - Botões "Cancelar" e "Criar"
   - Validação e tratamento de erros
   - Integração com `housesService.createRoom()`
   - Estrutura: View com overlay + Pressable para fechar

2. **Componente AddRoutineModal** (`src/components/AddRoutineModal.tsx`)
   - Modal completo com formulário
   - Campos: nome, descrição, hora início/fim, dias da semana
   - Botões "Cancelar" e "Criar"
   - Integração com `routinesService.createRoutine()`
   - Estrutura: View com overlay + Pressable para fechar

3. **Integração no ChooseARoomScreen** (`src/screens/ChooseARoomScreen.tsx`)
   - Botão "Add Room" funcional (usa Pressable)
   - Estado `modalVisible` para controlar o modal
   - Função `handleAddRoom()` que abre o modal
   - Função `handleRoomCreated()` que recarrega a lista após criar
   - SVG de fundo com `zIndex: -1` e `pointerEvents: 'none'`
   - ScrollView com `zIndex: 1` e `pointerEvents: 'box-none'`

4. **Integração no RoutinesListScreen** (`src/screens/RoutinesListScreen.tsx`)
   - Botão "Add Routine" funcional (usa Pressable)
   - Estado `modalVisible` para controlar o modal
   - Função `handleAddRoutine()` que abre o modal
   - Função `handleRoutineCreated()` que recarrega a lista após criar
   - LinearGradient com `zIndex: -1` e `pointerEvents: 'none'`
   - ScrollView com `zIndex: 1` e `pointerEvents: 'box-none'`

5. **Serviços Backend** (já existiam):
   - `housesService.createRoom(houseId, { name })` - para criar rooms
   - `routinesService.createRoutine(data)` - para criar routines
   - `lightsService.createLight(data)` - para criar lights
   - `apiClient` - cliente HTTP com autenticação

### ⚠️ Problema Atual:

**STATUS:** Os botões "Add Room" e "Add Routine" estão a funcionar - o alert aparece quando clicados, mas o modal não aparece.

**Sintomas:**
- ✅ Botões funcionam (alerts aparecem quando clicados)
- ❌ Não aparecem logs na consola após o alert
- ❌ O modal não aparece

**Estrutura atual dos modais:**
```tsx
<Modal visible={visible} transparent={true}>
  <View style={styles.overlay}>
    <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
    <View style={styles.modalContainer}>
      {/* Conteúdo do modal */}
    </View>
  </View>
</Modal>
```

**Logs de debug adicionados:**
- 🔴 STEP 1-6: No handler do botão (handleAddRoom/handleAddRoutine)
- 🔵 useEffect: Quando modalVisible muda
- 🟢 useEffect: No componente do modal quando visible muda
- 🔵 AddRoomModal/AddRoutineModal render: Quando o modal renderiza

**Para testar:**
1. Abrir console (F12)
2. Clicar no botão "Add Room" ou "Add Routine"
3. Verificar se aparecem os logs 🔴 STEP 1-6
4. Verificar se aparece 🔵 useEffect quando modalVisible muda
5. Verificar se aparece 🟢 AddRoomModal/AddRoutineModal useEffect
6. Verificar se aparece 🔵 AddRoomModal/AddRoutineModal render

## 🔧 Soluções Aplicadas:

1. ✅ Mudado de `TouchableOpacity` para `Pressable` (funciona melhor no web)
2. ✅ Adicionado `pointerEvents="box-none"` ao SVG de fundo e ScrollView
3. ✅ Adicionado `zIndex: -1` ao background e `zIndex: 1` ao conteúdo
4. ✅ Estrutura do modal simplificada (View com overlay + Pressable para fechar)
5. ✅ Removido `position: absolute` e `zIndex` do overlay que causavam problemas
6. ✅ Logs de debug detalhados em cada passo

## 📝 O que falta fazer:

### 1. Fazer o Modal aparecer (PRIORIDADE ALTA)
- Verificar se `setModalVisible(true)` está a atualizar o estado
- Verificar se o componente modal está a receber `visible={true}`
- Se o Modal do React Native não funcionar no web, criar alternativa com View absoluta

### 2. Implementar Add Light Modal
- Criar componente `AddLightModal.tsx` (similar ao AddRoomModal)
- Integrar no `RoomLightsScreen.tsx` (linha ~111)
- Campos necessários:
  - Nome da luz
  - Consumo de energia (watts) - opcional
  - Room name (já vem do route.params)

### 3. Testar com Backend
- Backend deve estar a correr na porta 3000
- Endpoint: `POST /api/houses/{houseId}/rooms` para rooms
- Endpoint: `POST /api/routines` para routines
- Endpoint: `POST /api/lights` para lights
- Verificar se o token de autenticação está a ser enviado

## 🔍 Ficheiros Importantes:

### Backend/Config:
- `src/backend/config.ts` - BASE_URL = 'http://127.0.0.1:3000'
- `src/backend/token.ts` - gestão de tokens
- `.env` - variáveis de ambiente (DB_HOST, DB_USER, etc.)

### Serviços:
- `src/services/housesService.ts` - linha 64-67: `createRoom()`
- `src/services/routinesService.ts` - linha 83-86: `createRoutine()`
- `src/services/lightsService.ts` - linha 56-59: `createLight()`
- `src/services/api.ts` - cliente HTTP

### Screens:
- `src/screens/ChooseARoomScreen.tsx` - botão Add Room (linha ~204)
- `src/screens/RoutinesListScreen.tsx` - botão Add Routine (linha ~125)
- `src/screens/RoomLightsScreen.tsx` - botão Add Light (linha ~111)

### Componentes:
- `src/components/AddRoomModal.tsx` - modal para adicionar room
- `src/components/AddRoutineModal.tsx` - modal para adicionar routine

## 🐛 Debugging:

### Logs adicionados (com emojis para facilitar identificação):
- 🔴 STEP 1-6: No handler do botão (handleAddRoom/handleAddRoutine)
- 🔵 useEffect: Quando modalVisible muda no screen
- 🟢 useEffect: No componente do modal quando visible muda
- 🔵 AddRoomModal/AddRoutineModal render: Quando o modal renderiza

### Para testar:
1. Abrir console do browser (F12)
2. Clicar no botão "Add Room" ou "Add Routine"
3. Verificar se aparecem os logs 🔴 STEP 1-6
4. Verificar se aparece 🔵 useEffect quando modalVisible muda
5. Verificar se aparece 🟢 AddRoomModal/AddRoutineModal useEffect
6. Verificar se aparece 🔵 AddRoomModal/AddRoutineModal render

## 🎯 Próximos Passos:

1. **Resolver problema do modal não aparecer** (PRIORIDADE ALTA)
   - Verificar se os logs aparecem na consola
   - Se os logs não aparecerem, o problema está no handler
   - Se os logs aparecerem mas o modal não, o problema está no Modal do React Native no web
   - Considerar criar versão alternativa com View absoluta se Modal não funcionar

2. **Implementar Add Light Modal**
   - Copiar estrutura do AddRoomModal
   - Adaptar campos para light (name, power_consumption_watts)
   - Integrar no RoomLightsScreen

3. **Testar integração com backend**
   - Verificar se os dados são enviados corretamente
   - Verificar se aparecem na base de dados MySQL
   - Testar tratamento de erros

## 📌 Notas Importantes:

- O projeto usa React Native com Expo
- Backend deve estar em Node.js/Express na porta 3000
- Base de dados MySQL configurada via .env
- Autenticação via JWT token (Bearer token)
- Os botões estão a funcionar (alerts aparecem), apenas o modal não aparece
- Problema pode ser do Modal do React Native no web - considerar alternativa

## 🔗 Estrutura de Dados:

### Room:
```typescript
{
  name: string  // Ex: "Kitchen", "Bedroom"
}
```

### Routine:
```typescript
{
  house_id: number,
  name: string,
  description?: string,
  start_time: string,  // "08:00"
  end_time: string,    // "22:00"
  repeat_monday?: boolean,
  repeat_tuesday?: boolean,
  // ... outros dias
  active?: boolean
}
```

### Light:
```typescript
{
  house_id: number,
  room_name: string,  // Nome do room atual
  name: string,  // Nome da luz
  power_consumption_watts?: number,  // Opcional
  is_on?: boolean,  // Default: false
  brightness?: number,  // Default: 50
  color?: string  // Default: "#FFFFFF"
}
```

## 🚨 Problemas Conhecidos:

1. **Modal não aparece após clicar no botão**
   - Botão funciona (alert aparece)
   - Estado pode não estar a atualizar
   - Modal do React Native pode não funcionar bem no web
   - Solução: Verificar logs e considerar alternativa com View absoluta

2. **Erro de touch events** (resolvido)
   - Era causado por TouchableOpacity aninhados
   - Resolvido usando Pressable e View
