export type ChainOptions = {
  id: number;
  scanURL: string;
  name: string;
  title: string;
};

export type ChainHub = {
  [key: string]: {
    address: string;
  };
};
