import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type TarefaProps = {
  id: string;
  nome: string;
  feita: boolean;
};

type Props = {
  data: TarefaProps;
  onFeita: (id: string) => void;
  onEditar: (id: string, nome: string) => void;
  onApagar: (id: string) => void;
};

export default function Tarefa({ data, onFeita, onEditar, onApagar }: Props) {
  return (
    <View style={styles.item}>
      <Text
        style={[
          styles.texto,
          data.feita && styles.textoFeito
        ]}
      >
        {data.nome}
      </Text>

      <View style={styles.botoes}>
        <TouchableOpacity onPress={() => onFeita(data.id)}>
          <Feather
            name={data.feita ? 'check-circle' : 'circle'}
            size={24}
            color={data.feita ? '#5A0C91' : '#5A0C91'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onEditar(data.id, data.nome)}>
          <FontAwesome name="edit" size={24} color="#5A0C91" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onApagar(data.id)}>
          <FontAwesome name="trash" size={24} color="#5A0C91" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#C084D9',  
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  texto: {
    fontSize: 18,
    color: '#3E0B5D',           
    flex: 1,
    textAlign: 'center',
  },
  textoFeito: {
    textDecorationLine: 'line-through',
    color: '#8C52BF',            
  },
  botoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
