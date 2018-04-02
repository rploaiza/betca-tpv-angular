import { Shopping } from './shopping.model';

export interface TicketCreation {
    userMobile?: number;
    cash: number;
    card: number;
    voucher: number;
    shoppingCart: Shopping[];
}
