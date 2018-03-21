import { Shopping } from './shopping.model';

export interface InvoiceCreation {
    userMobile: number;
    cash: number;
    card: number;
    voucher: number;
    shoppingCart: Shopping[];
}