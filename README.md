# plees2charter

Simple CLI for converting a [plees-tracker](https://github.com/vmiklos/plees-tracker) sleep diary to a CSV compatible with Kizari's [SleepCharter](https://sleepcharter.z13.web.core.windows.net/).

## Usage
1. Export your sleep diary from plees-tracker by clicking on "Export to file" in the application's menu.
2. Run this program on the exported `.csv` file.
3. Visit [SleepCharter](https://sleepcharter.z13.web.core.windows.net/), choose "Manual Data Charting", click on "Choose File" and import your converted `.csv` file.
4. Click "Render" and the application will generate a beautiful, printable chart for you.

```
$ plees2charter <plees-tracker-export.csv> [<output>]

Options
  --verbose, -v   Print output contents
  --timezone, -t  Specify timezone (must be a string from the tz database)

Examples
  $ plees2charter sleep.csv
    => output defaults to sleepcharter.csv
  $ plees2charter sleep.csv sleepcharter.csv
  $ plees2charter sleep.csv -t "Europe/Paris"
```

## Download
You can find builds for all supported 64-bit platforms in the [Releases](https://github.com/quinn-dev/plees2charter/releases) section.

## Build
```bash
# For Linux (x64)
$ npm run build:linux
# For macOS (x64)
$ npm run build:macOS
# For Windows (x64)
$ npm run build:win

# Build executables for all of the above platforms
$ npm run build:all
```

The binaries can be found inside `build/`.  
For other platforms and architectures, visit `pkg`'s [documentation](https://github.com/vercel/pkg#targets).

## Support
If you encounter any problems with this program, please [create a new GitHub issue](https://github.com/quinn-dev/plees2charter/issues/new/choose).