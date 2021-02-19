import withDirect from "../data/with_direct.json";
import withSuffix from "../data/with_suffix.json";
import withKeys from "../data/with_keys.json";
import withCommand from "../data/with_command";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.date = React.createRef();
        this.time = React.createRef();
    }

    render() {
        return [
            <table>
                <tr>
                    <td colSpan="3">
                        <p style={{ textAlign: "center" }}>
                            <span id="date" ref={this.date}>
                                Loading Date
                            </span>
                        </p>
                        <p className="quote">
                            <span id="lit_quote"></span>
                        </p>
                        <p className="info">
                            <span id="book"></span> <span id="author"></span>
                        </p>
                    </td>
                </tr>

                {this.props.children}

                <tr>
                    <td colSpan="3">
                        <form onSubmit={this.handle.bind(this)}>
                            <input
                                type="text"
                                id="search"
                                placeholder={
                                    "search, enter a shortcut, or go to a url"
                                }
                                autoFocus
                            />
                        </form>
                    </td>
                </tr>

                <tr>
                    <td colSpan="3">
                        <p id="commandOutput"></p>
                    </td>
                </tr>
            </table>,

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>,
            <script src="moment.js"></script>,
            <script src="script.js"></script>,
        ];
    }

    componentDidMount() {
        function date() {
            document.getElementById("date").innerHTML = moment().format(
                "dddd, MMM D"
            );
            setTimeout(date, 1000);
        }

        var current_date;

        function loadFile(timeStamp) {
            return require("../times/json/" + timeStamp + ".json");
        }

        function startTime() {
            var today = new Date();
            if (
                current_date !== undefined &&
                current_date.getMinutes() === today.getMinutes()
            ) {
                var t = setTimeout(startTime, 1000);
                return;
            }

            current_date = today;
            var h = today.getHours();
            var m = today.getMinutes();

            h = checkTime(h);
            m = checkTime(m);

            var timeCode = h + "_" + m;

            var lit_json = loadFile(timeCode);
            var lit_json_single =
                lit_json[Math.floor(Math.random() * lit_json.length)];

            try {
                document.getElementById("lit_quote").innerHTML =
                    lit_json_single.quote_first +
                    "<em>" +
                    lit_json_single.quote_time_case +
                    "</em>" +
                    lit_json_single.quote_last;
                document.getElementById("book").innerHTML =
                    lit_json_single.title;
                document.getElementById("author").innerHTML =
                    lit_json_single.author;
            } catch (e) {
                console.log(e);
            }

            var t = setTimeout(startTime, 1000);
        }
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        date();
        startTime();
    }

    handle(e) {
        e.preventDefault();
        const P3 =
            "^(http[s]?://)?([a-zA-Z0-9]+.)?(([a-zA-Z0-9]+(-*[a-zA-Z0-9]+)?)+.)*([a-zA-Z]{2,6})$";
        var input = document.getElementById("search").value.trim();

        if (input.startsWith("@")) {
            this.handleKeyOrSuffix(
                input.split(/ +/)[0].substring(1).toLowerCase(),
                input.split(/ +/).slice(1).join(" ")
            );
            return false;
        }

        if (input.startsWith("/")) {
            this.handleCommand(
                input.split(/ +/)[0].substring(1).toLowerCase(),
                input.split(/ +/).slice(1).join(" ")
            );
            return false;
        }

        if (input.startsWith("-")) {
            this.handleDirect(input.substring(1).toLowerCase());
            return false;
        }

        if (input.startsWith(".")) {
            var go = input.substring(1);

            if (!go.startsWith("http") && !go.startsWith("https")) {
                go = "http://" + go;
            }

            window.location = go;
            return true;
        }

        if (
            !input.startsWith("?") &&
            input.match(P3) !== null &&
            input.includes(".")
        ) {
            var go = input.match(P3)[0];

            if (!go.startsWith("http") && !go.startsWith("https")) {
                go = "http://" + go;
            }

            window.location = go;
            return true;
        }

        var search = "";
        if (input.startsWith("?")) {
            search = "https://google.com/search?q=" + input.substring(1).trim();
        } else {
            search = "https://google.com/search?q=" + input;
        }

        window.location = search;

        return false;
    }

    handleDirect(inp) {
        if (Object.keys(withDirect).includes(inp)) {
            window.location = withDirect[inp].link;
            return true;
        }

        return false;
    }

    handleKeyOrSuffix(base, plus) {
        if (Object.keys(withKeys).includes(base)) {
            if (!plus) {
                window.location = withKeys[base].base;
            } else if (Object.keys(withKeys[base].keys).includes(plus)) {
                window.location =
                    withKeys[base].base + withKeys[base].keys[plus];
            }
        } else if (Object.keys(withSuffix).includes(base)) {
            window.location = withSuffix[base].base + plus;
        }
    }

    handleCommand(base, plus) {
        if (Object.keys(withCommand).includes(base)) withCommand[base].call(plus);
    }
}

export default Layout;
