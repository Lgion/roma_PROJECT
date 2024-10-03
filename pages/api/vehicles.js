import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const vehicle = await prisma.vehicle.findUnique({
          where: { id: req.query.id },
        })
        res.status(200).json(vehicle)
      } else {
        const vehicles = await prisma.vehicle.findMany()
        res.status(200).json(vehicles)
      }
      break
    case 'POST':
      const newVehicle = await prisma.vehicle.create({
        data: req.body,
      })
      res.status(201).json(newVehicle)
      break
    case 'PUT':
      const updatedVehicle = await prisma.vehicle.update({
        where: { id: req.query.id },
        data: req.body,
      })
      res.status(200).json(updatedVehicle)
      break
    case 'DELETE':
      await prisma.vehicle.delete({
        where: { id: req.query.id },
      })
      res.status(204).end()
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}