import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany()
    const drivers = await prisma.driver.findMany()
    const vehicles = await prisma.vehicle.findMany()
    const equipments = await prisma.equipment.findMany()
    const reparations = await prisma.reparation.findMany()
    const orders = await prisma.order.findMany()

    res.status(200).json({
      users,
      drivers,
      vehicles,
      equipments,
      reparations,
      orders,
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}