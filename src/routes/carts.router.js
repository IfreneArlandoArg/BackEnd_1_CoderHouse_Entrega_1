import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager('src/data/carts.json');

router.post('/', async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);
  cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await manager.addProductToCart(cid, pid);
  res.json(updatedCart);
});

export default router;
