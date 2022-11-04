const fs = require('fs')

exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}


exports.addflight = (req, res) => {
    console.log(process.cwd());

    let flightTitle = req.query.title
    let flightPrice = req.query.price

    if (flightTitle !== undefined && flightPrice !== undefined) {

        let date = new Date();

        let currentTime = date.getTime()
        let currentDate = date.getDate()

        // get the current data in the database

        let allFlights = fs.readFileSync('\database.txt')

        let allFlightsParsed = JSON.parse(allFlights)


        let flight = {
            title: flightTitle,
            time: currentTime,
            price: flightPrice,
            date: currentDate
        }

        allFlightsParsed.push(flight)

        let newFlights = JSON.stringify(allFlightsParsed)

        fs.writeFileSync('\database.txt', newFlights)


        res.json({
            status: 'success',
            message: 'Flight Booked Successfully'
        })


    } else {
        res.json({
            status: 'failed',
            message: 'Invalid Parameter'
        })
    }


}

exports.getAllFlights = (req, res) => {
    let allFlights = fs.readFileSync('database.txt', 'utf-8')

    res.json({
        status: 'success',
        data: JSON.parse(allFlights)
    })
}

exports.getSingleFlight = (req, res) => {
    let title = req.query.title

    if (title !== undefined) {

        let allFlights = fs.readFileSync('database.txt')

        let allFlightsParsed = JSON.parse(allFlights)

        let singleFlight = allFlightsParsed.filter(function (flight) {
            return flight.title === title;
        });

        res.json({
            status: 'success',
            data: singleFlight
        })

    } else {
        res.json({
            status: 'failed',
            message: 'Invalid Paramter passed'
        })
    }
}

exports.deleteFlight = (req, res) => {
    let title = req.query.title

    if (title !== undefined) {

        let allFlights = fs.readFileSync('database.txt')

        let allFlightsParsed = JSON.parse(allFlights)

        let flights = allFlightsParsed.filter(function (flight) {
            return flight.title !== title;
        });

        let newFlights = JSON.stringify(flights)

        fs.writeFileSync('database.txt', newFlights)

        res.json({
            status: 'success',
            message: 'flight deleted successfully'
        })

    } else {
        res.json({
            status: 'failed',
            message: 'Invalid Paramter passed'
        })
    }

}
