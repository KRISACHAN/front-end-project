export default {
    external: ["lodash"],
    input: ["hello.js"],
    output: [
        {
            dir: "public",
            format: "system",
            sourcemap: true
        }
    ]
};
