// Données simulées pour l'application
export const mockData = {
  // Profils utilisateurs
  profiles: [
    { id: "1", name: "Administrateur", description: "Accès complet" },
    { id: "2", name: "Opérateur Stock", description: "Gestion des mouvements" },
    { id: "3", name: "Lecteur Rapports", description: "Consultation uniquement" },
  ],

  // Utilisateurs
  users: [
    {
      id: "1",
      username: "admin",
      password: "admin123",
      email: "admin@banque.com",
      profileId: "1",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      username: "operateur1",
      password: "op123",
      email: "operateur1@banque.com",
      profileId: "2",
      isActive: true,
      createdAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "3",
      username: "lecteur1",
      password: "lect123",
      email: "lecteur1@banque.com",
      profileId: "3",
      isActive: true,
      createdAt: "2024-02-01T00:00:00Z",
    },
  ],

  // Banques
  banks: [
    {
      id: "1",
      name: "Banque Centrale",
      address: "123 Rue Principale, Paris",
      bankCode: "BC001",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Banque Régionale Nord",
      address: "456 Avenue du Nord, Lille",
      bankCode: "BRN002",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      name: "Banque Régionale Sud",
      address: "789 Boulevard du Midi, Marseille",
      bankCode: "BRS003",
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],

  // Emplacements
  locations: [
    {
      id: "1",
      name: "Coffre-fort Principal",
      address: "Sous-sol sécurisé",
      bankId: "1",
      maxCapacity: 100000,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Réserve Agence Centre",
      address: "1er étage, bureau 101",
      bankId: "1",
      maxCapacity: 50000,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      name: "Coffre Nord",
      address: "Salle sécurisée A",
      bankId: "2",
      maxCapacity: 75000,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "4",
      name: "Coffre Sud",
      address: "Salle sécurisée B",
      bankId: "3",
      maxCapacity: 60000,
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],

  // Types de cartes
  cardTypes: [
    {
      id: "1",
      type: "Visa",
      subType: "Classic",
      subSubType: "National",
      description: "Carte Visa Classic pour usage national",
      alertThreshold: 100, // seuil d'alerte par défaut
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      type: "Visa",
      subType: "Classic",
      subSubType: "International",
      description: "Carte Visa Classic pour usage international",
      alertThreshold: 100, // seuil d'alerte par défaut
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      type: "Visa",
      subType: "Gold",
      subSubType: "National",
      description: "Carte Visa Gold pour usage national",
      alertThreshold: 100, // seuil d'alerte par défaut
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "4",
      type: "Visa",
      subType: "Gold",
      subSubType: "International",
      description: "Carte Visa Gold pour usage international",
      alertThreshold: 100, // seuil d'alerte par défaut
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "5",
      type: "Mastercard",
      subType: "Standard",
      subSubType: "National",
      description: "Carte Mastercard Standard pour usage national",
      alertThreshold: 100, // seuil d'alerte par défaut
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "6",
      type: "Mastercard",
      subType: "Gold",
      subSubType: "International",
      description: "Carte Mastercard Gold pour usage international",
      alertThreshold: 100, // seuil d'alerte par défaut
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "7",
      type: "Mastercard",
      subType: "Platinum",
      subSubType: "International",
      description: "Carte Mastercard Platinum pour usage international",
      alertThreshold: 100, // seuil d'alerte par défaut
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],

  // Stock actuel
  stock: [
    { id: "1", locationId: "1", cardTypeId: "1", quantity: 5000 },
    { id: "2", locationId: "1", cardTypeId: "2", quantity: 3000 },
    { id: "3", locationId: "1", cardTypeId: "3", quantity: 2000 },
    { id: "4", locationId: "1", cardTypeId: "4", quantity: 1500 },
    { id: "5", locationId: "2", cardTypeId: "1", quantity: 2500 },
    { id: "6", locationId: "2", cardTypeId: "5", quantity: 4000 },
    { id: "7", locationId: "3", cardTypeId: "2", quantity: 3500 },
    { id: "8", locationId: "3", cardTypeId: "6", quantity: 2200 },
    { id: "9", locationId: "4", cardTypeId: "7", quantity: 1800 },
    { id: "10", locationId: "4", cardTypeId: "5", quantity: 3200 },
  ],

  // Mouvements de stock
  movements: [
    {
      id: "1",
      type: "ENTREE",
      date: "2024-12-01T10:00:00Z",
      userId: "2",
      cardTypeId: "1",
      quantity: 1000,
      sourceLocationId: null,
      destinationLocationId: "1",
      referenceNumber: "ENT-2024-001",
      notes: "Livraison fournisseur",
    },
    {
      id: "2",
      type: "SORTIE",
      date: "2024-12-02T14:30:00Z",
      userId: "2",
      cardTypeId: "1",
      quantity: 500,
      sourceLocationId: "1",
      destinationLocationId: null,
      referenceNumber: "SOR-2024-001",
      notes: "Distribution agence",
    },
    {
      id: "3",
      type: "TRANSFERT",
      date: "2024-12-03T09:15:00Z",
      userId: "2",
      cardTypeId: "2",
      quantity: 300,
      sourceLocationId: "1",
      destinationLocationId: "2",
      referenceNumber: "TRA-2024-001",
      notes: "Répartition stock",
    },
    {
      id: "4",
      type: "ENTREE",
      date: "2024-12-04T11:00:00Z",
      userId: "2",
      cardTypeId: "5",
      quantity: 2000,
      sourceLocationId: null,
      destinationLocationId: "2",
      referenceNumber: "ENT-2024-002",
      notes: "Nouvelle commande Mastercard",
    },
    {
      id: "5",
      type: "TRANSFERT",
      date: "2024-12-05T16:45:00Z",
      userId: "2",
      cardTypeId: "6",
      quantity: 200,
      sourceLocationId: "3",
      destinationLocationId: "4",
      referenceNumber: "TRA-2024-002",
      notes: "Équilibrage stock régional",
    },
  ],
}
