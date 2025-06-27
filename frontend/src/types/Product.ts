export interface Product {
  batchNumber: string;
  ingredients: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
  status: string;
  history: Array<{
    action: string;
    manufacturer?: string;
    manufactureDate?: string;
    distributor?: string;
    temperatureChecks?: string;
    shipDate?: string;
    pharmacy?: string;
    inspectionDate?: string;
    remarks?: string;
  }>;
  distributor?: string;
  temperatureChecks?: string;
  shipDate?: string;
  pharmacy?: string;
  inspectionDate?: string;
  remarks?: string;
}

