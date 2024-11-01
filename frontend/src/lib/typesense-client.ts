// import Typesense from 'typesense';

// const typesenseClient = new Typesense.Client({
//   nodes: [
//     {
//       host: 'ykw82vu07tl6bc93p-1.a1.typesense.net',
//       port: 443,
//       protocol: 'https',
//     },
//   ],
//   apiKey: 'mSEFjDxvilmoR3aN46LaQDfVd5FXZFNI',
//   connectionTimeoutSeconds: 2,
// });

// export const searchVehicles = async (
//   query: string,
//   transmission?: string,
//   fuelType?: string,
//   seats?: number | null,
//   priceSort: "asc" | "desc" = "asc"
// ) => {
//   try {
//     const filters: string[] = ['pricePerDay:=[1..2000]']; // Base price filter

//     // Log incoming parameters for debugging
//     console.log("Search Parameters: ", { query, transmission, fuelType, seats, priceSort });

//     // Add filters conditionally based on provided arguments
//     if (transmission) {
//       filters.push(`vehicle.transmission:=${transmission}`);
//     }
//     if (fuelType) {
//       filters.push(`vehicle.fuelType:=${fuelType}`);
//     }
//     if (seats !== undefined && seats !== null) { // Check for undefined as well
//       filters.push(`vehicle.numberOfSeats:=${seats}`);
//     }

//     console.log("Filters being used: ", filters.join(" && "));

//     const searchResults = await typesenseClient.collections("cars").documents().search({
//       q: query,
//       query_by: "name,vehicle.name,vehicle.manufacturer.name,vehicle.transmission,vehicle.fuelType",
//       filter_by: filters.join(" && "), // Ensure correct formatting
//       sort_by: `pricePerDay:${priceSort}`, // Sort by price
//     });

//     console.log("Search Results: ", searchResults); // Log the raw search results
//     return searchResults?.hits?.map((hit: any) => hit.document) || [];
//   } catch (error) {
//     console.error("Search error: ", error); // Log the error
//     throw new Error("Error fetching vehicles");
//   }
// };





import Typesense from 'typesense';

const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: 'ykw82vu07tl6bc93p-1.a1.typesense.net',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: 'mSEFjDxvilmoR3aN46LaQDfVd5FXZFNI',
  connectionTimeoutSeconds: 2,
});

export const searchVehicles = async (
  query: string,
  // priceSort: "asc" | "desc" = "asc"
) => {
  try {
    // const filters: string[] = ['pricePerDay:=[1..2000]']; // Base price filter

    // // Log incoming parameters for debugging
    // console.log("Search Parameters: ", { query, priceSort });

    // console.log("Filters being used: ", filters.join(" && "));

    const searchResults = await typesenseClient.collections("cars").documents().search({
      q: query,
      query_by: "name",// Adjusted to only include the available field
      // filter_by: filters.join(" && "), // Ensure correct formatting
      // sort_by: `pricePerDay:${priceSort}`, // Sort by price
    });

    console.log("Search Results: ", searchResults); // Log the raw search results
    return searchResults?.hits?.map((hit: any) => hit.document) || [];
  } catch (error) {
    console.error("Search error: ", error); // Log the error
    throw new Error("Error fetching vehicles");
  }
};
