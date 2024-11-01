// resolvers/vehicle-resolver.js
import VehicleHelper from '../../controllers/vehicle-controller';

const vehicleResolver = {
  Mutation: {
    addVehicle: async (_, { name, manufacturerId, year }) => {
      return await VehicleHelper.addVehicle(name, manufacturerId, year);
    },
  },
  Query: {
    getVehicles: async () => {
      return await VehicleHelper.getVehicles();
    },
  },
};

export default vehicleResolver;
