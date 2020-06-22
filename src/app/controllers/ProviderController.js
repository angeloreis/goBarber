import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['url', 'name', 'path'] },
      ],
    });

    if (!providers) {
      return res.status(401).json({ error: 'Providers not found in list' });
    }

    return res.json(providers);
  }
}

export default new ProviderController();
