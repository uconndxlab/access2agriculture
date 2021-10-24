// This function exists because there are conditions in which JSON.parse(JSON.stringify)) will strip necessary information from an object, such as _lat,_long in firebase.
export function deepCloneWaypoint (item) {
    return {
        name: item.name,
        address: item.address,
        coordinates: {
            _lat: item.coordinates._lat,
            _long: item.coordinates._long
        },
        state: item.state,
        type: item.type,
        products: item.products,
        geohash: item.geohash,
        image: item.image,
        phone: item.phone,
        website: item.website,
        zip: item.zip,
        town: item.town,
        id: item.id
    }
}