import Header from "../components/head";
import Layout from "../components/layout";
import withSuffix from "../data/with_suffix.json";
import withKeys from "../data/with_keys.json";
import withDirect from "../data/with_direct.json";
import withCommand from "../data/with_command";

export default function Index() {
    return [
        <Header />,
        <Layout>
            <tr>
                <td>
                    {Object.keys(withKeys).map((base) => keysHint(base))}
                </td>
                <td>
                    {Object.keys(withSuffix).map((base) => suffixHint(base))}
                </td>
                <td>
                    {Object.keys(withDirect).map((base) => directHint(base))}

                    <br />

                    {Object.keys(withCommand).map((base) => commandHint(base))}
                </td>
            </tr>
            <tr>
                <td colSpan="3">
                    <hr />
                </td>
            </tr>
        </Layout>,
    ];
}

function keysHint(base) {
    return (
        <tr key={"@" + base}>
            <td className="title">
                <a href={withKeys[base].base} className="tooltip" title={withKeys[base].hint}>@{base}<span className="tooltiptext">{withKeys[base].hint}</span></a>
            </td>
            {withKeys[base].keys ? (
                <td>
                    {Object.keys(withKeys[base].keys)
                        .map((el) => (
                            <a
                                href={
                                    withKeys[base].base +
                                    withKeys[base].keys[el]
                                }
                                className="tooltip"
                                title={withKeys[base].keys[el]}
                            >
                                {el}
                                <span className="tooltiptext">{withKeys[base].keys[el]}</span>
                            </a>
                        ))
                        .reduce((a, b) => [a, " ", b])}
                </td>
            ) : (
                ""
            )}
        </tr>
    );
}

function suffixHint(base) {
    return (
        <tr key={"@" + base} className="tooltip">
            <td className="title" title={withSuffix[base].hint}>@{base}<span className="tooltiptext">{withSuffix[base].hint}</span></td>
            <td>{withSuffix[base].suffix}</td>
        </tr>
    );
}

function directHint(base) {
    return (
        <tr key={"-" + base}>
            <td className="title">
                <a href={withDirect[base].link}>-{base}</a>
            </td>
            <td>
                <a href={withDirect[base].link}>{withDirect[base].title}</a>
            </td>
        </tr>
    );
}

function commandHint(base) {
    return (
        <tr key={"/" + base} className="tooltip">
            <td className="title" title={withCommand[base].hint}>/{base}<span className="tooltiptext">{withCommand[base].hint}</span></td>
            <td>{withCommand[base].title}</td>
        </tr>
    );
}
