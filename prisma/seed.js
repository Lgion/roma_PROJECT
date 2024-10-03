const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const sampleData = {
  user: [
    { email: 'user1@example.com', name: 'User One', phone: '+33123456789' },
    { email: 'user2@example.com', name: 'User Two', phone: '+33123456790' },
    { email: 'user3@example.com', name: 'User Three', phone: '+33123456791' },
  ],
  driver: [
    { name: 'Driver One', email: 'driver1@example.com', phone: '+33987654321', license: 'ABC123' },
    { name: 'Driver Two', email: 'driver2@example.com', phone: '+33987654322', license: 'DEF456' },
    { name: 'Driver Three', email: 'driver3@example.com', phone: '+33987654323', license: 'GHI789' },
  ],
  vehicle: [
    { make: 'Toyota', model: 'Prius', year: 2020, licensePlate: 'XYZ789' },
    { make: 'Honda', model: 'Civic', year: 2019, licensePlate: 'ABC123' },
    { make: 'Tesla', model: 'Model 3', year: 2021, licensePlate: 'DEF456' },
  ],
  equipment: [
    { name: 'Casque Bluetooth', type: 'Audio', serialNumber: 'BT001' },
    { name: 'Kit main libre', type: 'Communication', serialNumber: 'KML002' },
    { name: 'GPS', type: 'Navigation', serialNumber: 'GPS003' },
  ],
  reparation: [
    { description: 'Changement de pneus', cost: 400, date: new Date('2023-01-15') },
    { description: 'Révision moteur', cost: 800, date: new Date('2023-02-20') },
    { description: 'Remplacement batterie', cost: 600, date: new Date('2023-03-25') },
  ],
  order: [
    { pickup: '123 Rue de Paris, Paris', dropoff: '456 Avenue des Champs-Élysées, Paris', status: 'En cours', price: 25.5 },
    { pickup: '789 Boulevard Haussmann, Paris', dropoff: '101 Rue du Faubourg Saint-Honoré, Paris', status: 'Terminé', price: 30.0 },
    { pickup: '202 Avenue Montaigne, Paris', dropoff: '303 Rue du Bac, Paris', status: 'En attente', price: 22.75 },
  ],
}

async function main() {
  console.log(Object.keys(prisma));

  // Créer les utilisateurs
  const users = await Promise.all(
    sampleData.user.map(user => prisma.user.create({ data: user }))
  );

  // Créer les conducteurs
  const drivers = await Promise.all(
    sampleData.driver.map(driver => prisma.driver.create({ data: driver }))
  );

  // Créer les véhicules et les associer aux conducteurs
  const vehicles = await Promise.all(
    sampleData.vehicle.map((vehicle, index) => 
      prisma.vehicle.create({
        data: {
          ...vehicle,
          driver: { connect: { id: drivers[index % drivers.length].id } }
        }
      })
    )
  );

  // Créer les équipements et les associer aux véhicules
  await Promise.all(
    sampleData.equipment.map((equipment, index) => 
      prisma.equipment.create({
        data: {
          ...equipment,
          vehicle: { connect: { id: vehicles[index % vehicles.length].id } }
        }
      })
    )
  );

  // Créer les réparations et les associer aux véhicules
  await Promise.all(
    sampleData.reparation.map((reparation, index) => 
      prisma.reparation.create({
        data: {
          ...reparation,
          vehicle: { connect: { id: vehicles[index % vehicles.length].id } }
        }
      })
    )
  );

  // Créer les commandes et les associer aux utilisateurs et conducteurs
  await Promise.all(
    sampleData.order.map((order, index) => 
      prisma.order.create({
        data: {
          ...order,
          user: { connect: { id: users[index % users.length].id } },
          driver: { connect: { id: drivers[index % drivers.length].id } }
        }
      })
    )
  );

  console.log('Données de test créées avec succès');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })