import { userService } from '../services/userService.js';

export const userController = {
  async getAll(req, res, next) {
    try {
      res.json(await userService.getAll());
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, email } = req.body;
      const user = await userService.create({ name, email });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = {};
      if (req.body.name !== undefined) data.name = req.body.name;
      if (req.body.email !== undefined) data.email = req.body.email;

      const user = await userService.update(req.params.id, data);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const user = await userService.remove(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};