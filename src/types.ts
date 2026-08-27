export interface Prize {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  textColor: string;
  isJackpot?: boolean;
}

export interface WinnerNotification {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  premio: string;
  tempo: string;
  avatar: string;
}

export interface TicketData {
  orderNumber: string;
  titleNumber: string;
  clientName: string;
  prizeDescription: string;
  initialNumbers: string[];
  allNumbers: string[];
  discountFrete: number;
}
