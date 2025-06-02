export type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  unit: 'Kg' | 'Unid.';
  imageUrl?: any; //  Adicionado para o caminho da imagem local (usará require())
  // Se fosse URL remoto, seria: imageUrl?: string;
};
