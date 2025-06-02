// Tipo para as informações gerais da loja
export type StoreProfile = {
    id: string;
    name: string;
    email: string;
    phone?: string; // Telefone pode ser opcional
    status: 'Aberto' | 'Fechado' | 'Em Férias'; // Exemplo de status
    openingHours: {
      from: string; // Ex: "09:00"
      to: string;   // Ex: "17:00"
    };
  };
  
  // Tipo para as informações de endereço da loja
  export type StoreAddress = {
    cep: string;
    state: string; // Ex: "Distrito Federal"
    city: string; // Ex: "Taguatinga"
    street: string; // Ex: "QS 07"
    number: string;
    complement?: string; // Complemento pode ser opcional
  };
  
  // Tipo para as formas de pagamento
  export type PaymentMethods = {
    pix: boolean;
    creditCard: boolean;
    debitCard: boolean;
    // Adicione outras formas de pagamento conforme necessário
  };
  
  // NOVO: Tipo para uma promoção
export type Promotion = {
  id: string;
  productId: string; // ID do produto ao qual a promoção se aplica
  productName: string; // Nome do produto para exibição
  productType: string; // Tipo do produto (ex: Fruta, Verdura)
  promotionPrice: number; // Preço promocional
  unit: 'Kg' | 'Unid.'; // Unidade da promoção
};