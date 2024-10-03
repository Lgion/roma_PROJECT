import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const user = await prisma.user.findUnique({
          where: { id: req.query.id },
        })
        res.status(200).json(user)
      } else {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
      }
      break
    case 'POST':
      const newUser = await prisma.user.create({
        data: req.body,
      })
      res.status(201).json(newUser)
      break
    case 'PUT':
      const updatedUser = await prisma.user.update({
        where: { id: req.query.id },
        data: req.body,
      })
      res.status(200).json(updatedUser)
      break
    case 'DELETE':
      await prisma.user.delete({
        where: { id: req.query.id },
      })
      res.status(204).end()
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}