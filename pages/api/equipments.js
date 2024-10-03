import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const equipment = await prisma.equipment.findUnique({
          where: { id: req.query.id },
        })
        res.status(200).json(equipment)
      } else {
        const equipments = await prisma.equipment.findMany()
        res.status(200).json(equipments)
      }
      break
    case 'POST':
      const newEquipment = await prisma.equipment.create({
        data: req.body,
      })
      res.status(201).json(newEquipment)
      break
    case 'PUT':
      const updatedEquipment = await prisma.equipment.update({
        where: { id: req.query.id },
        data: req.body,
      })
      res.status(200).json(updatedEquipment)
      break
    case 'DELETE':
      await prisma.equipment.delete({
        where: { id: req.query.id },
      })
      res.status(204).end()
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}