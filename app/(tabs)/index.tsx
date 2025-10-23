import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Tarefa from '../../components/Tarefa';
type TarefaProps = {
  id: string;
  nome: string;
  feita: boolean;
};
export default function App() {
  const [texto, setTexto] = useState<string>('');                 
  const [tarefas, setTarefas] = useState<TarefaProps[]>([]);     
  const [editando, setEditando] = useState<string | null>(null); 

  function salvarTarefa() {
    if (texto.trim() === '') return;

    if (editando) {
      const novasTarefas = tarefas.map((tarefa) =>
        tarefa.id === editando ? { ...tarefa, nome: texto } : tarefa
      );
      setTarefas(novasTarefas);
      setEditando(null);
    } else {
      const novaTarefa: TarefaProps = {
        id: Date.now().toString(),
        nome: texto,
        feita: false,
      };
      setTarefas([...tarefas, novaTarefa]);
    }
    setTexto('');
  }

  function marcarFeita(id: string) {
    const novas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, feita: !tarefa.feita } : tarefa
    );
    setTarefas(novas);
  }

  function editarTarefa(id: string, nome: string) {
    setTexto(nome);
    setEditando(id);
  }

  function apagarTarefa(id: string) {
    const novas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novas);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Rotina</Text>

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          placeholderTextColor="#E6D3F2"
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.botao} onPress={salvarTarefa}>
          <Text style={styles.textoBotao}>
            {editando ? 'Salvar' : 'Adicionar'}
          </Text>
        </TouchableOpacity>
      </View>

      {tarefas.length === 0 && (
        <Text style={styles.mensagemVazia}>
          Nenhuma tarefa adicionada ainda.
        </Text>
      )}

      <FlatList<TarefaProps>
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Tarefa
            data={item}
            onFeita={marcarFeita}
            onEditar={editarTarefa}
            onApagar={apagarTarefa}
          />
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6D3F2',
    paddingHorizontal: 500,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5A0C91', 
  },
  areaInput: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#C084D9',
    padding: 5,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#D2A7E5',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  botao: {
    backgroundColor: '#5A0C91',
    marginLeft: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 20,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mensagemVazia: {
    textAlign: 'center',
    color: '#5A0C91',
    marginTop: 20,
  },
});
