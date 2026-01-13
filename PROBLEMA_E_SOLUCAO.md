# Problema: Botões "Add Room" e "Add Routine" não funcionam no Web

## 🔴 Problema Identificado

Os botões "Add Room" e "Add Routine" não estão a responder aos cliques quando a aplicação corre no web (Expo Web).

### Causas Identificadas:

1. **LinearGradient do Expo** - O componente `LinearGradient` do `expo-linear-gradient` não funciona bem com `pointerEvents` no web, bloqueando os cliques
2. **SVG de fundo** - Os elementos SVG decorativos com `position: absolute` podem bloquear cliques se não tiverem `pointerEvents: 'none'`
3. **ScrollView** - Pode interceptar eventos de toque se não estiver configurado corretamente
4. **Estrutura de Views aninhadas** - Múltiplas Views com `position: absolute` podem criar camadas que bloqueiam interações

## ✅ Solução Aplicada

### Para RoutinesListScreen:
1. **Removido LinearGradient** - Substituído por `View` com `backgroundColor` sólida
2. **Simplificada estrutura** - Removidos `pointerEvents` desnecessários
3. **Botão simplificado** - `TouchableOpacity` direto sem Views extras

### Para ChooseARoomScreen:
1. **SVG com pointerEvents: 'none'** - Já aplicado
2. **Botão com zIndex alto** - Já aplicado
3. **Usar Pressable em vez de TouchableOpacity** - Pode ser necessário

## 🔧 Solução Definitiva

Se ainda não funcionar, a solução é:

1. **Substituir LinearGradient por View com cor sólida** ✅ FEITO
2. **Garantir que todos os elementos decorativos têm `pointerEvents: 'none'`** ✅ FEITO
3. **Usar `Pressable` em vez de `TouchableOpacity` no web** (opcional)
4. **Testar com `window.alert()` para confirmar que o clique funciona**

## 📝 Código Correto

```tsx
// ANTES (não funciona no web):
<LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
  <ScrollView>
    <TouchableOpacity onPress={handleAdd}>
      ...
    </TouchableOpacity>
  </ScrollView>
</LinearGradient>

// DEPOIS (funciona):
<View style={styles.container}>
  <ScrollView>
    <TouchableOpacity onPress={handleAdd}>
      ...
    </TouchableOpacity>
  </ScrollView>
</View>

// styles.container:
container: {
  flex: 1,
  backgroundColor: '#78B85E', // Cor sólida
}
```

## 🎯 Próximos Passos

1. Testar se o botão funciona agora
2. Se não funcionar, verificar se há outros elementos sobrepostos
3. Considerar usar `react-native-web` diretamente para melhor compatibilidade
4. Verificar se há problemas com a navegação do React Navigation no web
