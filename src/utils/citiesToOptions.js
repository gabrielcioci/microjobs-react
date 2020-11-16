/**
 * Convert a list with city models to options
 *
 * @param cities
 *
 * @return {Object}
 */

const citiesToOptions = cities => {

    let options = []

    cities.forEach(city => options.push({label: city.label, value: city.value}))

    return options

}

export default citiesToOptions
