export const ChangePolygonFormat = (pointArray) => {
    let points = []
    for (let location of pointArray) {
        let loc = []
        loc = [location.latitude, location.longitude]
        points.push(loc)
    }
    return points
}