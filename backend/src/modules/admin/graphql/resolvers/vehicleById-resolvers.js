import Rentable from '../models/rentable-vehicle-model.js';
import Vehicle from '../models/vehicles-model.js';
import Manufacturer from '../models/manufacturer-model.js';

const resolvers = {
  Query: {
    getVehicleById: async (_, { id }) => {
      try {
        const rentableVehicle = await Rentable.findOne({
          where: { id },
          include: [
            {
              model: Vehicle,
              as: 'vehicle',
              include: [
                {
                  model: Manufacturer,
                  as: 'manufacturer',
                },
              ],
            },
          ],
        });

        if (!rentableVehicle) {
          throw new Error('Vehicle not found');
        }

        return rentableVehicle;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching vehicle');
      }
    },
  },
};

export default resolvers;
