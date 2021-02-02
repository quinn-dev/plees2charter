const moment = require('moment-timezone');
const csv = require('csvtojson');
const jsonexport = require('jsonexport');
const fs = require('fs');
const meow = require('meow');
const chalk = require('chalk');
const terminalLink = require('terminal-link')

// Link to tz database
const tz_database = terminalLink('tz database', 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones')

const cli = meow(`
        Usage
          $ plees2charter <plees-tracker-export.csv> [<output>]

        Options
          --verbose, -v   Print output contents
          --timezone, -t  Specify timezone (must be a string from the ${tz_database})

        Examples
          $ plees2charter sleep.csv
            => output defaults to sleepcharter.csv
          $ plees2charter sleep.csv sleepcharter.csv
          $ plees2charter sleep.csv -t "Europe/Berlin"
            
`, {
    flags: {
        verbose: {
            type: 'boolean',
            alias: 'v'
        },
        timezone: {
            type: 'string',
            alias: 't'
        }
    }
});

const error = (err) => {
    console.log()
    console.error(chalk.red.bold(`  Error: ${err}`))
    cli.showHelp()
}

// Format date for SleepCharter consumption
const formatDate = (date) => {
    if(timezone) {
        return moment(Number(date)).tz(timezone).format("YYYY-MM-DD HH:mm")
    } else {
        return moment(Number(date)).format("YYYY-MM-DD HH:mm")
    }
}

const {verbose, timezone} = cli.flags

// Output defaults to sleepcharter.csv
const targetFile = cli.input[1] || 'sleepcharter.csv'

// Require input file
if (!cli.input[0]) {
    error("Please provide an input file.")
}

// Check if input file exists
if (!fs.existsSync(cli.input[0])) {
    error(`Input file ${cli.input[0]} not found.`)
}

// Throw error if too many arguments are given
if (cli.input.length > 2) {
    error("Too many arguments.")
}

(async () => {
    
    const data = await csv().fromFile(cli.input[0])

    const mapped = data.map(el => {
        return {
            SleepStart: formatDate(el.start),
            SleepEnd: formatDate(el.stop)
        }
    })

    jsonexport(mapped, { rowDelimiter: ',' }, function (err, csv) {
        if (err) return error(err);

        verbose && console.log(csv);

        try {
            // Write results to CSV
            const data = fs.writeFileSync(targetFile, csv)

            console.log(chalk.green.bold(`Successfully converted ${cli.input[0]} to ${targetFile}.`))
          } catch (err) {
            error(err)
          }
    });

})();