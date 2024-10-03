import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const driver = await prisma.driver.findUnique({
          where: { id: req.query.id },
        })
        res.status(200).json(driver)
      } else {
        const drivers = await prisma.driver.findMany()
        res.status(200).json(drivers)
      }
      break
    case 'POST':
      const newDriver = await prisma.driver.create({
        data: req.body,
      })
      res.status(201).json(newDriver)
      break
    case 'PUT':
      const updatedDriver = await prisma.driver.update({
        where: { id: req.query.id },
        data: req.body,
      })
      res.status(200).json(updatedDriver)
      break
    case 'DELETE':
      await prisma.driver.delete({
        where: { id: req.query.id },
      })
      res.status(204).end()
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}