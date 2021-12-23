// This function exists because there are conditions in which JSON.parse(JSON.stringify)) will strip necessary information from an object, such as _lat,_long in firebase.
export function deepCloneWaypoint (item) {
    let wp = {
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
        id: item.id,
        assistance_options: item.assistance_options,
        routes: [],
        bookmarked: false,
        description: ''
    }
    if ( item.routes ) {
        wp.routes = item.routes
    }
    if ( item.bookmarked ) {
        wp.bookmarked = item.bookmarked
    }

    if ( item.description ) {
        wp.description = item.description
    }
    return wp
}

export function deepCloneProduct (item) {
    return {
        id: item.id,
        name: item.name
    }
}

export function deepCloneRoute (item) {
    return {
        id: item.id,
        name: item.name,
        center: item.center,
        route_color: item.route_color,
        route_long_name: item.route_long_name,
        route_short_name: item.route_short_name,
        source: item.source
    }
}