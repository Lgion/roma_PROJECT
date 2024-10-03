import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      console.log("req.query");
      console.log(req.query);
      console.log("req.body");
      console.log(req.body);
      console.log("req.params");
      console.log(req.params);
      if (req.query.id) {
        console.log("if");
        const order = await prisma.order.findUnique({
          where: { id: req.query.id },
        })
        res.status(200).json(order)
      } else {
        console.log("else");
        const orders = await prisma.order.findMany()
        res.status(200).json(orders)
      }
      break
    case 'POST':
      console.log("req.body");
      console.log(req.body);
      req.body.status = "pending"
      const user = await prisma.user.findMany()
      const driver = await prisma.driver.findMany()
      req.body.user = { connect: { id: user[0].id } } // Modification ici
      req.body.driver = { connect: { id: driver[0].id } } // Modification ici
      console.log(req.body);
      // const orders = await prisma.order.findMany()
      // console.log(orders);
      // res.status(201).json({orders,body: req.body})
      const newOrder = await prisma.order.create({
        data: req.body,
      })
      res.status(201).json(newOrder)
      break
    case 'PUT':
      const updatedOrder = await prisma.order.update({
        where: { id: req.query.id },
        data: req.body,
      })
      res.status(200).json(updatedOrder)
      break
    case 'DELETE':
      await prisma.order.delete({
        where: { id: req.query.id },
      })
      res.status(204).end()
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}