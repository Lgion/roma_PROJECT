import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const reparation = await prisma.reparation.findUnique({
          where: { id: req.query.id },
        })
        res.status(200).json(reparation)
      } else {
        const reparations = await prisma.reparation.findMany()
        res.status(200).json(reparations)
      }
      break
    case 'POST':
      const newReparation = await prisma.reparation.create({
        data: req.body,
      })
      res.status(201).json(newReparation)
      break
    case 'PUT':
      const updatedReparation = await prisma.reparation.update({
        where: { id: req.query.id },
        data: req.body,
      })
      res.status(200).json(updatedReparation)
      break
    case 'DELETE':
      await prisma.reparation.delete({
        where: { id: req.query.id },
      })
      res.status(204).end()
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}