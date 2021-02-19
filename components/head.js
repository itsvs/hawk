import Head from "next/head";

export default function Header() {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />

            <link rel="stylesheet" href="/style.css" type="text/css" />

            <title>hawk</title>
        </Head>
    );
}
