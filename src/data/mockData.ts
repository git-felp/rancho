import { WinnerNotification } from '../types';

export const WINNERS_LIST: WinnerNotification[] = [
  {
    id: 'w1',
    nome: 'Pedro Henrique Oliveira',
    cidade: 'São Paulo',
    estado: 'SP',
    premio: '2 iPhones 16 Pro Max',
    tempo: 'Há 12 segundos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w2',
    nome: 'Ana Clara Alves',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    premio: 'R$ 15.000 no PIX',
    tempo: 'Há 28 segundos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w3',
    nome: 'Lucas Gabriel Santos',
    cidade: 'Salvador',
    estado: 'BA',
    premio: 'AirPods Pro 2',
    tempo: 'Há 45 segundos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w4',
    nome: 'Fernanda Caroline Costa',
    cidade: 'Curitiba',
    estado: 'PR',
    premio: '2 iPhones 16 Pro Max',
    tempo: 'Há 1 minuto',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w5',
    nome: 'Matheus Rodrigues Lima',
    cidade: 'Fortaleza',
    estado: 'CE',
    premio: 'Carro 0KM na Garagem',
    tempo: 'Há 2 minutos',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w6',
    nome: 'Juliana Paes Gomes',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    premio: 'R$ 50.000 no PIX',
    tempo: 'Há 2 minutos',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w7',
    nome: 'Bruno Ferreira Martins',
    cidade: 'Goiânia',
    estado: 'GO',
    premio: '2 iPhones 16 Pro Max + AirPods',
    tempo: 'Há 3 minutos',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w8',
    nome: 'Yasmin Beatriz Souza',
    cidade: 'Recife',
    estado: 'PE',
    premio: '2 iPhones 16 Pro Max',
    tempo: 'Há 4 minutos',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_TICKET_NUMBERS = [
  '04', '07', '08', '21', '22', '23', '24', '26', '27', '28',
  '30', '32', '33', '34', '41', '42', '43', '44', '52', '56'
];

export const ALL_100_NUMBERS = [
  ...INITIAL_TICKET_NUMBERS,
  '75', '93', '98', '62', '89', '63', '74', '95', '36', '55',
  '47', '25', '91', '81', '03', '80', '31', '57', '85', '73',
  '53', '68', '70', '83', '71', '59', '64', '88', '99', '90',
  '72', '69', '94', '77', '50', '78', '15', '48', '84', '86',
  '16', '39', '38', '37', '61', '54', '19', '96', '18', '58',
  '40', '46', '65', '97', '87', '29', '51', '60', '82', '14',
  '09', '17', '79', '12', '13', '45', '02', '05', '01', '35',
  '20', '76', '49', '92', '67', '66', '10', '06', '11', '88'
];
